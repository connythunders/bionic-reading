const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIStudyHelper {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Genererar flashcards från text
   * @param {string} text - Dokumenttext
   * @param {number} count - Antal flashcards
   * @returns {Promise<Array>}
   */
  async generateFlashcards(text, count = 15) {
    const maxChars = 50000;
    const truncatedText = text.substring(0, maxChars);

    const prompt = `Du är en pedagogisk expert som skapar effektiva flashcards för elever i årskurs 7-9.

Baserat på följande text, skapa exakt ${count} flashcards för att hjälpa eleven att lära sig materialet.

KRAV:
1. Varje flashcard ska ha en framsida (fråga/begrepp) och en baksida (svar/förklaring)
2. Använd enkel, tydlig svenska
3. Fokusera på nyckelbegrepp och centrala idéer
4. Variera mellan definitioner, orsak-verkan, och jämförelser
5. Håll svaren korta och koncisa (max 2-3 meningar)
6. Variera svårighetsgrad: 30% lätt, 50% medel, 20% svår

FORMAT (strikt JSON):
Returnera ENDAST en JSON-array:

[
  {
    "front": "Vad är...?",
    "back": "Det är...",
    "difficulty": "easy"
  }
]

difficulty kan vara: "easy", "medium", "hard"

TEXT:
${truncatedText}

Returnera ENDAST JSON-arrayen med exakt ${count} flashcards. Ingen annan text.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      return this.parseFlashcards(content);
    } catch (error) {
      console.error('AI Flashcard Generation Error:', error);
      throw new Error(`AI kunde inte generera flashcards: ${error.message}`);
    }
  }

  /**
   * Genererar en sammanfattning av texten, uppdelad i studiesektioner
   * @param {string} text - Dokumenttext
   * @returns {Promise<Object>}
   */
  async generateStudySummary(text) {
    const maxChars = 50000;
    const truncatedText = text.substring(0, maxChars);

    const prompt = `Du är en pedagogisk expert som hjälper elever i årskurs 7-9 att studera effektivt.

Analysera följande text och skapa en strukturerad studiesammanfattning.

KRAV:
1. Dela upp materialet i 3-6 tydliga sektioner/teman
2. Varje sektion ska ha en rubrik och 3-5 nyckelpunkter
3. Använd enkel, tydlig svenska
4. Fokusera på centrala idéer (inte perifera detaljer)
5. Varje nyckelpunkt max 2 meningar
6. Lägg till 1-2 minnestips per sektion

FORMAT (strikt JSON):
{
  "title": "Sammanfattning av materialet",
  "sections": [
    {
      "heading": "Sektion 1",
      "keyPoints": ["Punkt 1", "Punkt 2", "Punkt 3"],
      "memoryTip": "Tips för att minnas detta..."
    }
  ],
  "totalWordCount": 500,
  "estimatedStudyTime": "15 minuter"
}

TEXT:
${truncatedText}

Returnera ENDAST JSON-objektet. Ingen annan text.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      return this.parseSummary(content);
    } catch (error) {
      console.error('AI Summary Generation Error:', error);
      throw new Error(`AI kunde inte generera sammanfattning: ${error.message}`);
    }
  }

  /**
   * Omvandlar text till bionic reading-format
   * @param {string} text - Ren text
   * @param {string} level - Fokusnivå (low, medium, high)
   * @returns {string} - HTML med bionic reading
   */
  convertToBionicReading(text, level = 'medium') {
    const words = text.split(/(\s+)/);
    const bionicWords = words.map(word => {
      if (word.trim().length === 0) return word;

      let boldRatio;
      switch (level) {
        case 'low': boldRatio = 0.3; break;
        case 'high': boldRatio = 0.5; break;
        default: boldRatio = 0.4;
      }

      const boldLength = Math.max(1, Math.ceil(word.length * boldRatio));
      const boldPart = word.substring(0, boldLength);
      const normalPart = word.substring(boldLength);

      return `<strong>${boldPart}</strong>${normalPart}`;
    });

    return bionicWords.join('');
  }

  /**
   * Delar upp text i läsbara sektioner (chunks)
   * @param {string} text - Dokumenttext
   * @param {number} maxWordsPerChunk - Max ord per sektion
   * @returns {Array<{text: string, wordCount: number, index: number}>}
   */
  chunkText(text, maxWordsPerChunk = 150) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks = [];
    let currentChunk = '';
    let currentWordCount = 0;

    sentences.forEach(sentence => {
      const sentenceWords = sentence.trim().split(/\s+/).length;

      if (currentWordCount + sentenceWords > maxWordsPerChunk && currentChunk.length > 0) {
        chunks.push({
          text: currentChunk.trim(),
          wordCount: currentWordCount,
          index: chunks.length
        });
        currentChunk = '';
        currentWordCount = 0;
      }

      currentChunk += sentence;
      currentWordCount += sentenceWords;
    });

    if (currentChunk.trim().length > 0) {
      chunks.push({
        text: currentChunk.trim(),
        wordCount: currentWordCount,
        index: chunks.length
      });
    }

    return chunks;
  }

  parseFlashcards(content) {
    try {
      let cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      let jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Inget giltigt JSON-format');

      const flashcards = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(flashcards)) throw new Error('Svaret är inte en array');

      flashcards.forEach((fc, i) => {
        if (!fc.front || !fc.back) {
          throw new Error(`Flashcard ${i + 1}: Saknar front eller back`);
        }
        if (!fc.difficulty || !['easy', 'medium', 'hard'].includes(fc.difficulty)) {
          fc.difficulty = 'medium';
        }
      });

      return flashcards;
    } catch (error) {
      console.error('Flashcard parsing error:', error);
      throw new Error(`Kunde inte tolka flashcards: ${error.message}`);
    }
  }

  parseSummary(content) {
    try {
      let cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      let jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Inget giltigt JSON-format');

      const summary = JSON.parse(jsonMatch[0]);
      if (!summary.sections || !Array.isArray(summary.sections)) {
        throw new Error('Saknar sections-array');
      }

      return summary;
    } catch (error) {
      console.error('Summary parsing error:', error);
      throw new Error(`Kunde inte tolka sammanfattning: ${error.message}`);
    }
  }
}

module.exports = new AIStudyHelper();
