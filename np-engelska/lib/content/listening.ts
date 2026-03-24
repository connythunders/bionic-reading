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
    title: "A Conversation About Gap Years",
    description: "Two friends, Emma and Jake, discuss whether to take a gap year after school",
    level: "B1",
    genre: "Informal conversation",
    voice: "female",
    script: `Emma: So Jake, have you made a decision yet? About whether you're taking a gap year?

Jake: I think so, yes. I've decided I'm going to do it. Go travelling, maybe volunteer somewhere.

Emma: Really? I'm still on the fence, to be honest. My parents think it's a brilliant idea, but I'm worried I'll fall behind. You know, all my friends will be at university and I'll just be... floating around somewhere.

Jake: I completely understand that feeling. But I've been reading about it, and actually, loads of studies show that students who take a gap year perform better at university. They're more motivated, apparently.

Emma: I've heard that too. But doesn't it depend what you do? I mean, if you spend twelve months watching Netflix on your mum's sofa, that's not exactly going to make you a better student.

Jake: Ha! Fair point. No, I mean properly structured gap year experiences. I'm thinking about teaching English in Vietnam for six months, then maybe doing a conservation project in Costa Rica.

Emma: That sounds incredible. How did you find those programmes?

Jake: There are loads of organisations that set them up. Some are free if you volunteer your time, others cost a bit. I've been saving up for a while.

Emma: What about language barriers? Like, do you speak Vietnamese?

Jake: Not a word! But apparently you don't need to for the teaching programmes – they want native speakers. And in Costa Rica most of the other volunteers speak English.

Emma: Maybe I'm overthinking this. What made you decide in the end?

Jake: Honestly? I just asked myself: in twenty years, am I going to regret not going? And the answer was obviously yes.`,
    questions: [
      {
        id: "q1",
        question: "What has Jake decided to do after school?",
        options: [
          "A) Go straight to university",
          "B) Take a gap year travelling and volunteering",
          "C) Get a job and save money",
          "D) Stay at home and study",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Jake says he has decided to 'Go travelling, maybe volunteer somewhere.'",
      },
      {
        id: "q2",
        question: "What is Emma's main worry about taking a gap year?",
        options: [
          "A) She doesn't have enough money",
          "B) Her parents don't support the idea",
          "C) She might fall behind her friends who go to university",
          "D) She is afraid of travelling alone",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Emma says 'I'm worried I'll fall behind. All my friends will be at university.'",
      },
      {
        id: "q3",
        question: "According to Jake, what do studies show about gap year students?",
        options: [
          "A) They earn more money after graduating",
          "B) They perform better and are more motivated at university",
          "C) They have more friends at university",
          "D) They find better jobs after studying",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Jake says 'students who take a gap year perform better at university. They're more motivated.'",
      },
      {
        id: "q4",
        question: "What are Jake's two planned gap year activities?",
        type: "short-answer",
        correctAnswer: "Teaching English in Vietnam (for 6 months) and a conservation project in Costa Rica",
        explanation: "Jake specifically mentions 'teaching English in Vietnam for six months, then maybe doing a conservation project in Costa Rica.'",
      },
      {
        id: "q5",
        question: "Why doesn't Jake need to speak Vietnamese for the teaching programme?",
        type: "short-answer",
        correctAnswer: "Because the programme wants native English speakers / they don't need other languages to teach English",
        explanation: "Jake says 'they want native speakers' – so speaking Vietnamese is not required.",
      },
    ],
  },
  {
    id: "track-2",
    title: "Radio Report: Young Inventor Changes Lives",
    description: "A BBC Radio 4 style report about a teenage inventor from Ghana",
    level: "B1-B2",
    genre: "Radio news report",
    voice: "female",
    script: `Good morning and welcome to Today in Science. Our reporter Helen Walsh has been speaking with Kofi Asante, an eighteen-year-old inventor from Accra, Ghana, who has developed a low-cost water purification device that is already being used in rural villages across West Africa.

Helen: Kofi, your invention has been described as 'potentially life-changing' by the United Nations. Can you tell us how it works?

Kofi: Of course. The device uses sunlight and a special kind of clay to filter and purify water. The clay contains natural minerals that remove bacteria and parasites. It takes about four hours to produce twenty litres of clean drinking water, and the whole device costs less than five British pounds to make.

Helen: That's remarkable. Where did the idea come from?

Kofi: My grandmother lives in a village with no access to clean water. She had to walk three kilometres every day to collect water from a river, and that water wasn't even safe to drink. I wanted to solve that specific problem.

Helen: You started working on this when you were just fourteen years old. How did you develop it without professional equipment?

Kofi: I used a school science lab after hours, and later a community centre that had some basic equipment. Most importantly, I failed hundreds of times before it worked. Each failure taught me something.

Helen: You've recently been accepted to study engineering at MIT in the United States. How do you feel about that?

Kofi: Incredibly excited, but also committed. I won't forget where I come from. The goal is to come back with more knowledge and make the device even more efficient and more widely available.

Helen: And finally – what advice would you give to other young people who have an idea but don't know where to start?

Kofi: Don't wait for perfect conditions. Start with what you have. The problems in your own community are valid and important. You don't need to solve problems that are already being solved by others.`,
    questions: [
      {
        id: "q1",
        question: "What does Kofi's invention do?",
        options: [
          "A) It generates electricity using sunlight",
          "B) It purifies water using sunlight and clay",
          "C) It creates clean water from salt water",
          "D) It filters air pollution in cities",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "Kofi explains it 'uses sunlight and a special kind of clay to filter and purify water.'",
      },
      {
        id: "q2",
        question: "How much does the device cost to make?",
        options: [
          "A) £5",
          "B) £20",
          "C) £50",
          "D) £4",
        ],
        type: "multiple-choice",
        correctAnswer: 0,
        explanation: "Kofi says 'the whole device costs less than five British pounds to make.'",
      },
      {
        id: "q3",
        question: "What was the original inspiration for Kofi's invention?",
        options: [
          "A) A science project at school",
          "B) A challenge set by a UN organisation",
          "C) His grandmother's problem accessing clean water",
          "D) A competition he wanted to win",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "Kofi says his grandmother had to walk far for water that wasn't even safe – 'I wanted to solve that specific problem.'",
      },
      {
        id: "q4",
        question: "Where did Kofi develop his invention?",
        type: "short-answer",
        correctAnswer: "In his school science lab (after hours) and later at a community centre",
        explanation: "He mentions 'a school science lab after hours, and later a community centre.'",
      },
      {
        id: "q5",
        question: "What advice does Kofi give to young people with an idea?",
        type: "short-answer",
        correctAnswer: "Don't wait for perfect conditions; start with what you have; focus on problems in your own community",
        explanation: "Kofi says 'Don't wait for perfect conditions. Start with what you have.'",
      },
    ],
  },
  {
    id: "track-3",
    title: "Interview: The Future of Artificial Intelligence",
    description: "A university professor is interviewed about AI and its impact on young people's futures",
    level: "B2",
    genre: "Formal interview",
    voice: "male",
    script: `Presenter: Professor Williams, thank you for joining us today. AI seems to be everywhere right now. What do you think is the most important thing young people should understand about artificial intelligence?

Professor Williams: Thank you for having me. I think the most important thing is to understand that AI is a tool – a very powerful one – but still a tool made by humans, reflecting human choices. It amplifies what we put into it. If we feed it biased data, it will produce biased results. If we use it thoughtfully, it can be extraordinary.

Presenter: There's a lot of concern that AI will take jobs. Should school students worry about their future employment?

Professor Williams: I understand why people are concerned, but I think the framing is slightly wrong. Yes, certain repetitive tasks will become automated. We've seen this throughout history – the printing press changed the work of scribes, the car changed the work of horse-grooms. New technologies eliminate some jobs but create others. The key question is: are our education systems preparing students for the jobs that will exist, rather than the ones that are disappearing?

Presenter: And are they?

Professor Williams: Partially. We're seeing more emphasis on computational thinking, critical analysis, and creativity – which is positive. But I'd argue we also need to teach students to question the outputs of AI systems, not just use them. Digital literacy is no longer just about operating a computer. It's about understanding how algorithmic systems shape the information you see and the decisions that affect your life.

Presenter: Is there a risk that students become over-reliant on AI for things like writing or problem-solving?

Professor Williams: Absolutely, and this is my biggest concern. If students use AI to write their essays without engaging with the thinking process, they don't develop the analytical muscles they need. It's like using a calculator before understanding maths – you can get the answer, but you lose the ability to reason about whether the answer makes sense. AI should be a thinking partner, not a replacement for thinking.

Presenter: Final question – what gives you hope about the next generation's relationship with technology?

Professor Williams: Honestly? Young people. The students I work with are not passive consumers of technology. They're the most critical, creative, and ethically aware generation I've encountered. They're asking the right questions. I think they'll shape AI more than AI will shape them.`,
    questions: [
      {
        id: "q1",
        question: "How does Professor Williams describe artificial intelligence?",
        options: [
          "A) A dangerous and uncontrollable force",
          "B) A powerful tool made by humans that reflects human choices",
          "C) A system that thinks independently of humans",
          "D) The most important invention in human history",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "He says 'AI is a tool – a very powerful one – but still a tool made by humans, reflecting human choices.'",
      },
      {
        id: "q2",
        question: "What historical comparison does Professor Williams make about job automation?",
        options: [
          "A) He compares AI to the invention of electricity",
          "B) He mentions the printing press and the car as examples of technology changing jobs",
          "C) He refers to the Industrial Revolution in factories",
          "D) He compares AI to the invention of the telephone",
        ],
        type: "multiple-choice",
        correctAnswer: 1,
        explanation: "He mentions 'the printing press changed the work of scribes, the car changed the work of horse-grooms.'",
      },
      {
        id: "q3",
        question: "What is Professor Williams' biggest concern about students using AI?",
        options: [
          "A) That they will share personal information online",
          "B) That AI will give them wrong answers",
          "C) That they will become over-reliant and not develop their own thinking skills",
          "D) That they will use AI to cheat in exams",
        ],
        type: "multiple-choice",
        correctAnswer: 2,
        explanation: "He says 'my biggest concern' is that students use AI to write essays 'without engaging with the thinking process.'",
      },
      {
        id: "q4",
        question: "What does Professor Williams mean by 'digital literacy' today?",
        type: "short-answer",
        correctAnswer: "Understanding how algorithmic systems shape the information you see and the decisions that affect your life – not just being able to use a computer",
        explanation: "He redefines digital literacy as understanding algorithmic systems, not just operating technology.",
      },
      {
        id: "q5",
        question: "What gives Professor Williams hope about young people and technology?",
        type: "short-answer",
        correctAnswer: "Young people are critical, creative and ethically aware – they ask the right questions and will shape AI rather than being shaped by it",
        explanation: "He says young people are 'the most critical, creative, and ethically aware generation' and will 'shape AI more than AI will shape them.'",
      },
    ],
  },
];
