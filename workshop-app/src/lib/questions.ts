export interface Question {
  id: string;
  text: string;
}

export interface Theme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
}

export const themes: Theme[] = [
  {
    id: "tema1",
    title: "Tema 1: Bedömning och examination",
    subtitle: "Det akuta läget",
    description:
      "Eftersom AI-detektorer inte fungerar och ChatGPT i princip har gjort traditionella hemuppgifter osäkra, behöver vi prata om hur vi mäter kunskap.",
    questions: [
      {
        id: "t1q1",
        text: "Om vi utgår från att eleven har tillgång till AI dygnet runt, vilka typer av examinationer i våra ämnen håller fortfarande hög rättssäkerhet?",
      },
      {
        id: "t1q2",
        text: 'Hur kan vi flytta fokus från den färdiga texten/produkten till själva lärprocessen? Kan vi bedöma "hjärnarbetet" på andra sätt än genom slutinlämningar?',
      },
      {
        id: "t1q3",
        text: "Hur hanterar vi gränsdragningen? När blir AI-stöd till fusk, och när är det ett legitimt hjälpmedel i vårt ämne?",
      },
    ],
  },
  {
    id: "tema2",
    title: "Tema 2: Elevernas AI-kompetens",
    subtitle: "De fyra områdena",
    description:
      "Falk betonar att det är viktigare att lära eleverna om AI än att använda det som ett verktyg. Han nämner fyra prioriterade områden: Plugghjälp, AI-vänner, Bedrägerier och Praktisk användning.",
    questions: [
      {
        id: "t2q1",
        text: "Vilket av dessa fyra områden anser ni är mest kritiskt för våra elever att förstå just nu?",
      },
      {
        id: "t2q2",
        text: "Hur kan vi konkret lära eleverna att använda AI för att förstå ett ämne bättre (plugghjälp) istället för att bara använda det för att bli klara snabbare?",
      },
      {
        id: "t2q3",
        text: 'Med tanke på riskerna med "AI-vänner" och social påverkan – hur kan vi som lärare stödja elevernas kritiska tänkande kring de emotionella band de kan skapa till tekniken?',
      },
    ],
  },
  {
    id: "tema3",
    title: "Tema 3: Lärarens roll och tidsbesparing",
    subtitle: "The Jagged Frontier",
    description:
      'AI är extremt bra på vissa saker och oväntat dåligt på andra – den så kallade "taggiga gränsen".',
    questions: [
      {
        id: "t3q1",
        text: "I vårt specifika arbetslag: Vilka administrativa uppgifter (t.ex. renskriva anteckningar, sammanfatta dokument, skapa lektionsidéer) skulle vi kunna lämna över till en AI-assistent redan imorgon?",
      },
      {
        id: "t3q2",
        text: "Om vi sparade 30–60 minuter i veckan på administration med hjälp av AI, vad skulle vi vilja lägga den tiden på istället för att höja kvaliteten i undervisningen?",
      },
      {
        id: "t3q3",
        text: "Johan Falk nämner att lärarens omdöme alltid måste gå före AI:ns resultat. Kan vi identifiera situationer i vår yrkesvardag där AI:ns förslag skulle kunna vara direkt missledande eller skadliga?",
      },
    ],
  },
  {
    id: "avslutning",
    title: "Avslutande reflektion",
    subtitle: "Hela gruppen",
    description: "",
    questions: [
      {
        id: "t4q1",
        text: "Vilket är det första lilla steget vi i vårt arbetslag ska ta för att öka vår gemensamma AI-kompetens under den här terminen?",
      },
    ],
  },
];

export function getQuestionText(questionId: string): string {
  for (const theme of themes) {
    for (const q of theme.questions) {
      if (q.id === questionId) return q.text;
    }
  }
  return questionId;
}
