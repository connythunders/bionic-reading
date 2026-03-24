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
    title: "The Art of Doing Nothing",
    source: "Adapted from a lifestyle magazine article",
    level: "B1",
    genre: "Magazine article",
    text: `In today's busy world, doing nothing has become almost impossible. We check our phones the moment we wake up, fill every spare minute with podcasts or scrolling through social media, and feel guilty if we sit still for too long. But what if doing nothing is actually good for us?

Researchers at the University of York studied over 2,000 people and found that unstructured free time – time with no specific goal or activity – was linked to greater creativity and problem-solving ability. When our minds wander, they make unexpected connections between ideas, leading to those "eureka moments" we sometimes experience in the shower or on a walk.

"We live in a culture that celebrates productivity," says Dr Sarah Chen, a psychologist at King's College London. "But the brain needs downtime to process information and form memories. Without it, we become less efficient, not more."

The practice of doing nothing intentionally has a long history. The ancient Greeks called it 'skholé' – time for leisure and reflection. The Japanese have 'ma', which describes meaningful pauses. And in recent years, the Danish concept of 'hygge' – comfortable, cosy relaxation – has become popular around the world.

So how can we embrace the art of doing nothing in our modern lives? Experts suggest starting small. Put your phone in another room for 20 minutes. Sit in a café without headphones. Take a walk without listening to anything. It might feel uncomfortable at first – many people report feeling anxious when they have nothing to do – but with practice, the ability to simply be present can transform your relationship with time and your own mind.

The key, perhaps, is to stop seeing free time as wasted time. As the philosopher Bertrand Russell once wrote: "The time you enjoy wasting is not wasted time."`,
    questions: [
      {
        id: "q1",
        question: "According to the article, what did researchers at the University of York discover?",
        options: [
          "A) That checking phones in the morning improves productivity",
          "B) That unstructured free time helps creativity and problem-solving",
          "C) That people who do nothing are generally less happy",
          "D) That social media use increases creativity",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The text states that 'unstructured free time... was linked to greater creativity and problem-solving ability.'",
      },
      {
        id: "q2",
        question: "What does Dr Sarah Chen suggest about productivity culture?",
        options: [
          "A) It is good for our mental health",
          "B) It helps us form better memories",
          "C) It can actually make us less efficient",
          "D) It should be encouraged in schools",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Dr Chen says 'Without [downtime], we become less efficient, not more.'",
      },
      {
        id: "q3",
        question: "What does the Japanese word 'ma' mean according to the article?",
        options: [
          "A) Cosy relaxation",
          "B) Time for leisure and reflection",
          "C) Meaningful pauses",
          "D) Structured free time",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "The article states that 'The Japanese have \"ma\", which describes meaningful pauses.'",
      },
      {
        id: "q4",
        question: "How do many people feel when they first try to do nothing, according to the article?",
        options: [
          "A) Relaxed and happy",
          "B) Bored and tired",
          "C) Anxious and uncomfortable",
          "D) Creative and inspired",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "The text says 'many people report feeling anxious when they have nothing to do.'",
      },
      {
        id: "q5",
        question: "What is the main message of the article?",
        type: "short-answer",
        correctAnswer: "That doing nothing / unstructured free time has genuine benefits for creativity, memory and wellbeing, and we should embrace it.",
        explanation: "The article argues throughout that free time, rest and 'doing nothing' have real psychological and creative benefits.",
      },
      {
        id: "q6",
        question: "Find a word in paragraph 2 that means 'sudden insight or discovery'.",
        type: "short-answer",
        correctAnswer: "eureka",
        explanation: "The text uses 'eureka moments' to describe these sudden insights.",
      },
    ],
  },
  {
    id: "text-2",
    title: "A Year Without a Phone",
    source: "Personal blog post by a 17-year-old student",
    level: "B1",
    genre: "Personal narrative",
    text: `Last January, I made a decision that everyone thought was crazy: I gave up my smartphone for an entire year. No Instagram, no WhatsApp, no TikTok. Just a basic phone that could only make calls and send texts.

My name is Mia, and I'm seventeen. The idea came after a terrible week when I'd spent more time arguing with strangers online than I'd spent talking to my actual friends. I was exhausted, distracted in lessons, and constantly anxious about what was happening on my feed. Something had to change.

The first month was genuinely difficult. I felt left out when friends discussed memes I hadn't seen. I had to ask people for directions instead of using maps. At school, group projects became complicated because everyone else coordinated through apps I didn't have. I remember one afternoon sitting in the library, bored, with absolutely nothing to scroll through. I didn't know what to do with myself.

But gradually, things shifted. I started reading actual books again – five in the first month alone. I noticed small things I'd been missing: the way light looks at sunset, a funny conversation on the bus, my little sister's drawings on the kitchen table. My concentration improved dramatically at school, and my history teacher told me my essays had "a new depth and maturity."

The social side surprised me most. Without the safety net of messaging apps, I had to call people if I wanted to make plans. Awkward at first, but it led to more meaningful connections. My friendships became less about reacting to posts and more about actually spending time together.

Would I go back? Honestly, I'm not sure. Next month, I'll allow myself a smartphone again, but I'll use it very differently. I've learned that I don't need constant stimulation – and that the world is more interesting when you're actually looking at it.`,
    questions: [
      {
        id: "q1",
        question: "Why did Mia decide to give up her smartphone?",
        options: [
          "A) Her parents told her to",
          "B) She wanted to save money",
          "C) She was exhausted and anxious after a terrible week online",
          "D) She lost her phone and decided not to replace it",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Mia explains she'd been arguing with strangers online, felt exhausted and anxious.",
      },
      {
        id: "q2",
        question: "Which of the following was NOT a challenge Mia faced in the first month?",
        options: [
          "A) Feeling left out of conversations about memes",
          "B) Getting lost because she had no maps",
          "C) Failing her school exams",
          "D) Difficulty with group projects at school",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Mia does not mention failing exams – in fact, her schoolwork improved.",
      },
      {
        id: "q3",
        question: "What does 'the safety net of messaging apps' mean in paragraph 5?",
        options: [
          "A) Apps that keep you safe from dangerous people",
          "B) The easy, comfortable way of communicating digitally",
          "C) A type of social media filter",
          "D) Software that catches viruses on your phone",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Here 'safety net' is a metaphor for the easy, comfortable reliance on apps for communication.",
      },
      {
        id: "q4",
        question: "What did Mia's history teacher notice about her work?",
        type: "short-answer",
        correctAnswer: "Her essays had 'a new depth and maturity' / her written work improved",
        explanation: "The teacher told Mia her essays had 'a new depth and maturity.'",
      },
      {
        id: "q5",
        question: "Does Mia plan to use a smartphone again? What does she say she will do differently?",
        type: "short-answer",
        correctAnswer: "Yes, she plans to use one again but differently – she'll use it less and be more intentional about it, knowing she doesn't need constant stimulation.",
        explanation: "She says she'll 'allow myself a smartphone again, but I'll use it very differently.'",
      },
    ],
  },
  {
    id: "text-3",
    title: "Ocean Plastic: A Problem Without Borders",
    source: "Adapted from a science and environment magazine",
    level: "B2",
    genre: "Informational article",
    text: `Every year, approximately 8 million metric tonnes of plastic enter the world's oceans. This is the equivalent of dumping one garbage truck of plastic into the sea every single minute. The consequences are devastating, but perhaps the most troubling aspect of ocean plastic is that it does not stay where it is dumped. Ocean currents carry debris thousands of kilometres, meaning that plastic produced in one country becomes the problem of another.

The Great Pacific Garbage Patch, a mass of floating debris roughly three times the size of France, illustrates this perfectly. It sits between Hawaii and California and contains an estimated 79,000 metric tonnes of plastic. Yet scientists who study it emphasise that the debris originates from dozens of countries across Asia, North America, and even Europe. No single nation can be blamed – and crucially, no single nation has the authority to clean it up, as it exists in international waters.

One of the most significant environmental consequences is the effect on marine wildlife. Sea turtles mistake plastic bags for jellyfish. Seabirds feed plastic fragments to their chicks, mistaking them for fish. Whales wash ashore with stomachs full of plastic bags and fishing nets. But the problem extends beyond individual animals. Microplastics – tiny particles created as larger plastics break down – have now been found in the deepest ocean trenches, in Arctic sea ice, and in the bodies of fish that humans eat.

Several solutions have been proposed. The Ocean Cleanup project, founded by Dutch entrepreneur Boyan Slat when he was just eighteen years old, has developed a system of floating barriers designed to concentrate and collect surface plastic. Since its launch in 2018, it has removed over 10 million kilograms of plastic from the ocean. However, critics argue that such clean-up efforts treat the symptom rather than the cause, and that the real solution lies in reducing plastic production and improving waste management systems globally.

International cooperation is essential. The 2022 UN resolution to end plastic pollution by 2040 marked a significant step forward, but binding legislation – rules that countries are legally obliged to follow – has proved difficult to achieve. As environmental lawyer Dr Ananya Sharma puts it: "We have the technology to solve this problem. What we lack is the political will."`,
    questions: [
      {
        id: "q1",
        question: "How much plastic enters the oceans every year, according to the article?",
        options: [
          "A) 79,000 metric tonnes",
          "B) 8 million metric tonnes",
          "C) 10 million kilograms",
          "D) 3 times the size of France",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "The article states 'approximately 8 million metric tonnes of plastic enter the world's oceans' every year.",
      },
      {
        id: "q2",
        question: "Why is the Great Pacific Garbage Patch particularly difficult to address, according to the article?",
        options: [
          "A) It is too deep underwater to reach",
          "B) It moves too quickly for boats to follow",
          "C) It is in international waters, so no country has authority over it",
          "D) Scientists do not yet know where it comes from",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "The text says 'no single nation has the authority to clean it up, as it exists in international waters.'",
      },
      {
        id: "q3",
        question: "What criticism is made of projects like The Ocean Cleanup?",
        options: [
          "A) They are too expensive to run",
          "B) They only treat the symptom, not the cause",
          "C) They damage marine wildlife",
          "D) They have not removed enough plastic",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Critics argue such efforts 'treat the symptom rather than the cause.'",
      },
      {
        id: "q4",
        question: "What does Dr Ananya Sharma suggest is the main obstacle to solving ocean plastic pollution?",
        options: [
          "A) Lack of scientific knowledge",
          "B) Insufficient technology",
          "C) Lack of political will",
          "D) Poor international communication",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "She says 'What we lack is the political will.'",
      },
      {
        id: "q5",
        question: "Explain in your own words why microplastics are particularly worrying.",
        type: "short-answer",
        correctAnswer: "They are tiny particles that spread everywhere – even the deepest oceans and Arctic ice – and end up in fish that humans eat, meaning they enter the food chain.",
        explanation: "The article mentions microplastics found in deepest trenches, Arctic ice, and in fish humans consume.",
      },
      {
        id: "q6",
        question: "What is 'binding legislation' according to the context of the article?",
        type: "short-answer",
        correctAnswer: "Rules / laws that countries are legally required / obliged to follow",
        explanation: "The article defines it: 'rules that countries are legally obliged to follow.'",
      },
    ],
  },
];
