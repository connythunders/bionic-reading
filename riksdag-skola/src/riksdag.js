const { parseStringPromise } = require('xml2js');

const BASE_URL = 'https://data.riksdagen.se/dokumentlista/';

const SEARCH_TERMS = [
  'skola', 'skolan', 'skolans', 'skolpolitik', 'utbildning', 'gymnasium',
  'grundskola', 'förskola', 'lärare', 'lärarbrist', 'betyg', 'elevhälsa',
  'skolinspektionen', 'läroplan', 'fristående skola', 'friskola', 'skolval',
  'skolsegregation', 'skolfinansiering', 'skolpengen', 'rektorsprogram',
  'specialpedagog', 'skolplikt', 'lovskola', 'läxhjälp', 'nationella prov',
  'PISA', 'skolresultat', 'skolminister', 'utbildningsminister',
  'utbildningsutskottet'
];

const DOC_TYPES = 'mot,prop,bet,ip,fr';

const TYPE_MAP = {
  'mot': 'Motion',
  'prop': 'Proposition',
  'bet': 'Betänkande',
  'ip': 'Interpellation',
  'fr': 'Fråga'
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function fetchDocumentsForTerm(term, maxPages = 3) {
  const documents = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    const params = new URLSearchParams({
      sok: term,
      doktyp: DOC_TYPES,
      sort: 'datum',
      sortorder: 'desc',
      utformat: 'json',
      a: 's',
      p: String(page),
      st: '1'
    });

    const url = `${BASE_URL}?${params.toString()}`;

    try {
      const data = await fetchJSON(url);
      const docList = data?.dokumentlista?.dokument;

      if (!docList || docList.length === 0) {
        hasMore = false;
        break;
      }

      for (const doc of docList) {
        documents.push(parseDocument(doc));
      }

      const totalPages = parseInt(data?.dokumentlista?.['@sidor'] || '1', 10);
      hasMore = page < totalPages;
      page++;

      if (hasMore) {
        await delay(500);
      }
    } catch (err) {
      console.error(`Fel vid hämtning av "${term}" (sida ${page}):`, err.message);
      hasMore = false;
    }
  }

  return documents;
}

function parseDocument(doc) {
  const type = doc.doktyp || doc.typ || '';
  const typeName = TYPE_MAP[type.toLowerCase()] || type;

  let url = '';
  if (doc.dokumentstatus_url_xml) {
    url = doc.dokumentstatus_url_xml.replace('xml', 'html');
  }
  if (doc.dokument_url_html) {
    url = doc.dokument_url_html;
  }
  // Build a proper riksdagen.se link
  if (doc.id) {
    url = `https://www.riksdagen.se/sv/dokument-och-lagar/dokument/${encodeURIComponent(type.toLowerCase())}/${encodeURIComponent(doc.rm || '')}${doc.beteckning ? ':' + encodeURIComponent(doc.beteckning) : ''}`;
    // Fallback: use dok_id based URL
    url = `https://data.riksdagen.se/dokument/${encodeURIComponent(doc.id)}`;
  }

  return {
    id: doc.id || doc.dok_id || '',
    title: doc.titel || '',
    subtitle: doc.undertitel || doc.notis || '',
    type: typeName,
    date: doc.datum || doc.publicerad || '',
    url,
    summary: doc.summary || doc.notis || doc.undertitel || '',
    party: doc.organ || ''
  };
}

async function fetchAllDocuments(maxPagesPerTerm = 2) {
  const allDocs = new Map();
  let termCount = 0;

  console.log(`Hämtar dokument för ${SEARCH_TERMS.length} söktermer...`);

  for (const term of SEARCH_TERMS) {
    termCount++;
    try {
      const docs = await fetchDocumentsForTerm(term, maxPagesPerTerm);
      for (const doc of docs) {
        if (doc.id && !allDocs.has(doc.id)) {
          allDocs.set(doc.id, doc);
        }
      }
      console.log(`  [${termCount}/${SEARCH_TERMS.length}] "${term}": ${docs.length} dokument (${allDocs.size} unika totalt)`);
    } catch (err) {
      console.error(`  Fel vid "${term}":`, err.message);
    }

    await delay(500);
  }

  console.log(`Totalt ${allDocs.size} unika dokument hämtade.`);
  return Array.from(allDocs.values());
}

async function fetchRSS() {
  const params = new URLSearchParams({
    sok: 'skola utbildning',
    doktyp: DOC_TYPES,
    sort: 'datum',
    sortorder: 'desc',
    utformat: 'rss'
  });

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    const result = await parseStringPromise(xml, { explicitArray: false });

    const items = result?.rss?.channel?.item;
    if (!items) return [];

    const itemArray = Array.isArray(items) ? items : [items];

    return itemArray.map(item => ({
      id: item.guid?._ || item.guid || item.link || '',
      title: item.title || '',
      subtitle: '',
      type: guessType(item.title || '', item.category || ''),
      date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : '',
      url: item.link || '',
      summary: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300),
      party: ''
    }));
  } catch (err) {
    console.error('Fel vid hämtning av RSS:', err.message);
    return [];
  }
}

function guessType(title, category) {
  const text = (title + ' ' + category).toLowerCase();
  if (text.includes('proposition')) return 'Proposition';
  if (text.includes('betänkande')) return 'Betänkande';
  if (text.includes('motion')) return 'Motion';
  if (text.includes('interpellation')) return 'Interpellation';
  if (text.includes('fråga')) return 'Fråga';
  return 'Dokument';
}

module.exports = {
  fetchAllDocuments,
  fetchDocumentsForTerm,
  fetchRSS,
  SEARCH_TERMS,
  TYPE_MAP
};
