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
    title: "Argumentative Essay: Should University Education Be Free?",
    delprov: "Delprov D – Argumenterande text",
    genre: "Argumentative essay",
    situation:
      "You have been asked to write an argumentative essay for an international student publication on the topic of higher education funding. Your essay should present a clear position supported by evidence and reasoning.",
    prompt:
      "Write an argumentative essay on the following question: 'Should university education be free for all students?' Present a clear thesis, develop your argument with at least two supporting points and evidence, acknowledge and address the strongest counterargument, and conclude with a recommendation. Aim for 250–350 words.",
    wordCount: { min: 200, max: 400 },
    tips: [
      "Begin with a clear thesis statement that states your position directly",
      "Each paragraph should develop one argument with supporting evidence or examples",
      "Use academic linking words: however, nevertheless, consequently, furthermore, it could be argued that",
      "Acknowledge the strongest counterargument and refute it with reasoning",
      "Avoid informal language and contractions – maintain academic register throughout",
      "End with a conclusion that restates your position and makes a clear recommendation",
    ],
    exampleOpener:
      "The question of whether higher education should be fully funded by the state sits at the intersection of economic policy, social justice, and educational philosophy.",
    assessmentCriteria: {
      content: "Clear thesis; at least two well-developed arguments with evidence; counterargument acknowledged and addressed; relevant conclusion with recommendation",
      language: "Academic register; varied sentence structures; sophisticated argumentative vocabulary; accurate grammar and punctuation",
      structure: "Clear introduction with thesis; logically organised body paragraphs; coherent transitions; effective conclusion",
    },
  },
  {
    id: "writing-2",
    title: "Report: Youth Mental Health for a School Committee",
    delprov: "Delprov D – Rapport",
    genre: "Formal report",
    situation:
      "Your school's student council has been asked to produce a report for the school management committee on the issue of mental health among young people. The report should present findings, analyse causes and make recommendations.",
    prompt:
      "Write a formal report on youth mental health for your school's management committee. Your report should: summarise the current state of youth mental health (drawing on what you know); identify two or three key contributing factors; and make two or three specific, realistic recommendations for what schools can do. Use formal report format with headings. Aim for 200–300 words.",
    wordCount: { min: 150, max: 350 },
    tips: [
      "Use a formal report structure with headings: Introduction, Findings, Recommendations, Conclusion",
      "Write in formal third person where appropriate: 'It is recommended that...'",
      "Be specific and practical in your recommendations – avoid vague statements",
      "Use passive voice where appropriate to create an objective tone",
      "Avoid personal anecdotes – reports present general findings and recommendations",
      "Number your recommendations for clarity",
    ],
    exampleOpener:
      "Report on Youth Mental Health\nPrepared by the Student Council\nDate: [Date]\n\n1. Introduction\nThis report examines the current state of mental health among young people and sets out recommendations for school policy.",
    assessmentCriteria: {
      content: "Relevant findings on youth mental health; clear identification of causes; specific and realistic recommendations",
      language: "Formal, impersonal register; passive constructions; professional vocabulary; accurate grammar",
      structure: "Clear report format with headings; logical flow from findings to recommendations; appropriate conclusion",
    },
  },
  {
    id: "writing-3",
    title: "Opinion Article: Is Social Media Destroying Democracy?",
    delprov: "Delprov D – Artikel",
    genre: "Opinion article",
    situation:
      "A national English-language newspaper has invited readers aged 16–20 to submit opinion articles on major issues facing society today. You have decided to write about the relationship between social media and democracy.",
    prompt:
      "Write an opinion article for a newspaper on the question: 'Is social media destroying democracy?' Take a clear position. Support your argument with specific examples or evidence, consider at least one counterargument, and write in a style appropriate for a newspaper opinion column – engaging, persuasive, and aimed at a general educated audience. Aim for 200–300 words.",
    wordCount: { min: 150, max: 350 },
    tips: [
      "Use an engaging headline and opening that draws the reader in immediately",
      "Write in first person and use a clear, confident authorial voice",
      "Back up your claims with specific examples – name platforms, events, or research",
      "Use rhetorical questions or direct address to engage the reader",
      "Balance argument with awareness of complexity – avoid oversimplification",
      "End with a strong, memorable conclusion or call to action",
    ],
    exampleOpener:
      "Every morning, millions of people wake up and hand their political opinions to an algorithm. That algorithm decides what they see, what they believe, and – increasingly – how they vote.",
    assessmentCriteria: {
      content: "Clear position; specific examples or evidence; counterargument considered; engaging and relevant for a newspaper audience",
      language: "Persuasive, engaging register; rhetorical techniques; varied and sophisticated vocabulary; accurate grammar",
      structure: "Compelling opening; logically developed argument; strong conclusion; appropriate journalistic style",
    },
  },
  {
    id: "writing-4",
    title: "Formal Letter: Application for an International Exchange Scholarship",
    delprov: "Delprov D – Formellt brev",
    genre: "Formal letter/email",
    situation:
      "You have seen an advertisement for an international exchange scholarship that would allow you to study at a partner school or university abroad for one semester. You must write a formal letter of application explaining why you should be selected.",
    prompt:
      "Write a formal letter of application for an international exchange scholarship. In your letter: introduce yourself and state clearly why you are applying; explain what you hope to gain from the exchange; describe what you would contribute to the host institution; and explain why you are a strong candidate. Use formal letter format and maintain a professional tone throughout. Aim for 150–200 words.",
    wordCount: { min: 120, max: 250 },
    tips: [
      "Open with 'Dear Sir/Madam' or 'Dear Selection Committee' and close with 'Yours faithfully'",
      "Use formal, polished language – no contractions or colloquialisms",
      "Structure your letter clearly: introduction, body paragraphs, formal close",
      "Be specific about your academic interests and personal qualities",
      "Show awareness of what you can offer as well as what you hope to gain",
      "Avoid generic phrases – personalise your application with specific details",
    ],
    exampleOpener:
      "Dear Selection Committee,\n\nI am writing to apply for the International Exchange Scholarship advertised on your institution's website. As a student of [subject] at [school], I believe I am an excellent candidate for this opportunity.",
    assessmentCriteria: {
      content: "Clear motivation for applying; specific goals and contributions described; convincing case for candidacy",
      language: "Formal register throughout; no contractions; sophisticated vocabulary; accurate and varied grammar",
      structure: "Correct formal letter format; clear paragraphs with distinct purposes; appropriate opening and closing",
    },
  },
];
