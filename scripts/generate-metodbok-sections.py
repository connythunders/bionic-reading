#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genererar SECTIONS-arrayen i metodbok-emi.html.

Indata (textfiler extraherade ur källdokumenten med ett enkelt
docx-XML-utdrag, en rad per stycke):
  /tmp/metodbok.txt  – kommunal webbhandbok för EMI (sidor markerade
                       med "SIDA:"/"URL:"-block). Kommunspecifika
                       uppgifter generaliseras (kommunen, regionen,
                       journalsystemet …) eller ersätts med
                       [hakparentes-platshållare].
  /tmp/rattvik.txt   – Rättviks kommuns barn- och elevhälsoplan
                       (rubriker markerade [H:RubrikN]). Återges
                       som den är, flaggas source:"rattvik".

Utdata: /tmp/SECTIONS.js med `const SECTIONS` + `const GROUP_ORDER`,
som splitsas in i metodbok-emi.html (ersätter span från
"const SECTIONS = [" t.o.m. GROUP_ORDER-raden).
"""
import re, json

# ================= METODBOK (generic) =================
raw = open('metodbok.txt',encoding='utf-8').read()
pages=[]
for m in re.finditer(r'SIDA:\s*(.*?)\nURL:\s*(.*?)\n=+\n(.*?)(?=\n=+\nSIDA:|\Z)', raw, re.S):
    pages.append([m.group(1).strip(), m.group(2).strip(), m.group(3).strip()])

def slug_title(url):
    s=url.rstrip('/').split('/')[-1].replace('-',' ').strip()
    return s[:1].upper()+s[1:]

GROUP_MAP = {
 '':'Om metodboken',
 'den-samlade-elevhalsan':'Den samlade elevhälsan',
 'medicinska-elevhalsan':'Medicinska elevhälsan',
 'avvikelsehantering':'Avvikelsehantering',
 'journaldokumentation':'Journal och dokumentation',
 'journalhantering':'Journal och dokumentation',
 'prorenata':'Journal och dokumentation',
 'blanketter':'Administration',
 'blanketter-for-externa-anvandare':'Administration',
 'elevadministration':'Administration',
 'halsobesok':'Hälsobesök',
 'lakemedel':'Läkemedel och vaccination',
 'oppen-mottagning':'Öppen mottagning',
 'nyanlanda-elever':'Nyanlända elever',
 'utrustning-och-lokaler':'Utrustning och lokaler',
 'a-o':'A–Ö',
}
def seg_of(url):
    mm=re.search(r'till-e-handboken/([^/]*)/?',url); return mm.group(1) if mm else ''

REPL=[("Postadress: Uppsala kommunJournalarkivetBarn- och elevhälsanDanmarksgatan 26753 75 Uppsala","Postadress: [postadress till kommunens journalarkiv]"),
 ("Svenska Kommun Försäkrings AB (SKFAB)","kommunens försäkringsbolag"),
 ("Svenska Kommun Försäkrings AB","kommunens försäkringsbolag"),("(SKFAB)",""),("SKFAB","försäkringsbolaget"),
 ("Region Uppsalas","regionens"),("Region Uppsala","regionen"),
 ("Uppsala universtitet","universitetet"),("Uppsala universitet","universitetet"),
 ("Postadress: Uppsala kommun","Postadress: [kommunens postadress]"),
 ("Uppsala kommuns","kommunens"),("Uppsala kommunen","kommunen"),("Uppsala kommun","kommunen"),
 ("Uppsalas","kommunens"),("vfu@uppsala.se","[VFU-samordnarens e-postadress]"),
 ("Barnombudsmannen i Uppsala","Barnombudsmannen"),("Insidan","intranätet"),
 ("Prorenata journal","journalsystemet"),("Prorenata","journalsystemet"),
 ("Yubikey","personlig inloggningsnyckel"),
 ("Hanna Blom","[ansvarig handläggare]"),("Viktor Engström","[ansvarig utgivare]"),
 ("Uppsala län","länet"),("skola.uppsala.se","skola.[kommun].se"),("www. uppsala. se","[kommunens webbplats]"),("uppsala. se","[kommunens webbplats]"),("uppsala.se","[kommunens webbplats]"),("@uppsala.se","[e-postadress]"),("Uppsala","kommunen")]
CAPW=['kommunen','kommunens','regionen','regionens','universitetet','journalsystemet','intranätet','försäkringsbolaget']
def fixcap(p):
    for w in CAPW:
        p=re.sub(r'([.!?]\s+)('+w+r')\b', lambda m:m.group(1)+m.group(2)[0].upper()+m.group(2)[1:], p)
    for w in CAPW:
        if p.startswith(w+' ') or p==w: p=p[0].upper()+p[1:]; break
    return p
def generic(t):
    t=re.sub(r'\s*\((?:PDF|DOCX|XLSX|PPTX|PNG|JPG|JPEG)[^)]*\)','',t)
    t=re.sub(r'\b(Sidbild|Bildtext|Sidinnehåll|Sidfot)\b','',t)
    for a,b in REPL: t=t.replace(a,b)
    return re.sub(r'  +',' ',t).strip()

def collapse_link_piles(out):
    res=[];i=0
    while i<len(out):
        if out[i].startswith('## '):
            j=i
            while j<len(out) and out[j].startswith('## '): j+=1
            run=out[i:j]
            if len(run)>=2:
                first=run[0][3:]
                if first.startswith('Länkar'):
                    res.append('## Länkar')
                    rest=first[6:].strip()
                    if rest: res.append('- '+rest)
                else:
                    res.append('- '+first)
                for h in run[1:]: res.append('- '+h[3:])
            else:
                h=run[0][3:]
                if h.startswith('Länkar ') and len(h)>7:
                    res.append('## Länkar'); res.append('- '+h[7:])
                else: res.append(run[0])
            i=j
        else:
            res.append(out[i]); i+=1
    return res
def expand_bullets(out):
    res=[]
    for p in out:
        if p.startswith('## ') or '•' not in p:
            res.append(p); continue
        head,*rest=re.split(r'\s*•\s*', p)
        if head.strip(): res.append(head.strip())
        for it in rest:
            if it.strip(): res.append('- '+it.strip())
    return res
PROTECT=[('ViS','Vi\x01S'),('SoL','So\x01L'),('KiVa','Ki\x01Va')]
def structure(body):
    for a,b in PROTECT: body=body.replace(a,b)
    body=re.sub(r'([a-zåäö])(1177)', r'\1 \2', body)
    body=re.sub(r'([.!?:])([A-ZÅÄÖ])', r'\1 \2', body)
    parts=re.split(r'(?<=[a-zåäö])(?=[A-ZÅÄÖ])', body)
    out=[]; pending=None
    for idx,chunk in enumerate(parts):
        chunk=chunk.strip()
        if pending: out.append('## '+fixcap(pending))
        m=re.search(r'(?:^|(?<=[.!?:]) )([^.!?:]{2,80})$', chunk)
        tail=m.group(1).strip() if m else ''
        wc=len(tail.split())
        if idx<len(parts)-1 and 1<=wc<=9 and not re.search(r'[.!?:]',tail):
            bp=chunk[:chunk.rfind(tail)].strip() if tail else chunk; pending=tail
        else:
            bp=chunk; pending=None
        if bp: out.append(fixcap(bp))
    out=collapse_link_piles(out)
    return [p.replace('\x01','') for p in expand_bullets(out)]

def mkid(title,used):
    base=re.sub(r'[^a-z0-9]+','-',title.lower().replace('å','a').replace('ä','a').replace('ö','o')).strip('-')[:26] or 'sec'
    i=base;n=2
    while i in used: i=base+'-'+str(n);n+=1
    used.add(i);return i

used=set(['om','webbhandbok','rattvik'])
SEC=[]
# intro tool section
SEC.append({'id':'om','group':'Om metodboken','title':'Om metodboken','type':'plain',
 'lead':'Vad metodboken är, vem den vänder sig till och hur den ska användas.','body':[
  "Metodboken är ett samlat stöd- och uppslagsverk för elevhälsans medicinska insats (EMI). Den ska bidra till en likvärdig och rättssäker hälso- och sjukvård oavsett vilken skola eleven går på.",
  "EMI är hälso- och sjukvård enligt hälso- och sjukvårdslagen och ska bedrivas inom ett ledningssystem för kvalitet (SOSFS 2011:9). Metodboken är en central del i det systemet.",
  "Så här använder du boken: använd menyn till vänster för att bläddra bland avsnitt, sökrutan (kortkommando /) för att hitta ett begrepp, och knappen \"Fråga metodboken\" för att ställa frågor om innehållet. Varje avsnitt går att dela med en egen länk och skriva ut.",
  "Innehållet bygger på en kommunal webbhandbok för EMI samt på en kommunal barn- och elevhälsoplan. Kommunspecifika uppgifter har gjorts generella och markerats med hakparenteser, t.ex. [kommun]. Innan boken används skarpt ska innehållet anpassas och godkännas av verksamhetschef för EMI tillsammans med medicinskt ledningsansvarig (MLA)."
 ]})
# webbhandbok intro (generic)
for title,url,body in pages:
    if title=='Webbhandbok EMI':
        SEC.append({'id':'webbhandbok','group':'Om metodboken','title':'Webbhandbok EMI','type':'plain',
          'lead':'Ingång till webbhandboken för elevhälsans medicinska insats.','body':structure(generic(body))})
        break
for title,url,body in pages:
    if title=='Webbhandbok EMI': continue
    seg=seg_of(url)
    SLUG_TITLES={'dyslexi':'Dyslexi','endometrios':'Endometrios',
     'halsoframjande-och-forebyggande-arbete':'Hälsofrämjande och förebyggande arbete',
     'majblomman':'Majblomman','medicinsk-studie--och-yrkesvagledn':'Medicinsk studie- och yrkesvägledning',
     'mognadsbedoming':'Mognadsbedömning','npf':'NPF – neuropsykiatriska funktionsnedsättningar',
     'pubertetsbedoming':'Pubertetsbedömning','samhallsplacerade-barn-och-unga':'Samhällsplacerade barn och unga',
     'sekretess':'Sekretess','skyddade-personuppgifter':'Skyddade personuppgifter',
     'sprak--och-talsvårigheter':'Språk- och talsvårigheter','testiklar':'Testiklar',
     'unga-brottsutsatta':'Unga brottsutsatta','vikt':'Vikt'}
    if not title or title.startswith('http'):
        slug=url.rstrip('/').split('/')[-1]
        title=SLUG_TITLES.get(slug, slug_title(url))
    grp=GROUP_MAP.get(seg,'A–Ö')
    t=generic(title)
    if t=='Prorenata': t='Journalsystemet'
    sid=mkid(t,used)
    b=structure(generic(body))
    plain=' '.join(p for p in b if not p.startswith('## ') and not p.startswith('- '))
    if 'Kontrollera att du skrivit rätt webbadress' in plain:
        b=["Innehållet för det här avsnittet kunde inte hämtas från källmaterialet (sidan saknades vid hämtningen).",
           "[Komplettera med kommunens egen text eller rutin för detta område innan metodboken används skarpt.]"]
        if t=='Sekretess':
            b.append("Sekretess berörs även i avsnitten Elevhälsoteamsmöten samt Lagar och riktlinjer.")
        if t=='Skyddade personuppgifter':
            b.append("Se även avsnittet Skyddade personuppgifter under rubriken Journal och dokumentation.")
    elif len(plain)<60:
        b.append("[Källsidan hänvisar i huvudsak till ett separat rutindokument. Komplettera med kommunens egen rutin.]")
    SEC.append({'id':sid,'group':grp,'title':t,'type':'plain','body':b})

# ================= RÄTTVIK plan (kept as Rättvik) =================
rl=open('rattvik.txt',encoding='utf-8').read().split('\n')
# find first Rubrik1
items=[]  # (level, heading, idx)
for i,l in enumerate(rl):
    m=re.match(r'\[H:Rubrik(\d)\]\s*(.*)',l)
    if m: items.append((int(m.group(1)), m.group(2).strip(), i))
start=next(i for lvl,h,i in items if lvl==1)
# build Rubrik1 spans
r1=[(h,i) for lvl,h,i in items if lvl==1]
RGROUP='Barn- och elevhälsoplan (Rättvik)'
RSEC=[]
RSEC.append({'id':'rattvik','group':RGROUP,'source':'rattvik','title':'Barn- och elevhälsoplan – Rättviks kommun','type':'plain',
 'lead':'Rättviks kommuns barn- och elevhälsoplan, Barn- och utbildningsförvaltningen.','body':[
  "Detta är Rättviks kommuns barn- och elevhälsoplan för Barn- och utbildningsförvaltningen. Planen beskriver hur det hälsofrämjande, förebyggande och åtgärdande arbetet ska bedrivas i förskola och skola, samt ansvarsfördelningen mellan olika professioner.",
  "Till skillnad från övriga avsnitt i metodboken är texten i den här delen kommunspecifik för Rättvik och återges som den är."
 ]})
def rid(h,used):
    base='r-'+re.sub(r'[^a-z0-9]+','-',h.lower().replace('å','a').replace('ä','a').replace('ö','o')).strip('-')[:24] or 'r-sec'
    i=base;n=2
    while i in used: i=base+'-'+str(n);n+=1
    used.add(i);return i
rused=set(['rattvik'])
for k,(h,li) in enumerate(r1):
    nxt = r1[k+1][1] if k+1<len(r1) else len(rl)
    # title disambiguation for duplicate 'Ansvarsområden...'
    title=h
    block=rl[li+1:nxt]
    if title.startswith('Ansvarsområden'):
        low='\n'.join(block[:6]).lower()
        if 'förskol' in low: title='Ansvarsområden – förskolan'
        elif 'grundskol' in low: title='Ansvarsområden – grundskolan och anpassade grundskolan'
    body=[]
    for l in block:
        l=l.strip()
        m=re.match(r'\[H:Rubrik\d\]\s*(.*)',l)
        if m:
            ht=m.group(1).strip()
            if ht: body.append('## '+ht)
        elif l:
            mb=re.match(r'^[•●▪◦‣*]\s*(.+)', l)
            if mb: body.append('- '+mb.group(1).strip())
            else: body.append(l)
    if not body: continue
    RSEC.append({'id':rid(title,rused),'group':RGROUP,'source':'rattvik','title':title,'type':'plain','body':expand_bullets(body)})

ALL=SEC+RSEC
GROUP_ORDER=["Om metodboken","Den samlade elevhälsan","Medicinska elevhälsan","Hälsobesök",
 "Läkemedel och vaccination","Öppen mottagning","Nyanlända elever","Journal och dokumentation",
 "Avvikelsehantering","Administration","Utrustning och lokaler","A–Ö",RGROUP]

# sanity: every section group in GROUP_ORDER
gs=set(s['group'] for s in ALL); 
for g in gs:
    assert g in GROUP_ORDER, g
print('Handbook sections:',len(SEC),'| Rättvik sections:',len(RSEC),'| total:',len(ALL))
from collections import Counter
for g in GROUP_ORDER: print('  ',g,':',sum(1 for s in ALL if s['group']==g))

# emit JS
def jsstr(s): return json.dumps(s, ensure_ascii=False)
out=['const SECTIONS = [']
for s in ALL:
    parts=['id:'+jsstr(s['id']),'group:'+jsstr(s['group']),'title:'+jsstr(s['title']),'type:'+jsstr('plain')]
    if s.get('lead'): parts.insert(3,'lead:'+jsstr(s['lead']))
    if s.get('source'): parts.append('source:'+jsstr(s['source']))
    body=',\n      '.join(jsstr(p) for p in s['body'])
    obj='  {\n    '+', '.join(parts)+',\n    body:[\n      '+body+'\n    ]\n  }'
    out.append(obj+',')
out[-1]=out[-1].rstrip(',')
out.append('];')
js='\n'.join(out)
go='const GROUP_ORDER = '+json.dumps(GROUP_ORDER,ensure_ascii=False)+';'
open('SECTIONS.js','w',encoding='utf-8').write(js+'\n'+go+'\n')
print('wrote SECTIONS.js', len(js),'chars')
