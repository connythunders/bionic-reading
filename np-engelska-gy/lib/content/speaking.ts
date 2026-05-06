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

// NOTE: In the real Nationella Provet for Gymnasiet, Delprov A is conducted in groups/pairs.
// This practice app simulates solo recording with AI feedback.
// The real test includes warm-up, individual presentation, and seminar discussion.

export const speakingTasks: SpeakingTask[] = [
  {
    id: "speaking-1",
    title: "Warm-up: Future Plans and Current Events",
    type: "warmup",
    part: "Del 1 – Uppvärmning",
    level: "B2",
    timeLimit: 120,
    situation:
      "I det riktiga gymnasieprovet börjar Delprov A med en uppvärmning där du på engelska pratar om dig själv, dina framtidsplaner och aktuella händelser. Öva nu på att svara utförligt och nyanserat.",
    taskCard: `Speak for about 2 minutes about yourself and your life.

Cover some of these topics:
• Your plans after gymnasium – university, work, gap year, or something else?
• A current event or issue in Sweden or the world that concerns or interests you
• Something you have achieved or learned recently that you are proud of
• Your views on a topic that matters to young people today
• How you think society has changed for young people compared to previous generations

Aim for developed, nuanced answers. Use examples and personal reflection.`,
    usefulPhrases: [
      "I'm particularly interested in... because...",
      "From my perspective, the key issue is...",
      "What I find most concerning/encouraging about this is...",
      "Having said that, I also think...",
      "In terms of my future plans, I'm considering...",
      "When I reflect on this, I'd say...",
    ],
    assessmentFocus: [
      "Ability to discuss familiar and abstract topics fluently",
      "Use of a range of tenses and complex structures",
      "Nuanced and developed personal opinions",
      "Sophisticated vocabulary for self-expression",
    ],
    pairNote: "I det riktiga gymnasieprovet sker uppvärmningen som ett samtal med examinator och/eller klasskamrat.",
  },
  {
    id: "speaking-2",
    title: "Individual Presentation: The Individual in a Democratic Society",
    type: "presentation",
    part: "Del 2 – Presentation",
    level: "B2-C1",
    timeLimit: 240,
    situation:
      "I Delprov A för gymnasiet ingår en längre individuell presentation där du argumenterar för en ståndpunkt med stöd av exempel och evidens. Tänk på att du presenterar för en panel och klasskamrater.",
    taskCard: `Your presentation topic:

**"The role of the individual in a democratic society"**

Develop a clear argument about what responsibilities – and rights – individuals have in a functioning democracy. In your presentation, address:

1. What does it mean to be an active citizen in a democracy? Is voting enough?
2. To what extent should individuals prioritise collective good over personal interest?
3. How has social media changed the relationship between individuals and democratic institutions?
4. Give a specific example – from Sweden, another country, or history – that supports your argument.

Structure your presentation clearly: introduction, developed argument with evidence, conclusion.
Aim for around 3–4 minutes.`,
    usefulPhrases: [
      "The central argument I want to make is...",
      "This is illustrated by the example of...",
      "One might counter that... however...",
      "The implications of this are significant because...",
      "Drawing on the work of... / According to recent research...",
      "In conclusion, I would argue that...",
      "What this suggests is that...",
    ],
    assessmentFocus: [
      "Ability to structure and deliver a coherent argument",
      "Use of evidence and examples to support claims",
      "Sophisticated academic and argumentative vocabulary",
      "Fluency, pace and prosody appropriate for formal presentation",
      "Critical and analytical thinking expressed in English",
    ],
    pairNote: "I det riktiga gymnasieprovet presenterar du inför en grupp och examinatorn kan ställa följdfrågor.",
  },
  {
    id: "speaking-3",
    title: "Seminar Discussion: Globalisation, AI or Climate Justice",
    type: "discussion",
    part: "Del 3 – Diskussion",
    level: "C1",
    timeLimit: 240,
    situation:
      "I Delprov A för gymnasiet ingår ett seminarium där du diskuterar samhällsfrågor på en analytisk nivå. Välj ett av nedanstående ämnen och argumentera, reflektera och nyansera din ståndpunkt som i ett riktigt seminarium.",
    taskCard: `Choose ONE of these seminar topics and discuss it for 3–4 minutes.
Argue clearly, consider counterarguments, and show analytical depth.

**Topic A: GLOBALISATION**
"Free trade has created more losers than winners globally."
→ Evaluate this claim. Who benefits and who loses from globalisation as currently structured? Is reform possible or desirable?

**Topic B: AI IN SOCIETY**
"Artificial intelligence poses a greater threat to democracy than it does to employment."
→ Do you agree? Consider: disinformation, surveillance, algorithmic bias, concentration of power.

**Topic C: CLIMATE JUSTICE**
"Climate change is primarily a question of justice, not technology."
→ Evaluate this perspective. Who bears the greatest burden of climate change? Does this change the solutions we should prioritise?

Demonstrate: clear thesis, supporting evidence, engagement with counterarguments, nuanced conclusion.`,
    usefulPhrases: [
      "My central contention is that...",
      "The empirical evidence suggests...",
      "This argument fails to account for...",
      "A more nuanced view would hold that...",
      "There is a fundamental tension between... and...",
      "It is worth distinguishing between... and...",
      "Ultimately, the most defensible position is...",
    ],
    assessmentFocus: [
      "Analytical and critical reasoning in spoken English",
      "Engagement with complexity and counterarguments",
      "C1-level vocabulary including abstract and academic register",
      "Coherent discourse structure with connectives and discourse markers",
      "Confident, fluent delivery appropriate for academic seminar",
    ],
    pairNote: "I det riktiga gymnasieprovet genomförs seminariet med klasskamrater i ett strukturerat gruppdiskussionsformat.",
  },
  {
    id: "speaking-4",
    title: "Formal Debate Preparation: Social Media and Society",
    type: "roleplay",
    part: "Del 2 – Presentation",
    level: "B2-C1",
    timeLimit: 180,
    situation:
      "En viktig förmåga i Engelska 6 är att argumentera formellt och strukturerat. I denna övning förbereder du dig för en formell debatt och presenterar ditt argument på engelska.",
    taskCard: `**Debate motion:** "Social media does more harm than good to society."

**Your task:** Argue EITHER for OR against this motion. Choose your side and prepare a 3-minute opening speech.

Your opening speech should include:
1. A clear statement of your position
2. Two or three strong arguments with supporting examples or evidence
3. Acknowledgement and refutation of the strongest opposing argument
4. A memorable concluding statement

**If you argue FOR (social media does more harm):**
Consider: mental health, misinformation, polarisation, addiction, impact on democracy.

**If you argue AGAINST (social media does more good):**
Consider: freedom of expression, social movements, access to information, community building, economic opportunity.

Be persuasive, structured, and show awareness of the complexity of the issue.`,
    usefulPhrases: [
      "Ladies and gentlemen, I stand before you today to argue that...",
      "The evidence overwhelmingly demonstrates that...",
      "My opponents will no doubt argue that... However...",
      "Consider, for example, the case of...",
      "This is not merely a theoretical concern. Studies show that...",
      "I urge you to consider the broader implications of...",
      "For all these reasons, I firmly believe that...",
    ],
    assessmentFocus: [
      "Formal persuasive register appropriate for debate",
      "Structured argument with clear thesis and supporting evidence",
      "Anticipation and rebuttal of opposing arguments",
      "Rhetorical techniques and persuasive language",
      "Confident delivery with appropriate formality",
    ],
    pairNote: "I det riktiga gymnasieprovet sker debatter och diskussioner i grupp med dina klasskamrater.",
  },
];
