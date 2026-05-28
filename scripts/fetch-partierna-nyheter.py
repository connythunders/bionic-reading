import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re
import time

# SR program IDs that work reliably
SR_SOURCES = [
    ('SR Ekot',          'https://api.sr.se/api/rss/program/83'),
    ('SR Studio Ett',    'https://api.sr.se/api/rss/program/4540'),
    ('SR P1 Morgon',     'https://api.sr.se/api/rss/program/2071'),
    ('SR Agenda',        'https://api.sr.se/api/rss/program/1003'),
    ('SR P1 Nyheter',    'https://api.sr.se/api/rss/program/103'),
    ('SR Medierna',      'https://api.sr.se/api/rss/program/4946'),
]

# Riksdag API for current debate/documents (party search terms)
RIKSDAG_TERMS = [
    'Socialdemokraterna', 'Moderaterna', 'Sverigedemokraterna',
    'Centerpartiet', 'Vänsterpartiet', 'Kristdemokraterna',
    'Liberalerna', 'Miljöpartiet', 'regeringen', 'opposition',
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; PartiNyheterBot/1.0)',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'sv-SE,sv;q=0.9',
}

PARTIES = {
    'S':  {
        'name': 'Socialdemokraterna',
        'keywords': [
            'socialdemokrat', '(s)', ' s-grupp', 'stefan löfven', 'magdalena andersson',
            'mona sahlin', 'göran persson', 'mikael damberg', 'morgan johansson',
            'ardalan shekarabi', 'anna ekström', 'ibrahim baylan', 'annika strandhäll',
            'peter hultqvist', 's-parti', 'red-greens', 'socialdemokratiske',
        ]
    },
    'M':  {
        'name': 'Moderaterna',
        'keywords': [
            'moderat', '(m)', 'ulf kristersson', 'anna kinberg batra',
            'gunnar strömmer', 'elisabeth svantesson', 'carl bildt', 'fredrik reinfeldt',
            'tobias billström', 'maria malmer stenergard', 'moderaternas', 'moderatledaren',
            'moderaterna ', 'karin enström',
        ]
    },
    'SD': {
        'name': 'Sverigedemokraterna',
        'keywords': [
            'sverigedemokrat', '(sd)', 'jimmie åkesson', 'mattias karlsson',
            'björn söder', 'richard jomshof', 'oscar sjöstedt', 'ebba hermansson',
            'sd-ledaren', 'sd-partiet',
        ]
    },
    'C':  {
        'name': 'Centerpartiet',
        'keywords': [
            'centerpart', '(c)', 'annie lööf', 'muharrem demirok',
            'martin ådahl', 'michael arthursson', 'centerledaren',
        ]
    },
    'V':  {
        'name': 'Vänsterpartiet',
        'keywords': [
            'vänsterpart', '(v)', 'nooshi dadgostar', 'jonas sjöstedt',
            'ulla andersson', 'ida gabrielsson', 'håkan svenneling', 'vänsterledaren',
        ]
    },
    'KD': {
        'name': 'Kristdemokraterna',
        'keywords': [
            'kristdemokrat', '(kd)', 'ebba busch', 'göran hägglund',
            'jakob forssmed', 'acko ankarberg johansson', 'christian carlsson',
            'kd-ledaren', 'kd-parti',
        ]
    },
    'L':  {
        'name': 'Liberalerna',
        'keywords': [
            'liberal', '(l)', 'johan pehrson', 'nyamko sabuni',
            'lina axelsson kihlblom', 'mats persson', 'folkpartiet', 'liberalerna ',
            'liberalledaren', 'fredrik brange',
        ]
    },
    'MP': {
        'name': 'Miljöpartiet',
        'keywords': [
            'miljöpart', '(mp)', 'per bolund', 'märta stenevi',
            'amanda lind', 'emma nohrén', 'annika hirvonen', 'janine alm ericson',
            'mp-ledaren', 'gröna ',
        ]
    },
}

POLITICS_KEYWORDS = [
    'riksdag', 'regering', 'minister', 'parti', 'politik', 'val ', 'valet', 'budget',
    'statsminister', 'opposition', 'koalition', 'alliansen', 'tidöavtalet', 'tidöpartierna',
    'socialdemokrat', 'moderat', 'sverigedemokrat', 'centerpart', 'vänsterpart',
    'kristdemokrat', 'liberal', 'miljöpart', 'riksdagsman', 'riksdagskvinna', 'riksdagsledamot',
    'proposition', 'motion', 'utskott', 'lagstiftning', 'partiledare', 'valkampanj',
    'väljarstöd', 'opinionsmätning', 'opinionen', 'vallöfte', 'politisk',
    'mandatperiod', 'landsbygdspolitik', 'invandringspolitik', 'klimatpolitik',
    'skolpolitik', 'sjukvårdspolitik', 'skattepolitik', 'bostadspolitik',
]

