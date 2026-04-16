/**
 * contentSearch.js
 *
 * Laddar content-index.json vid start och exponerar en TF-IDF-sökare
 * över alla chunks i sajten.
 */

const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.resolve(__dirname, '../../data/content-index.json');

// Svenska stoppord – måste spegla buildContentIndex.js
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

class ContentSearch {
  constructor() {
    this.loaded = false;
    this.index = null;
    this._load();
  }

  _load() {
    try {
      if (!fs.existsSync(INDEX_PATH)) {
        console.warn(`[contentSearch] ${INDEX_PATH} saknas – kör "npm run build-index" i backend/`);
        this.index = { documents: [], idf: {} };
        return;
      }
      const raw = fs.readFileSync(INDEX_PATH, 'utf-8');
      this.index = JSON.parse(raw);
      this.loaded = true;
      console.log(
        `[contentSearch] laddade ${this.index.documentCount} dokument, ` +
        `${this.index.totalChunks} chunks`
      );
    } catch (err) {
      console.error('[contentSearch] kunde inte ladda index:', err.message);
      this.index = { documents: [], idf: {} };
    }
  }

  /**
   * @param {string} query
   * @param {number} topK
   * @returns {Array<{docId,url,title,heading,text,score}>}
   */
  search(query, topK = 5) {
    if (!this.loaded || !this.index.documents.length) return [];

    const qTokens = tokenize(query);
    if (qTokens.length === 0) return [];

    const qTf = {};
    for (const t of qTokens) qTf[t] = (qTf[t] || 0) + 1;

    const idf = this.index.idf;
    const results = [];

    for (const doc of this.index.documents) {
      // Lätt boost om frågeterm förekommer i titeln
      const titleTokens = new Set(tokenize(doc.title));
      let titleBoost = 0;
      for (const qt of Object.keys(qTf)) {
        if (titleTokens.has(qt)) titleBoost += 0.5;
      }

      for (const chunk of doc.chunks) {
        let score = 0;
        let matches = 0;
        for (const [term, qCount] of Object.entries(qTf)) {
          const chunkCount = chunk.tf[term] || 0;
          if (chunkCount === 0) continue;
          const w = idf[term] || 1;
          score += qCount * chunkCount * w * w;
          matches += 1;
        }
        if (matches === 0) continue;
        // Liten boost per matchad unik term + titelboost
        score *= (1 + 0.15 * matches);
        score += titleBoost;

        results.push({
          docId: doc.id,
          url: doc.url,
          title: doc.title,
          heading: chunk.heading,
          text: chunk.text,
          score
        });
      }
    }

    results.sort((a, b) => b.score - a.score);

    // Deduplicera så vi inte skickar 5 chunks från samma doc
    const seen = new Map();
    const deduped = [];
    for (const r of results) {
      const n = seen.get(r.docId) || 0;
      if (n >= 2) continue; // max 2 chunks per dokument
      seen.set(r.docId, n + 1);
      deduped.push(r);
      if (deduped.length >= topK) break;
    }

    return deduped;
  }

  isReady() {
    return this.loaded && this.index.documents.length > 0;
  }
}

module.exports = new ContentSearch();
