import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re

SOURCES = [
    ('BBC Sport',       'https://feeds.bbci.co.uk/sport/football/teams/arsenal/rss.xml'),
    ('The Guardian',    'https://www.theguardian.com/football/arsenal/rss'),
    ('Sky Sports',      'https://www.skysports.com/rss/12040'),
    ('Football London', 'https://www.football.london/rss/news/arsenal-fc/'),
    ('Mirror Sport',    'https://www.mirror.co.uk/sport/football/teams/arsenal/rss.xml'),
    ('ESPN FC',         'https://www.espn.com/espn/rss/soccer/news'),
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; ArsenalNewsBot/1.0; +https://bionicreading.se/arsenal-news.html)',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
}

def strip_html(text):
    text = re.sub(r'<[^>]+>', ' ', text or '')
    text = re.sub(r'&[a-z]+;', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()[:400]

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

        # Atom feeds
        if not articles:
            atom = 'http://www.w3.org/2005/Atom'
            for entry in root.findall(f'{{{atom}}}entry'):
                title = entry.findtext(f'{{{atom}}}title', '').strip()
                link_el = entry.find(f'{{{atom}}}link[@rel="alternate"]') or entry.find(f'{{{atom}}}link')
                link = (link_el.get('href', '') if link_el is not None else '').strip()
                pub_date = entry.findtext(f'{{{atom}}}published', '') or entry.findtext(f'{{{atom}}}updated', '')
                summary = entry.findtext(f'{{{atom}}}summary', '') or ''
                if title and link:
                    articles.append({
                        'title': title,
                        'link': link,
                        'pubDate': pub_date.strip(),
                        'description': strip_html(summary),
                        'source': source_name
                    })
    except Exception as e:
        print(f'  Parse error ({source_name}): {e}')
    return articles

all_articles = []
seen_links = set()

for source_name, url in SOURCES:
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            content = resp.read()
        articles = parse_rss(content, source_name)
        added = 0
        for a in articles:
            if a['link'] and a['link'] not in seen_links:
                seen_links.add(a['link'])
                all_articles.append(a)
                added += 1
        print(f'  {source_name}: {added} artiklar')
    except Exception as e:
        print(f'  Fel ({source_name}): {e}')

data = {
    'updated': datetime.now(timezone.utc).isoformat(),
    'count': len(all_articles),
    'articles': all_articles
}

with open('arsenal-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Totalt: {len(all_articles)} artiklar sparade.')
