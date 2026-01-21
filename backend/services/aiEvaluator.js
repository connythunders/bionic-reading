const Anthropic = require('@anthropic-ai/sdk');

class AIEvaluator {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  /**
   * Genererar personlig feedback baserat på quiz-resultat
   * @param {Object} params
   * @param {Array} params.questions - Quiz-frågorna
   * @param {Array} params.userAnswers - Användarens svar
   * @param {number} params.score - Antal rätt
   * @param {number} params.totalQuestions - Totalt antal frågor
   * @returns {Promise<string>} - AI-genererad feedback
   */
  async generateFeedback({ questions, userAnswers, score, totalQuestions }) {
    const percentage = ((score / totalQuestions) * 100).toFixed(1);

    // Analysera svar per topic
    const analysis = this.analyzeAnswers(questions, userAnswers);

    const prompt = `Du är en empatisk och uppmuntrande lärare som ger konstruktiv feedback till elever i årskurs 7-9.

Analysera elevens quiz-resultat och ge personlig, uppmuntrande feedback.

QUIZ-RESULTAT:
- Totalt antal frågor: ${totalQuestions}
- Rätt svar: ${score}
- Procent: ${percentage}%

TEMAN SOM ELEVEN BEHÄRSKAR BRA:
${analysis.masteredTopics.length > 0 ? analysis.masteredTopics.join(', ') : 'Inga teman uppnådde 80% eller högre'}

TEMAN SOM BEHÖVER MER TRÄNING:
${analysis.weakTopics.length > 0 ? analysis.weakTopics.join(', ') : 'Inga specifika svaga områden identifierade'}

DETALJERAD ANALYS:
${this.formatTopicAnalysis(analysis.topicStats)}

Skapa personlig feedback (150-250 ord) som:
1. Börjar positivt och uppmuntrande
2. Beröm specifika styrkor baserat på rätt svar
3. Identifiera kunskapsluckor konstruktivt och empatiskt
4. Ge 3-4 konkreta studietekniker eller fokusområden
5. Avsluta motiverande och uppmuntrande

TON: Vänlig, professionell, uppmuntrande, personlig
SPRÅK: Svenska
FORMAT: Löpande text i paragrafer. INGEN markdown, INGA punktlistor, INGA rubriker.`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text.trim();
    } catch (error) {
      console.error('AI Evaluation Error:', error);
      // Fallback feedback om AI-anropet misslyckas
      return this.generateFallbackFeedback(score, totalQuestions, percentage);
    }
  }

  /**
   * Analyserar svar per topic
   * @param {Array} questions
   * @param {Array} userAnswers
   * @returns {Object}
   */
  analyzeAnswers(questions, userAnswers) {
    const topicStats = {};

    questions.forEach((question, index) => {
      const topic = question.topic || 'Allmänt';
      const isCorrect = userAnswers[index] === question.correct;

      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          correct: 0,
          percentage: 0
        };
      }

      topicStats[topic].total++;
      if (isCorrect) {
        topicStats[topic].correct++;
      }
    });

    // Beräkna procentandelar
    Object.keys(topicStats).forEach(topic => {
      const stats = topicStats[topic];
      stats.percentage = (stats.correct / stats.total) * 100;
    });

    // Identifiera starka och svaga områden
    const masteredTopics = [];
    const weakTopics = [];

    Object.entries(topicStats).forEach(([topic, stats]) => {
      if (stats.percentage >= 80) {
        masteredTopics.push(`${topic} (${stats.correct}/${stats.total})`);
      } else if (stats.percentage < 60) {
        weakTopics.push(`${topic} (${stats.correct}/${stats.total})`);
      }
    });

    return {
      topicStats,
      masteredTopics,
      weakTopics
    };
  }

  /**
   * Formaterar topic-analys för prompten
   * @param {Object} topicStats
   * @returns {string}
   */
  formatTopicAnalysis(topicStats) {
    return Object.entries(topicStats)
      .map(([topic, stats]) => {
        return `- ${topic}: ${stats.correct}/${stats.total} rätt (${stats.percentage.toFixed(0)}%)`;
      })
      .join('\n');
  }

  /**
   * Genererar fallback-feedback om AI-anropet misslyckas
   * @param {number} score
   * @param {number} totalQuestions
   * @param {number} percentage
   * @returns {string}
   */
  generateFallbackFeedback(score, totalQuestions, percentage) {
    if (percentage >= 90) {
      return `Fantastiskt bra jobbat! Du fick ${score} av ${totalQuestions} rätt, vilket är ett utmärkt resultat på ${percentage}%. Du visar mycket god förståelse för materialet. Fortsätt det goda arbetet och fördjupa dina kunskaper genom att utforska relaterade ämnen.`;
    } else if (percentage >= 70) {
      return `Bra jobbat! Du fick ${score} av ${totalQuestions} rätt (${percentage}%). Du visar god grundförståelse för materialet. Fokusera på att gå igenom de områden där du hade fler felaktiga svar för att stärka dina kunskaper ytterligare.`;
    } else if (percentage >= 50) {
      return `Du fick ${score} av ${totalQuestions} rätt (${percentage}%). Det finns god potential här! Jag rekommenderar att du går igenom materialet igen, särskilt de delar som du hade svårt med. Försök att identifiera mönster i vad du kan och fokusera på att stärka de svagare områdena.`;
    } else {
      return `Du fick ${score} av ${totalQuestions} rätt (${percentage}%). Det kan vara bra att gå igenom materialet mer grundligt. Ta dig tid att verkligen förstå de viktiga koncepten. Överväg att läsa texten igen och anteckna nyckelpunkter. Ge inte upp - lärande tar tid!`;
    }
  }

  /**
   * Genererar en kort sammanfattning av prestationen
   * @param {number} percentage
   * @returns {string}
   */
  getPerformanceLevel(percentage) {
    if (percentage >= 90) return 'Utmärkt';
    if (percentage >= 80) return 'Mycket bra';
    if (percentage >= 70) return 'Bra';
    if (percentage >= 60) return 'Godkänt';
    if (percentage >= 50) return 'Underkänt men nära';
    return 'Behöver mer träning';
  }
}

module.exports = new AIEvaluator();
