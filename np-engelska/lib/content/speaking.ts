export interface SpeakingTask {
  id: string;
  title: string;
  type: "warmup" | "presentation" | "discussion" | "roleplay";
  part: "Del 1 – Uppvärmning" | "Del 2 – Presentation" | "Del 3 – Diskussion";
  level: string;
  timeLimit: number; // in seconds
  situation: string;
  taskCard: string;
  usefulPhrases: string[];
  assessmentFocus: string[];
  pairNote?: string;
}

// NOTE: In the real Nationella Provet, Delprov A is conducted in PAIRS.
// This practice app simulates solo recording with AI feedback.
// The real test has 3 parts: warm-up, presentation/description, and discussion.

export const speakingTasks: SpeakingTask[] = [
  {
    id: "speaking-1",
    title: "Warm-up: About You",
    type: "warmup",
    part: "Del 1 – Uppvärmning",
    level: "B1",
    timeLimit: 90,
    situation:
      "I det riktiga provet börjar Delprov A med en uppvärmning där du pratar om dig själv och vardagliga ämnen på engelska. Öva nu på att svara flytande på personliga frågor.",
    taskCard: `Speak for about 1–2 minutes about yourself and your everyday life.

Cover some of these topics:
• Your school life – favourite subject, least favourite, why
• Something you enjoy doing outside school
• Something important that happened to you recently
• Your plans or hopes for the future
• Something that you think is really important in life

Try to give full answers – not just one sentence. Develop your ideas!`,
    usefulPhrases: [
      "I'm really into... because...",
      "One thing I find interesting is...",
      "When I'm not in school, I usually...",
      "Something that really matters to me is...",
      "I'd like to... in the future because...",
      "Looking back, I think...",
    ],
    assessmentFocus: [
      "Ability to speak about familiar topics",
      "Use of present, past and future tenses",
      "Personal vocabulary and fluency",
      "Ability to develop and elaborate ideas",
    ],
    pairNote: "I det riktiga provet sker detta som en konversation med en klasskamrat.",
  },
  {
    id: "speaking-2",
    title: "Presentation: The World Around Us",
    type: "presentation",
    part: "Del 2 – Presentation",
    level: "B1-B2",
    timeLimit: 180,
    situation:
      "I det riktiga provet (Del 2) tar du emot ett kort med ett ämne eller en fråga kopplad till provets tema. Du presenterar innehållet och diskuterar det sedan med din partner. Här övar du på presentationsdelen solo.",
    taskCard: `Your topic card:

**"Connections – How technology has changed the way we relate to each other"**

In your presentation, address these points:
1. How has technology changed the way young people communicate compared to previous generations?
2. What do you think is the most important thing technology gives us – and what might we be losing?
3. Do you think it is possible to have a real friendship that exists only online? Why or why not?
4. What changes would you make to the way you personally use technology?

Try to develop each point with reasons and personal examples. Aim for around 2–3 minutes.`,
    usefulPhrases: [
      "I'd like to start by talking about...",
      "One thing that has changed significantly is...",
      "On the one hand... but on the other hand...",
      "From my own experience...",
      "I think the most important issue here is...",
      "What strikes me most about this is...",
      "To conclude, I'd argue that...",
    ],
    assessmentFocus: [
      "Ability to present and develop ideas clearly",
      "Argumentation and supporting opinions with reasons",
      "Range of vocabulary on a relevant topic",
      "Fluency, pronunciation and prosody",
      "Ability to reflect and think critically",
    ],
    pairNote: "I det riktiga provet presenterar du för din partner, som sedan ställer följdfrågor.",
  },
  {
    id: "speaking-3",
    title: "Discussion: Values and Society",
    type: "discussion",
    part: "Del 3 – Diskussion",
    level: "B1-B2",
    timeLimit: 180,
    situation:
      "I del 3 av det riktiga provet väljer du och din partner diskussionskort med frågor om samhälle, värderingar och aktuella frågor. Här övar du på att resonera och argumentera på engelska – tänk att du pratar med en partner.",
    taskCard: `Choose ONE of these discussion cards and speak about it for 2–3 minutes.
Argue, reflect, and develop your thinking.

**Card 1: FAIRNESS**
"Life is not fair – and that's fine."
→ Do you agree or disagree? Give reasons. Think about: opportunities, education, wealth, effort vs luck.

**Card 2: ENVIRONMENT**
"Individuals can't solve the climate crisis – only governments and companies can."
→ Do you agree? What can young people actually do? Is individual action meaningful or just symbolic?

**Card 3: IDENTITY**
"Social media forces people to perform a version of themselves rather than be themselves."
→ Is this true? Is it always negative? Can you be authentic online?

Try to: give your opinion clearly, consider different perspectives, and use examples from real life.`,
    usefulPhrases: [
      "I strongly believe that...",
      "While I understand the argument that..., I think...",
      "There's an important distinction between...",
      "Take for example the fact that...",
      "One counter-argument might be... but I'd respond by saying...",
      "Ultimately, the key issue is...",
      "What concerns me most about this is...",
    ],
    assessmentFocus: [
      "Expressing and justifying opinions clearly",
      "Considering multiple perspectives",
      "Using discourse markers and connectors",
      "Sophisticated vocabulary for argumentation",
      "Fluency and communicative confidence",
    ],
    pairNote: "I det riktiga provet diskuterar du dessa frågor med en klasskamrat i ett samtal.",
  },
  {
    id: "speaking-4",
    title: "Role Play: Solving a Problem",
    type: "roleplay",
    part: "Del 2 – Presentation",
    level: "B1",
    timeLimit: 150,
    situation:
      "En vanlig uppgiftstyp i Delprov A innebär att du och din partner löser ett problem eller tar ett beslut tillsammans. Här övar du på att förhandla, föreslå och komma överens på engelska.",
    taskCard: `**Situation:** You and your partner are organising a fundraising event for your school.

You need to agree on:
1. What type of event to hold (a concert, a sports day, a talent show, a market, or your own idea)
2. Who the event will raise money for (a local charity, an international cause, or your school)
3. How to promote the event to get as many people as possible to come

**Your role:** You think the event should be fun and involve as many students as possible.
You are slightly worried about cost and organisation.

Discuss all three points and try to reach an agreement. Express your opinions, ask questions, and respond to what the other person suggests.`,
    usefulPhrases: [
      "What do you think about...?",
      "I was thinking we could...",
      "That's a good idea, but what about...?",
      "I'm not sure about that because...",
      "Could we maybe compromise by...?",
      "I agree with you on that point.",
      "Let's go with... then, shall we?",
    ],
    assessmentFocus: [
      "Interactive communication and turn-taking",
      "Making and responding to suggestions",
      "Negotiation and reaching agreement",
      "Asking for and giving opinions",
      "Natural, flowing conversation",
    ],
    pairNote: "I det riktiga provet genomförs rollspelet med en klasskamrat – inte med läraren.",
  },
];
