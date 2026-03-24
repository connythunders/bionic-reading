export interface WritingTask {
  id: string;
  title: string;
  delprov: string;
  genre: string;
  situation: string;
  prompt: string;
  wordCount: { min: number; max: number };
  tips: string[];
  exampleOpener?: string;
  assessmentCriteria: {
    content: string;
    language: string;
    structure: string;
  };
}

export const writingTasks: WritingTask[] = [
  {
    id: "writing-1",
    title: "An Email to Your English Friend",
    delprov: "Delprov C – Kortare text",
    genre: "Informal email",
    situation:
      "Your British pen pal, Alex, has asked you about a memorable experience you had recently. Write an email to Alex describing what happened and how you felt about it.",
    prompt:
      "Write an informal email to your pen pal Alex. Describe a memorable experience you had recently (for example: a trip, a concert, a sports event, or something that surprised you). Tell Alex what happened, what you saw or did, and how you felt. Ask Alex a question at the end. Aim for around 80–120 words.",
    wordCount: { min: 60, max: 150 },
    tips: [
      "Use an informal tone – as if writing to a friend",
      "Include a greeting (Hi Alex, / Dear Alex,) and a sign-off (Best, / See you soon,)",
      "Use past tenses (went, was, felt, saw) to describe what happened",
      "Include some personal reaction – how did you feel? What did you think?",
      "End with a question to make it feel like a real exchange",
    ],
    exampleOpener: "Hi Alex,\n\nHow are you? I just had to tell you about...",
    assessmentCriteria: {
      content: "Describes a real experience clearly; includes personal reaction; asks a question",
      language: "Appropriate informal vocabulary; variety of tenses; correct sentence structure",
      structure: "Clear beginning, middle and end; greeting and sign-off present",
    },
  },
  {
    id: "writing-2a",
    title: "Article for School Magazine",
    delprov: "Delprov C – Längre text (Option A)",
    genre: "Magazine article",
    situation:
      "Your school's English-language magazine is inviting students to write about topics they care about.",
    prompt:
      "Write an article for your school's English magazine. Choose a topic that you find interesting or important (for example: the environment, technology, sport, music, film, mental health, or anything else that matters to you). Explain why this topic is important and share your opinion. Aim for around 150–250 words.",
    wordCount: { min: 100, max: 300 },
    tips: [
      "Start with an engaging opening that grabs the reader's attention",
      "Organise your ideas into clear paragraphs",
      "Give reasons and examples to support your opinions",
      "Use a mix of sentence lengths for variety",
      "End with a memorable conclusion or call to action",
      "A magazine article can use subheadings or a catchy title",
    ],
    exampleOpener: "Every day, millions of people...",
    assessmentCriteria: {
      content: "Clear and interesting topic; supported opinions; relevant examples; engaging for the reader",
      language: "Varied vocabulary; range of grammatical structures; appropriate formal-neutral register",
      structure: "Well-organised paragraphs; clear introduction and conclusion; logical flow",
    },
  },
  {
    id: "writing-2b",
    title: "Continue the Story",
    delprov: "Delprov C – Längre text (Option B)",
    genre: "Short story / narrative",
    situation: "You are given the beginning of a story and must continue it.",
    prompt:
      'Continue the story that begins with: "The letter arrived on a Tuesday morning, and I knew the moment I saw the handwriting that everything was about to change." Use your imagination – you can take the story in any direction. Aim for around 150–250 words.',
    wordCount: { min: 100, max: 300 },
    tips: [
      "Use the past tense to tell your story (arrived, walked, said, felt)",
      "Create a sense of atmosphere – describe what the character sees, hears, or feels",
      "Include some dialogue to make the story feel alive",
      "Build towards a moment of change or revelation",
      "Think about who the character is and what makes them interesting",
      "Don't rush – let the story unfold naturally",
    ],
    exampleOpener:
      "The letter arrived on a Tuesday morning, and I knew the moment I saw the handwriting that everything was about to change.",
    assessmentCriteria: {
      content: "Engaging and coherent narrative; developed characters or situation; logical continuation",
      language: "Narrative tenses used correctly; descriptive vocabulary; varied sentence structures",
      structure: "Clear story arc; good use of paragraphs; engaging ending",
    },
  },
  {
    id: "writing-3",
    title: "Formal Letter of Complaint",
    delprov: "Delprov C – Formell text",
    genre: "Formal letter",
    situation:
      "You visited a museum last weekend that was very disappointing. Several things were wrong: the café was closed, two main exhibitions were shut, and the staff were unhelpful.",
    prompt:
      "Write a formal letter of complaint to the Director of the museum. Explain what went wrong during your visit, how it made you feel, and what you think the museum should do. Aim for around 150–200 words.",
    wordCount: { min: 100, max: 300 },
    tips: [
      "Use a formal tone – no contractions (do not instead of don't)",
      "Open with 'Dear Sir/Madam' and close with 'Yours faithfully'",
      "State the purpose clearly in the first paragraph",
      "Give specific examples of what went wrong",
      "Be firm but polite – explain the impact on you",
      "End by stating what you expect as a response",
    ],
    exampleOpener: "Dear Sir or Madam,\n\nI am writing to express my disappointment regarding my recent visit to...",
    assessmentCriteria: {
      content: "All complaints mentioned; clear impact stated; reasonable request made",
      language: "Formal register maintained throughout; polite but assertive tone; accurate grammar",
      structure: "Formal letter format; clear paragraph structure; appropriate opening and closing",
    },
  },
];
