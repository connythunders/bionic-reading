export interface Question {
  id: string;
  question: string;
  options?: string[];
  type: "multiple-choice" | "short-answer" | "true-false";
  correctAnswer: string | number;
  explanation: string;
}

export interface ReadingText {
  id: string;
  title: string;
  source: string;
  level: string;
  genre: string;
  text: string;
  questions: Question[];
}

export const readingTexts: ReadingText[] = [
  {
    id: "text-1",
    title: "The Ethics of Artificial Intelligence",
    source: "Adapted from an opinion article in a technology journal",
    level: "C1",
    genre: "Opinion/argumentative article",
    text: `Artificial intelligence is no longer the preserve of science fiction. It now powers the algorithms that determine which news stories we see, which job applications are shortlisted, and even which individuals are flagged as potential criminals by predictive policing systems. Yet as AI becomes embedded in the fabric of our institutions, the ethical questions it raises remain dangerously underexamined.

The central problem is not that AI is inherently malicious – it is that it reflects, and frequently amplifies, the biases of its creators and the data it is trained on. In 2018, researchers at MIT demonstrated that several widely-used facial recognition systems were significantly less accurate at identifying darker-skinned women than lighter-skinned men. This was not a deliberate act of discrimination; it was the consequence of training datasets that disproportionately featured white male faces. The system learned from skewed data and reproduced the skew at scale.

What makes this particularly troubling is the veneer of objectivity that AI carries. When a human decision-maker discriminates, there is at least the possibility of accountability. When an algorithm does so, it is often perceived as neutral and scientific – beyond reproach. This illusion of impartiality may, paradoxically, make AI-driven discrimination harder to challenge than its human equivalent.

The question of autonomous decision-making raises further dilemmas. Should an AI system be permitted to make life-altering decisions – such as denying bail, approving a mortgage, or recommending a medical diagnosis – without meaningful human oversight? Proponents argue that AI is faster, more consistent and less susceptible to cognitive biases than human judges. Critics counter that consistency without justice is merely efficient injustice.

There are no easy answers here, but the direction of travel seems clear. We need regulatory frameworks that demand transparency from AI systems, that require developers to audit their tools for discriminatory outcomes, and that preserve meaningful human agency in high-stakes decisions. Technology, ultimately, should serve human values – not replace them.`,
    questions: [
      {
        id: "q1",
        question: "According to the article, what is the main ethical problem with AI systems?",
        options: [
          "A) AI is deliberately programmed to be biased by its creators",
          "B) AI reflects and amplifies biases present in its training data",
          "C) AI systems are too slow to be used in decision-making",
          "D) AI lacks the capability to process complex social information",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The article states that AI 'reflects, and frequently amplifies, the biases of its creators and the data it is trained on.'",
      },
      {
        id: "q2",
        question: "What does the author mean by 'the veneer of objectivity that AI carries' (paragraph 3)?",
        options: [
          "A) AI systems are genuinely more objective than human decision-makers",
          "B) AI gives a false impression of being neutral and unbiased",
          "C) AI decisions are always transparent and open to scrutiny",
          "D) Scientists agree that AI is free from all forms of discrimination",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The author argues that AI's apparent objectivity is an 'illusion of impartiality' – it appears neutral but is not necessarily so.",
      },
      {
        id: "q3",
        question: "What is the author's tone in this article?",
        options: [
          "A) Enthusiastically supportive of AI development",
          "B) Critically concerned but calling for regulation rather than prohibition",
          "C) Entirely dismissive of any benefits that AI might offer",
          "D) Neutral and purely informational with no clear position",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The author raises serious concerns but concludes with specific regulatory recommendations rather than calling for AI to be banned.",
      },
      {
        id: "q4",
        question: "How does the author characterise the argument made by critics of autonomous AI decision-making?",
        options: [
          "A) That AI decisions are always wrong and must be rejected",
          "B) That human cognitive biases are preferable to AI consistency",
          "C) That consistent decisions are not just if justice itself is absent",
          "D) That AI systems cannot be audited for discriminatory outcomes",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Critics are quoted as saying 'consistency without justice is merely efficient injustice.'",
      },
      {
        id: "q5",
        question: "Explain in your own words why the author finds AI-driven discrimination potentially more dangerous than human discrimination.",
        type: "short-answer",
        correctAnswer: "Because AI appears objective and scientific, making it harder to question or challenge, whereas human discrimination is at least recognisable as human and therefore more open to accountability.",
        explanation: "The article argues the 'illusion of impartiality' means AI-driven discrimination may be harder to challenge than discrimination by a human decision-maker.",
      },
      {
        id: "q6",
        question: "Find a word or phrase in paragraph 4 that means 'the right or freedom to make one's own choices'.",
        type: "short-answer",
        correctAnswer: "human agency",
        explanation: "The article uses 'meaningful human agency' to describe the right of humans to make their own decisions.",
      },
    ],
  },
  {
    id: "text-2",
    title: "The Psychology of Conformity",
    source: "Adapted from an academic article on social psychology",
    level: "B2-C1",
    genre: "Academic article",
    text: `In 1951, the psychologist Solomon Asch conducted a series of experiments that would become landmarks in our understanding of human behaviour. His method was deceptively simple. A participant was placed in a room with several other people and asked to compare the length of lines on a card. The task itself was trivial – the correct answer was obvious. But there was a catch: the other people in the room were confederates, actors who had been instructed to give the same clearly wrong answer.

The results were striking. Roughly 75% of participants conformed to the incorrect majority on at least one trial. Many reported feeling confused, doubting their own perception, or simply not wanting to stand out. Asch concluded that the pressure to conform to a group's judgement could override an individual's own accurate perception of reality – even when the stakes were low and the correct answer was plainly visible.

What makes these findings so enduring is their broader implication: if people conform when the answer is obvious and the consequences trivial, how much more readily might they conform in situations of genuine uncertainty, where the social or professional costs of dissent are real and significant?

Subsequent research has refined our understanding. Conformity is not uniform: it is strongest when the group is unanimous, when the individual lacks confidence in their own judgement, or when the social status of the majority is high. It diminishes when even a single person voices a dissenting opinion, suggesting that social courage is contagious.

Critics of Asch's methodology point out that his experiments were conducted in a specific cultural context and that later cross-cultural studies have found significant variation in conformity rates between more individualist and more collectivist societies. Nevertheless, the fundamental insight remains robust: social pressure is a powerful force, and independent thinking requires not only intelligence but a conscious act of will.`,
    questions: [
      {
        id: "q1",
        question: "What was the purpose of the confederates in Asch's experiment?",
        options: [
          "A) To provide correct answers and help participants",
          "B) To deliberately give wrong answers and create social pressure",
          "C) To measure the participants' eyesight and perception",
          "D) To record the reactions of the real participants",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The confederates were 'actors who had been instructed to give the same clearly wrong answer', creating pressure to conform.",
      },
      {
        id: "q2",
        question: "What does the phrase 'social courage is contagious' (paragraph 4) most likely mean?",
        options: [
          "A) People are easily frightened when alone in social situations",
          "B) When one person disagrees, it becomes easier for others to do so too",
          "C) Conformity spreads rapidly through a group",
          "D) Brave individuals are admired and respected in all societies",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The text says conformity diminishes when a single person dissents, implying that one person's courage makes it easier for others to follow.",
      },
      {
        id: "q3",
        question: "What criticism is made of Asch's research?",
        options: [
          "A) His experiments were unethical and harmed participants",
          "B) The line-comparison task was too complex for participants",
          "C) His findings may not apply equally across all cultures",
          "D) He drew incorrect conclusions from the data he collected",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Critics point out that later cross-cultural studies found variation between individualist and collectivist societies, questioning the universality of his findings.",
      },
      {
        id: "q4",
        question: "According to the article, under what conditions is conformity strongest?",
        options: [
          "A) When participants are very intelligent and self-confident",
          "B) When the group is unanimous, the individual lacks confidence, or the majority has high status",
          "C) When the task involves genuinely difficult or complex problems",
          "D) When participants know that their responses will be made public",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The article lists three conditions: unanimity of the group, lack of individual confidence, and high social status of the majority.",
      },
      {
        id: "q5",
        question: "What broader implication does the author draw from Asch's findings?",
        type: "short-answer",
        correctAnswer: "If people conform even when the answer is obvious and the stakes are low, they are likely to conform even more readily when there is genuine uncertainty and real social or professional consequences for disagreeing.",
        explanation: "The author extends Asch's findings to real-world scenarios where uncertainty is genuine and the costs of dissent are significant.",
      },
      {
        id: "q6",
        question: "What does the word 'dissent' mean as used in this article?",
        type: "short-answer",
        correctAnswer: "To disagree with or oppose the majority / a differing opinion from the majority view",
        explanation: "The article contrasts conformity with 'dissent' – voicing a different opinion from the group.",
      },
    ],
  },
  {
    id: "text-3",
    title: "Rewilding Britain",
    source: "Adapted from an environmental magazine",
    level: "B2",
    genre: "Informational/environmental article",
    text: `Britain is one of the most nature-depleted countries in the world. Centuries of intensive farming, urban expansion and hunting have stripped the landscape of much of its ecological complexity. Today, conservationists are proposing a radical solution: rewilding – the large-scale restoration of wild ecosystems, sometimes including the reintroduction of species that once roamed the land.

The most ambitious rewilding projects seek not merely to protect existing wildlife but to restore the ecological processes that sustain it. This means reintroducing keystone species – animals whose presence has a disproportionate effect on the environment. In Scotland, for example, the reintroduction of beavers to rivers has transformed local ecosystems. Beavers build dams that create wetlands, which in turn support a wider variety of plants, insects and birds. Natural flood management – reducing the risk of flooding downstream by slowing the flow of water upstream – has been an unexpected benefit.

Perhaps the most contentious proposal is the reintroduction of apex predators. Wolves were hunted to extinction in Britain in the eighteenth century, and some ecologists argue that their return would restore a natural balance, reducing deer populations and allowing forests to regenerate. This process – known as a trophic cascade – has been documented in Yellowstone National Park in the United States, where the reintroduction of wolves in 1995 led to a remarkable recovery of vegetation along riverbanks.

Not everyone is convinced. Farmers worry about livestock losses, and some rural communities are concerned about safety. Proponents respond that these risks can be managed through compensation schemes and careful monitoring. They also argue that the economic benefits of rewilding – through ecotourism and carbon sequestration – may ultimately outweigh the costs.

The debate reflects a deeper question about Britain's relationship with its landscape. Should the countryside be managed primarily for agricultural productivity, or should space be made for nature to reclaim its own? Increasingly, these are not seen as mutually exclusive choices.`,
    questions: [
      {
        id: "q1",
        question: "What does the article say about Britain's current state of nature?",
        options: [
          "A) Britain has more wildlife diversity than most other European countries",
          "B) Britain has lost much of its ecological complexity over centuries",
          "C) Britain's farming industry has successfully protected natural habitats",
          "D) Urban expansion has actually created new habitats for wildlife",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The article states Britain is 'one of the most nature-depleted countries in the world' due to farming, urban expansion and hunting.",
      },
      {
        id: "q2",
        question: "What is a 'keystone species' according to the article?",
        options: [
          "A) A species that is nearly extinct and needs immediate protection",
          "B) A species whose presence has a disproportionately large impact on its ecosystem",
          "C) A species that builds physical structures like dams or nests",
          "D) A species that can only survive in a very specific habitat",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The article defines keystone species as 'animals whose presence has a disproportionate effect on the environment.'",
      },
      {
        id: "q3",
        question: "What is the 'trophic cascade' described in paragraph 3?",
        options: [
          "A) The process by which farmers manage deer populations in forests",
          "B) A chain reaction in an ecosystem caused by the presence or absence of a predator",
          "C) The method by which wolves were reintroduced to Yellowstone National Park",
          "D) A system of compensation payments made to affected farmers",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The trophic cascade refers to the chain of effects documented in Yellowstone: wolves reduced deer, which allowed vegetation to regenerate.",
      },
      {
        id: "q4",
        question: "How do supporters of rewilding respond to concerns about wolf reintroduction?",
        options: [
          "A) They argue that wolves pose no real danger to livestock or people",
          "B) They suggest relocating farmers away from rewilding zones",
          "C) They propose compensation schemes and monitoring to manage risks",
          "D) They argue that wolves should only be introduced in remote unpopulated areas",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Proponents say risks 'can be managed through compensation schemes and careful monitoring.'",
      },
      {
        id: "q5",
        question: "Explain in your own words what 'natural flood management' means, based on the article.",
        type: "short-answer",
        correctAnswer: "Slowing the flow of water upstream (for example through beaver dams creating wetlands) so that less water flows downstream all at once, reducing the risk of flooding.",
        explanation: "The article describes beavers creating wetlands that slow water flow upstream, reducing downstream flood risk.",
      },
      {
        id: "q6",
        question: "What does the final paragraph suggest about the future relationship between farming and rewilding?",
        type: "short-answer",
        correctAnswer: "That farming and rewilding are increasingly being seen as compatible rather than opposing choices – they do not have to be mutually exclusive.",
        explanation: "The article ends by noting that agricultural productivity and space for nature are 'not seen as mutually exclusive choices.'",
      },
    ],
  },
];