def strip_html(text):
    text = re.sub(r'<[^>]+>', ' ', text or '')
    for ent, ch in [('&amp;', '&'), ('&lt;', '<'), ('&gt;', '>'), ('&quot;', '"'), ('&#39;', "'")]:
        text = text.replace(ent, ch)
    text = re.sub(r'&[a-z]+;', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()[:500]

def detect_parties(title, description):
    text = (title + ' ' + description).lower()
    found = []
    for abbr, info in PARTIES.items():
        for kw in info['keywords']:
            if kw in text:
                found.append(abbr)
                break
    return found

def is_politics_related(title, description):
    text = (title + ' ' + description).lower()
    return any(kw in text for kw in POLITICS_KEYWORDS)

def parse_rss(content, source_name):
    articles = []
    try:
        root = ET.fromstring(content)
        # RSS 2.0
        for item in root.findall('.//item'):
            title = item.findtext('title', '').strip()
            link = item.findtext('link', '').strip()
            pub_date = item.findtext('pubDate', '').strip()
            desc = item.findtext('description', '') or ''
            if title and link:
                articles.append({
                    'title': title,
                    'link': link,
                    'pubDate': pub_date,
                    'description': strip_html(desc),
                    'source': source_name
                })
        # Atom
        if not articles:
            atom = 'http://www.w3.org/2005/Atom'
            for entry in root.findall(f'{{{atom}}}entry'):
                title = entry.findtext(f'{{{atom}}}title', '').strip()
                link_el = entry.find(f'{{{atom}}}link[@rel="alternate"]') or entry.find(f'{{{atom}}}link')
                link = (link_el.get('href', '') if link_el is not None else '').strip()
                pub_date = (entry.findtext(f'{{{atom}}}published', '') or entry.findtext(f'{{{atom}}}updated', '')).strip()
                summary = entry.findtext(f'{{{atom}}}summary', '') or ''
                if title and link:
                    articles.append({
                        'title': title,
                        'link': link,
                        'pubDate': pub_date,
                        'description': strip_html(summary),
                        'source': source_name
                    })
    except Exception as e:
        print(f'  Parse error ({source_name}): {e}')
    return articles

def fetch_url(url, source_name):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read()
    except Exception as e:
        print(f'  Fel ({source_name}): {e}')
        return None

def fetch_riksdag_docs():
    articles = []
    seen = set()
    # Search for general political documents from the last riksdag session
    for term in ['parti', 'riksdagen', 'motion', 'proposition']:
        url = f'https://data.riksdagen.se/dokumentlista/?sok={urllib.parse.quote(term)}&doktyp=mot,prop,ip,fr&sort=datum&sortorder=desc&utformat=json&st=1&p=1'
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.json() if hasattr(resp, 'json') else json.loads(resp.read())
            docs = data.get('dokumentlista', {}).get('dokument', [])
            if isinstance(docs, dict):
                docs = [docs]
            for d in docs:
                doc_id = d.get('id') or d.get('dok_id', '')
                if not doc_id or doc_id in seen:
                    continue
                seen.add(doc_id)
                title = d.get('titel', '')
                desc = d.get('notis') or d.get('undertitel') or d.get('summary') or ''
                articles.append({
                    'title': title,
                    'link': f'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/{doc_id}/',
                    'pubDate': d.get('datum') or d.get('publicerad') or '',
                    'description': strip_html(desc),
                    'source': 'Riksdagen'
                })
            time.sleep(0.3)
        except Exception as e:
            print(f'  Riksdag ({term}): {e}')
    return articles

import urllib.parse

all_articles = []
seen_links = set()
source_stats = {}

# Fetch SR feeds
for source_name, url in SR_SOURCES:
    content = fetch_url(url, source_name)
    if not content:
        source_stats[source_name] = 0
        continue
    articles = parse_rss(content, source_name)
    added = 0
    for a in articles:
        if not a['link'] or a['link'] in seen_links:
            continue
        if not is_politics_related(a['title'], a['description']):
            continue
        a['parties'] = detect_parties(a['title'], a['description'])
        seen_links.add(a['link'])
        all_articles.append(a)
        added += 1
    source_stats[source_name] = added
    print(f'  {source_name}: {added} politikartiklar')
    time.sleep(0.2)

# Fetch Riksdag documents
try:
    riksdag_arts = fetch_riksdag_docs()
    added = 0
    for a in riksdag_arts:
        if not a['link'] or a['link'] in seen_links:
            continue
        a['parties'] = detect_parties(a['title'], a['description'])
        seen_links.add(a['link'])
        all_articles.append(a)
        added += 1
    source_stats['Riksdagen'] = added
    print(f'  Riksdagen: {added} dokument')
except Exception as e:
    print(f'  Riksdagen total fel: {e}')

data = {
    'updated': datetime.now(timezone.utc).isoformat(),
    'count': len(all_articles),
    'articles': all_articles,
    'sources': source_stats
}

with open('partierna-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Totalt: {len(all_articles)} artiklar sparade.')
