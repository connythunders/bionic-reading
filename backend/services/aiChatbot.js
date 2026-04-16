/**
 * aiChatbot.js
 *
 * Gemini-baserad chatt-service som svarar på frågor om bionicreading.se
 * utifrån utdrag som hämtats av contentSearch.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIChatbot {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // gemini-1.5-flash är snabbare och billigare än gemini-pro för korta Q&A-svar
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * @param {string} userQuestion
   * @param {Array<{title,url,heading,text}>} retrievedChunks
   * @returns {Promise<{answer: string, sources: Array<{title,url}>}>}
   */
  async answer(userQuestion, retrievedChunks) {
    const sources = this._buildSources(retrievedChunks);
    const prompt = this._buildPrompt(userQuestion, retrievedChunks);

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
          topP: 0.9
        }
      });
      const response = await result.response;
      const answerText = (response.text() || '').trim();

      return {
        answer: answerText || 'Ursäkta, jag kunde inte formulera ett svar just nu.',
        sources
      };
    } catch (error) {
      console.error('[aiChatbot] Gemini-fel:', error.message);
      throw new Error(`AI kunde inte svara: ${error.message}`);
    }
  }

  _buildSources(chunks) {
    const seen = new Set();
    const sources = [];
    for (const c of chunks) {
      if (seen.has(c.url)) continue;
      seen.add(c.url);
      sources.push({ title: c.title, url: c.url });
    }
    return sources;
  }

  _buildPrompt(userQuestion, chunks) {
    const sourcesBlock = chunks.length
      ? chunks
          .map((c, i) => {
            const heading = c.heading && c.heading !== c.title ? ` — Rubrik: ${c.heading}` : '';
            return `[${i + 1}] Titel: ${c.title} — URL: ${c.url}${heading}\n${c.text}`;
          })
          .join('\n\n')
      : '(Inga relevanta utdrag hittades på sajten.)';

    return `Du är en hjälpsam assistent för bionicreading.se, en svensk utbildningssajt med läromedel och verktyg för årskurs 7–9 (religion, historia, svenska, engelska, SO, läroplaner m.m.).

Regler:
- Svara ALLTID på svenska.
- Basera ditt svar ENBART på nedanstående utdrag från sajten. Gissa inte.
- Om svaret inte finns i utdragen, säg vänligt att du inte hittar informationen och föreslå vilka sidor som kan vara relevanta baserat på titlarna.
- Nämn gärna sidan du refererar till, t.ex. "Läs mer på /islam-ovningar.html".
- Håll svaret kort (max 150 ord) och med vänligt tonfall.
- Besvara inte frågor som är helt utanför sajtens tema (t.ex. aktuella nyheter, personliga råd). Förklara då artigt att du bara hjälper till med innehållet på bionicreading.se.

KÄLLOR:
${sourcesBlock}

FRÅGA: ${userQuestion}

SVAR:`;
  }
}

module.exports = new AIChatbot();
