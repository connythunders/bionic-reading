export interface ListeningQuestion {
  id: string;
  question: string;
  options?: string[];
  type: "multiple-choice" | "short-answer";
  correctAnswer: string | number;
  explanation: string;
}

export interface ListeningTrack {
  id: string;
  title: string;
  description: string;
  level: string;
  genre: string;
  voice: "female" | "male";
  script: string;
  questions: ListeningQuestion[];
}

export const listeningTracks: ListeningTrack[] = [
  {
    id: "track-1",
    title: "A Debate on Universal Basic Income",
    description: "Two economists – one in favour, one against – debate whether universal basic income is a viable policy",
    level: "B2-C1",
    genre: "Formal debate",
    voice: "male",
    script: `Moderator: Welcome to today's debate. Our first speaker, Professor Davies, supports universal basic income. Our second speaker, Dr Marchetti, opposes it. Professor Davies, please begin.

Professor Davies: Thank you. Universal basic income – the idea of giving every citizen a regular, unconditional cash payment – is not a radical fantasy. It is a practical response to the growing insecurity of the modern labour market. Automation is eliminating millions of jobs, and the safety net of traditional welfare is riddled with gaps. A universal basic income would give people the financial foundation to retrain, start businesses, care for family members, or pursue creative work. Pilot programmes in Finland and Kenya have shown improvements in wellbeing, mental health, and even employment rates.

Dr Marchetti: With respect, the evidence from pilots is far from conclusive. These were small-scale, time-limited programmes – they cannot reliably predict the effects of a nationwide policy. More fundamentally, a universal basic income is extraordinarily expensive. If it is set high enough to actually meet people's needs, the cost would require either massive tax rises or cuts to existing services. And if it replaces existing targeted benefits, the poorest and most vulnerable members of society could end up worse off, not better.

Professor Davies: Those are concerns about implementation, not the principle itself. A well-designed system would complement existing services, not replace them. The question is not whether we can afford universal basic income – it is whether we can afford the social and economic cost of not having it, as inequality deepens and traditional employment continues to decline.

Dr Marchetti: I agree that inequality is a serious problem. But there are more targeted and cost-effective ways to address it – through investment in education, healthcare, affordable housing and a genuinely adequate minimum wage. A universal basic income is, by definition, not targeted. It pays the wealthy as much as the poor.

Moderator: Thank you both. We'll open to questions shortly.`,
    questions: [
      {
        id: "q1",
        question: "What reason does Professor Davies give for why universal basic income is needed now?",
        options: [
          "A) Because governments have too much money and do not know how to spend it",
          "B) Because automation is destroying jobs and traditional welfare has gaps",
          "C) Because most people are choosing not to work under the current system",
          "D) Because Finland and Kenya have already introduced it successfully nationwide",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Professor Davies argues automation is 'eliminating millions of jobs' and the current welfare system is 'riddled with gaps.'",
      },
      {
        id: "q2",
        question: "What is Dr Marchetti's main criticism of the evidence from UBI pilot programmes?",
        options: [
          "A) The pilots were conducted in countries with very different economies",
          "B) The pilots showed negative effects on employment and wellbeing",
          "C) The pilots were too small and short to reliably predict nationwide effects",
          "D) The pilots were poorly designed and methodologically flawed",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Dr Marchetti calls the pilots 'small-scale, time-limited programmes' that 'cannot reliably predict the effects of a nationwide policy.'",
      },
      {
        id: "q3",
        question: "What does Dr Marchetti suggest as an alternative to universal basic income?",
        options: [
          "A) Reducing taxes for low-income workers",
          "B) Giving additional benefits to unemployed people only",
          "C) Targeted investment in education, healthcare, housing and minimum wage",
          "D) Expanding the existing welfare system without major reform",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Dr Marchetti proposes 'investment in education, healthcare, affordable housing and a genuinely adequate minimum wage.'",
      },
      {
        id: "q4",
        question: "How does Professor Davies respond to concerns about the cost of universal basic income?",
        options: [
          "A) By arguing it would replace all existing welfare payments",
          "B) By questioning whether society can afford the cost of not having it",
          "C) By claiming it would generate economic growth sufficient to pay for itself",
          "D) By arguing tax rises would be modest and widely supported",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Professor Davies asks 'whether we can afford the social and economic cost of not having it.'",
      },
      {
        id: "q5",
        question: "What does Dr Marchetti mean when he says 'A universal basic income is, by definition, not targeted'?",
        type: "short-answer",
        correctAnswer: "He means UBI is paid to everyone regardless of need, including wealthy people – it does not focus resources on those who need them most.",
        explanation: "Dr Marchetti's point is that UBI pays the wealthy as much as the poor, unlike targeted benefits which go only to those in need.",
      },
    ],
  },
  {
    id: "track-2",
    title: "Interview with a Climate Scientist",
    description: "A journalist interviews a climate scientist about climate tipping points and what they mean for the future",
    level: "B2-C1",
    genre: "Radio interview",
    voice: "female",
    script: `Interviewer: Welcome back. Today I'm speaking with Dr Yuki Tanaka, a climate scientist at the Potsdam Institute. Dr Tanaka, there's a lot of talk about climate tipping points. Can you explain what they actually are?

Dr Tanaka: Certainly. A tipping point is a threshold in the climate system beyond which change becomes self-sustaining and potentially irreversible. Think of it like a ball balanced on top of a hill. A small push can send it rolling in a direction it won't return from. An example is the melting of the Greenland ice sheet. If it melts beyond a certain point, the process accelerates on its own, regardless of what humans do – because the darker ocean surface that is exposed absorbs more solar heat, which causes further melting.

Interviewer: How many of these tipping points are scientists currently worried about?

Dr Tanaka: Recent research has identified at least sixteen interconnected tipping elements in the Earth system. What's particularly alarming is the possibility of cascades – where crossing one tipping point triggers others in a chain reaction. For example, the collapse of the Amazon rainforest could reduce rainfall patterns across South America and beyond, affecting other ecosystems.

Interviewer: Are we close to crossing any of these thresholds?

Dr Tanaka: Some may already be in the process of being crossed. We're seeing changes in the West Antarctic Ice Sheet and in coral reef systems that suggest we are closer to irreversible transitions than many previously assumed. The scientific consensus is that staying below 1.5 degrees Celsius of warming significantly reduces the risk of triggering the most dangerous cascades.

Interviewer: Is there still reason for hope?

Dr Tanaka: Absolutely. The same concept of tipping points applies to human systems – technology, policy, social norms. The adoption of renewable energy has accelerated far faster than most models predicted. There are positive tipping points too. The question is whether the human system can tip in the right direction quickly enough.`,
    questions: [
      {
        id: "q1",
        question: "How does Dr Tanaka explain a climate tipping point?",
        options: [
          "A) As a temperature at which climate change stops accelerating",
          "B) As a threshold beyond which change becomes self-sustaining and potentially irreversible",
          "C) As a point at which governments must take immediate action on emissions",
          "D) As the moment when weather patterns become permanently disrupted",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Dr Tanaka defines a tipping point as 'a threshold in the climate system beyond which change becomes self-sustaining and potentially irreversible.'",
      },
      {
        id: "q2",
        question: "What does the 'ball on a hill' metaphor illustrate?",
        options: [
          "A) That climate change is slow and gradual",
          "B) That small changes can trigger large, irreversible processes",
          "C) That climate scientists can easily predict when tipping points will be reached",
          "D) That the Greenland ice sheet is in a stable condition",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The metaphor shows that a small push (change) can set off an unstoppable chain of events – representing irreversible tipping.",
      },
      {
        id: "q3",
        question: "What is a 'cascade' in the context of climate tipping points?",
        options: [
          "A) A sudden increase in global temperatures over a short period",
          "B) When one tipping point triggers a chain reaction of other tipping points",
          "C) The process by which rainfall patterns change in tropical regions",
          "D) A scientific model used to predict future climate change",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Dr Tanaka explains that cascades occur 'where crossing one tipping point triggers others in a chain reaction.'",
      },
      {
        id: "q4",
        question: "What temperature limit does Dr Tanaka say significantly reduces the risk of dangerous cascades?",
        options: [
          "A) 2 degrees Celsius",
          "B) 1 degree Celsius",
          "C) 1.5 degrees Celsius",
          "D) 3 degrees Celsius",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Dr Tanaka says 'staying below 1.5 degrees Celsius of warming significantly reduces the risk of triggering the most dangerous cascades.'",
      },
      {
        id: "q5",
        question: "How does Dr Tanaka offer hope at the end of the interview? What does she mean by 'positive tipping points'?",
        type: "short-answer",
        correctAnswer: "She argues that tipping points can also apply to human systems (technology, policy, social norms), and that positive tipping points – like the faster-than-expected adoption of renewable energy – show that human society can change rapidly in a good direction.",
        explanation: "Dr Tanaka points out that renewable energy adoption has accelerated faster than predicted, suggesting that human systems can also reach tipping points in a positive direction.",
      },
    ],
  },
  {
    id: "track-3",
    title: "University Lecture Excerpt: The History of Globalisation",
    description: "An extract from an academic lecture on the history and contested meaning of globalisation",
    level: "C1",
    genre: "Academic lecture",
    voice: "male",
    script: `Good morning, everyone. Today I want to begin by challenging what I consider to be a widespread misconception: the idea that globalisation is a modern phenomenon that began sometime in the late twentieth century with the rise of digital communication and free trade agreements.

In fact, the movement of goods, people, ideas and capital across great distances has characterised human civilisation for millennia. The Silk Road connected the economies of China, Central Asia, the Middle East and Europe for over a thousand years. The Black Death – arguably the most catastrophic pandemic in European history – spread along those very same trade routes in the fourteenth century. Globalisation has always had its costs as well as its benefits.

What is genuinely new about contemporary globalisation is its speed, scale and the degree to which it is institutionally governed. The World Trade Organisation, the International Monetary Fund and the World Bank represent a kind of global economic architecture that has no real historical precedent. Financial transactions that once took days now take milliseconds. A political crisis in one country can destabilise financial markets across five continents before the morning news has even aired.

But there is a deeper conceptual issue we must grapple with: whose globalisation is it? Critics from the Global South argue that the current rules-based international order was designed by, and primarily benefits, wealthy industrialised nations. Trade agreements liberalise the movement of capital and goods but frequently restrict the movement of people – meaning that a German car manufacturer can export vehicles freely to developing markets, while a Bangladeshi worker faces significant barriers to moving to Germany.

As you complete this week's readings, I want you to think about this asymmetry – and to consider whether what we call globalisation is better understood as the universalisation of a particular set of economic values, rather than a genuinely shared project.`,
    questions: [
      {
        id: "q1",
        question: "What misconception does the lecturer want to challenge at the start?",
        options: [
          "A) That globalisation is entirely beneficial for all countries",
          "B) That globalisation only began in the late twentieth century",
          "C) That the Silk Road was primarily a route for the spread of disease",
          "D) That free trade agreements are always economically harmful",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The lecturer explicitly states he wants to challenge 'the idea that globalisation is a modern phenomenon that began sometime in the late twentieth century.'",
      },
      {
        id: "q2",
        question: "How does the lecturer use the example of the Black Death?",
        options: [
          "A) To show that disease is the most serious consequence of globalisation",
          "B) To illustrate that even ancient globalisation carried serious risks",
          "C) To argue that trade routes should have been more strictly controlled",
          "D) To demonstrate that fourteenth-century Europe was highly interconnected",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The Black Death spreading along the Silk Road illustrates the lecturer's point that 'Globalisation has always had its costs as well as its benefits.'",
      },
      {
        id: "q3",
        question: "According to the lecture, what is genuinely new about contemporary globalisation compared to earlier periods?",
        options: [
          "A) The movement of goods and people across borders for the first time",
          "B) The involvement of governments in regulating international trade",
          "C) Its speed, scale, and the degree to which it is institutionally governed",
          "D) The dominance of Western countries in global economic systems",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "The lecturer says 'What is genuinely new about contemporary globalisation is its speed, scale and the degree to which it is institutionally governed.'",
      },
      {
        id: "q4",
        question: "What asymmetry in globalisation does the lecturer highlight in paragraph 4?",
        type: "short-answer",
        correctAnswer: "Capital and goods can move freely across borders, but people – especially from the Global South – face significant barriers to moving between countries, meaning the benefits of globalisation are unevenly distributed.",
        explanation: "The lecturer contrasts the free movement of a German car manufacturer's goods to developing markets with the barriers a Bangladeshi worker faces when trying to move to Germany.",
      },
      {
        id: "q5",
        question: "What question does the lecturer leave the students with at the end, and why is it significant?",
        type: "short-answer",
        correctAnswer: "Whether globalisation is better understood as the universalisation of a particular (Western/industrialised) set of economic values rather than a genuinely shared global project. It is significant because it challenges the assumption that globalisation is neutral or beneficial for all.",
        explanation: "The lecturer asks students to consider whether globalisation represents universal values or a specific set of values imposed by wealthy nations.",
      },
    ],
  },
];
