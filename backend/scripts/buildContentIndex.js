/**
 * buildContentIndex.js
 *
 * Crawlar alla HTML-filer i projektroten (../*.html relativt detta script),
 * extraherar läsbar text med cheerio, chunkar per rubrik, beräknar TF och IDF,
 * och skriver resultatet till backend/data/content-index.json.
 *
 * Körs via: npm run build-index
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT_DIR = path.resolve(__dirname, '../..');
// Skrivs till projektrotens /data/ så att både statisk frontend (GitHub Pages)
// och backend kan läsa samma fil.
const OUTPUT_DIR = path.resolve(__dirname, '../../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'content-index.json');

// Svenska stoppord - filtreras bort från TF/IDF
const STOPWORDS = new Set([
  'och', 'att', 'det', 'som', 'en', 'på', 'är', 'för', 'av', 'med', 'till',
  'den', 'har', 'de', 'inte', 'om', 'ett', 'men', 'var', 'jag', 'sig', 'från',
  'han', 'vi', 'så', 'kan', 'man', 'när', 'här', 'där', 'eller', 'vid', 'också',
  'nu', 'då', 'ska', 'skulle', 'kunde', 'blir', 'blev', 'blivit', 'vara', 'varit',
  'hade', 'haft', 'alla', 'andra', 'denna', 'dessa', 'detta', 'dem', 'dig', 'din',
  'dina', 'ditt', 'du', 'efter', 'eftersom', 'ej', 'endast', 'er', 'era', 'ert',
  'finns', 'få', 'får', 'genom', 'hans', 'hennes', 'honom', 'hur', 'i', 'ja',
  'mer', 'mig', 'min', 'mina', 'mitt', 'mot', 'ni', 'någon', 'något', 'några',
  'oss', 'över', 'samma', 'sin', 'sina', 'sitt', 'själv', 'sätt', 'under', 'upp',
  'ur', 'utan', 'vad', 'vara', 'vem', 'vilka', 'vilken', 'vilket', 'vår', 'våra',
  'vårt', 'ända', 'även', 'the', 'a', 'an', 'and', 'or', 'is', 'to', 'of', 'in'
]);

function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2 && t.length <= 30 && !STOPWORDS.has(t) && !/^\d+$/.test(t));
}

/**
 * Extrahera ren läsbar text + titel + meta description + chunks per rubrik
 * från en HTML-sträng.
 */
function extractContent(html, docId) {
  const $ = cheerio.load(html);

  // Ta bort brus
  $('script, style, noscript, template, svg, iframe, nav, footer').remove();

  const title = ($('title').first().text() || docId).trim();
  const description = ($('meta[name="description"]').attr('content') || '').trim();

  // Bygg chunks per rubrik (h1-h3). Om ingen rubrik hittas, fall tillbaka till hela body.
  const chunks = [];
  const MAX_CHUNK_CHARS = 1200;
  const MIN_CHUNK_CHARS = 80;

  function pushChunk(heading, text, indexHint) {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    if (cleaned.length < MIN_CHUNK_CHARS) return;

    // Dela vidare om för långt
    if (cleaned.length <= MAX_CHUNK_CHARS) {
      chunks.push({
        id: `${docId}#${chunks.length}`,
        heading,
        text: cleaned
      });
    } else {
      // Dela på mening ungefär per MAX_CHUNK_CHARS
      const sentences = cleaned.split(/(?<=[.!?])\s+/);
      let buf = '';
      for (const s of sentences) {
        if ((buf + ' ' + s).length > MAX_CHUNK_CHARS && buf) {
          chunks.push({ id: `${docId}#${chunks.length}`, heading, text: buf.trim() });
          buf = s;
        } else {
          buf = buf ? buf + ' ' + s : s;
        }
      }
      if (buf.trim()) {
        chunks.push({ id: `${docId}#${chunks.length}`, heading, text: buf.trim() });
      }
    }
  }

  // Traversera dokumentet i ordning och gruppera text efter närmaste föregående rubrik
  let currentHeading = title;
  let buffer = '';
  const body = $('body').length ? $('body') : $.root();

  function walk(el) {
    body.find(el).each((_, node) => {
      const $node = $(node);
      const tag = node.tagName && node.tagName.toLowerCase();
      if (['h1', 'h2', 'h3'].includes(tag)) {
        if (buffer.trim()) {
          pushChunk(currentHeading, buffer);
          buffer = '';
        }
        currentHeading = $node.text().replace(/\s+/g, ' ').trim() || currentHeading;
      } else {
        const text = $node.text();
        if (text) buffer += ' ' + text;
      }
    });
  }

  walk('h1, h2, h3, p, li, td, th, blockquote, summary, figcaption');

  if (buffer.trim()) pushChunk(currentHeading, buffer);

  // Fallback: om inga chunks (sidan saknar rubriker/stycken), ta hela body
  if (chunks.length === 0) {
    const allText = $('body').text().replace(/\s+/g, ' ').trim();
    if (allText.length >= MIN_CHUNK_CHARS) {
      pushChunk(title, allText);
    }
  }

  // Dokumentets samlade text (för sammanfattningssökning)
  const fullText = chunks.map(c => c.text).join(' ').substring(0, 20000);

  return { title, description, chunks, fullText };
}

function computeTermFreq(tokens) {
  const tf = {};
  for (const t of tokens) tf[t] = (tf[t] || 0) + 1;
  return tf;
}

function main() {
  console.log('Bygger content-index från', ROOT_DIR);

  const files = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
  console.log(`Hittade ${files.length} HTML-filer`);

  const documents = [];
  const df = {}; // document frequency per term

  for (const file of files) {
    const filePath = path.join(ROOT_DIR, file);
    let html;
    try {
      html = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.warn(`Kunde inte läsa ${file}: ${err.message}`);
      continue;
    }

    const docId = file.replace(/\.html$/, '');
    const url = `/${file}`;

    try {
      const { title, description, chunks, fullText } = extractContent(html, docId);

      if (chunks.length === 0) {
        console.warn(`  ${file}: inga chunks, hoppar över`);
        continue;
      }

      // TF per chunk
      const chunkEntries = chunks.map(c => {
        const tokens = tokenize(c.text);
        return { ...c, tf: computeTermFreq(tokens) };
      });

      // TF per dokument (union)
      const docTokens = tokenize(fullText);
      const docTf = computeTermFreq(docTokens);

      // Uppdatera DF (unika termer per dokument)
      for (const term of Object.keys(docTf)) {
        df[term] = (df[term] || 0) + 1;
      }

      documents.push({
        id: docId,
        url,
        title,
        description,
        termFreq: docTf,
        chunks: chunkEntries
      });

      console.log(`  ${file}: ${chunks.length} chunks, ${docTokens.length} tokens`);
    } catch (err) {
      console.warn(`  ${file}: fel – ${err.message}`);
    }
  }

  // Beräkna IDF: log(N / df)
  const N = documents.length;
  const idf = {};
  for (const [term, freq] of Object.entries(df)) {
    idf[term] = Math.log((N + 1) / (freq + 1)) + 1; // smoothed
  }

  const index = {
    builtAt: new Date().toISOString(),
    documentCount: N,
    totalChunks: documents.reduce((sum, d) => sum + d.chunks.length, 0),
    documents,
    idf
  };

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index));

  const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`\nKlart: ${N} dokument, ${index.totalChunks} chunks, ${Object.keys(idf).length} unika termer`);
  console.log(`Skrev ${OUTPUT_FILE} (${sizeKb} KB)`);
}

if (require.main === module) {
  main();
}

module.exports = { tokenize, extractContent };
