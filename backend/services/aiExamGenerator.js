const Anthropic = require('@anthropic-ai/sdk');
const { z } = require('zod/v4');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');

const DIFFICULTY_NAMES = ['Lätt', 'Medel', 'Svår'];
const MODEL = 'claude-opus-5';

const QuestionSchema = z.object({
  question: z.string(),
  hints: z.array(z.string()).length(3),
});

class AIExamGenerator {
  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.enabled = Boolean(this.apiKey && this.apiKey !== 'your_api_key_here');

    if (this.enabled) {
      this.client = new Anthropic({ apiKey: this.apiKey });
    }
  }

  isEnabled() {
    return this.enabled;
  }

  /**
   * Genererar en unik, öppen provfråga med tillhörande ledtrådar.
   * @param {Object} params
   * @param {string} params.subject
   * @param {string} params.topic
   * @param {number} params.grade
   * @param {number} params.difficulty - 0 (lätt), 1 (medel), 2 (svår)
   * @param {'topic'|'text'} params.mode
   * @param {string} [params.sourceText]
   * @param {string[]} [params.askedQuestions]
   * @returns {Promise<{question: string, hints: string[]}>}
   */
  async generateQuestion({ subject, topic, grade, difficulty, mode, sourceText, askedQuestions = [] }) {
    if (!this.enabled) {
      throw new Error('AI är inte konfigurerad på servern (ANTHROPIC_API_KEY saknas)');
    }

    const difficultyText = DIFFICULTY_NAMES[difficulty] || DIFFICULTY_NAMES[1];
    const gradeText = grade <= 9 ? `högstadiet årskurs ${grade}` : `gymnasiet årskurs ${grade - 9}`;
    const previousQuestions = askedQuestions.join('\n');

    const prompt = mode === 'text'
      ? this.buildTextModePrompt({ subject, topic, difficultyText, gradeText, sourceText, previousQuestions })
      : this.buildTopicModePrompt({ subject, topic, difficultyText, gradeText, previousQuestions });

    const response = await this.client.messages.parse({
      model: MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
      output_config: { format: zodOutputFormat(QuestionSchema) },
    });

    if (!response.parsed_output) {
      throw new Error('Kunde inte tolka AI-svaret');
    }

    return response.parsed_output;
  }

  buildTopicModePrompt({ subject, topic, difficultyText, gradeText, previousQuestions }) {
    return `Du är en lärare som skapar provfrågor i ${subject}.

ÄMNE: ${topic}
SVÅRIGHETSGRAD: ${difficultyText}
ÅRSKURS: ${gradeText}

TIDIGARE FRÅGOR (undvik att upprepa dessa):
${previousQuestions}

Skapa EN unik ÖPPEN provfråga på ${difficultyText} nivå om ${topic} för ${gradeText}.

VIKTIGT:
- Frågan ska vara HELT UNIK och inte likna tidigare frågor
- Frågan ska vara ÖPPEN - eleven ska skriva ett resonerande svar (INTE flerval!)
- Anpassa språk och komplexitet för årskursen
- Lätt: Grundläggande fakta och förståelse (t.ex. "Beskriv...", "Vad innebär...", "Förklara...")
- Medel: Förklara samband, orsaker och konsekvenser (t.ex. "Varför...", "Hur påverkade...")
- Svår: Analysera, utvärdera, jämför perspektiv (t.ex. "Analysera...", "Diskutera...", "Bedöm...")

UNDVIK:
- Flervalsfrågor ("Vilket av följande...")
- Ja/nej-frågor
- Frågor som kräver endast ett ord som svar

Skapa också 3 SOKRATISKA ledtrådar som hjälper eleven att tänka själv (ge INTE svaret direkt).`;
  }

  buildTextModePrompt({ subject, topic, difficultyText, gradeText, sourceText, previousQuestions }) {
    return `Du är en lärare som skapar provfrågor i ${subject}.

ÄMNE: ${topic}
SVÅRIGHETSGRAD: ${difficultyText}
ÅRSKURS: ${gradeText}

TEXTEN SOM ELEVERNA HAR LÄST:
${sourceText}

TIDIGARE FRÅGOR (undvik att upprepa dessa):
${previousQuestions}

Skapa EN unik ÖPPEN provfråga på ${difficultyText} nivå som testar elevens FÖRSTÅELSE AV JUST DENNA TEXT.

VIKTIGT:
- Frågan ska baseras på KONKRET information i texten
- Frågan ska vara ÖPPEN - eleven ska skriva ett resonerande svar (INTE flerval!)
- Eleven har läst texten men kan INTE se den under provet - frågor ska testa vad de MINNS
- Anpassa språk och komplexitet för årskursen
- Lätt: Grundläggande förståelse (t.ex. "Vad handlade texten om?", "Beskriv...")
- Medel: Förklara samband (t.ex. "Varför...", "Hur hänger ... ihop...")
- Svår: Analysera och reflektera (t.ex. "Analysera...", "Diskutera...")

UNDVIK:
- Flervalsfrågor
- Ja/nej-frågor
- Frågor om kunskap UTANFÖR texten
- fraser som "enligt texten", "använd exempel från texten", "citera texten"
- be eleven referera till specifika delar eller citat

Skapa också 3 SOKRATISKA ledtrådar som hjälper eleven minnas och resonera.`;
  }
}

module.exports = new AIExamGenerator();
