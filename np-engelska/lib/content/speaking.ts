export interface SpeakingTask {
  id: string;
  title: string;
  type: "roleplay" | "discussion" | "presentation" | "picture-description";
  level: string;
  timeLimit: number; // in seconds
  situation: string;
  taskCard: string;
  usefulPhrases: string[];
  assessmentFocus: string[];
}

export const speakingTasks: SpeakingTask[] = [
  {
    id: "speaking-1",
    title: "Role Play: At the Airport",
    type: "roleplay",
    level: "B1",
    timeLimit: 120,
    situation:
      "You are at an international airport. Your flight has been delayed by five hours. You need to speak with the airport information desk to find out what is happening and what options you have.",
    taskCard: `Your flight to London (LN247) was supposed to depart at 14:30 but has been delayed until 19:30.

During the conversation, you should:
• Ask why the flight has been delayed
• Find out if the airline will provide food vouchers or accommodation
• Ask whether you can be transferred to an earlier flight with another airline
• Express your frustration politely – you have an important appointment in London

The airport staff member will start the conversation.`,
    usefulPhrases: [
      "Excuse me, I was wondering if you could help me...",
      "I'm concerned about my flight to London...",
      "Could you tell me the reason for the delay?",
      "I'd like to know whether it's possible to...",
      "I understand these things happen, but...",
      "Would it be possible for you to...?",
      "I'm afraid I have a very important appointment and...",
    ],
    assessmentFocus: [
      "Communicating a purpose clearly",
      "Polite but assertive language",
      "Asking for information and clarification",
      "Expressing feelings appropriately",
      "Natural conversational interaction",
    ],
  },
  {
    id: "speaking-2",
    title: "Discussion: Social Media and Young People",
    type: "discussion",
    level: "B1-B2",
    timeLimit: 180,
    situation:
      "You will discuss the topic of social media and its effects on young people. Be prepared to share your opinion, agree or disagree with different views, and support your ideas with reasons and examples.",
    taskCard: `Discuss the following questions about social media and young people:

1. What do you think are the biggest benefits of social media for teenagers?
2. Are there any negative effects you have noticed – either on yourself or people you know?
3. Some people say social media should be restricted for under-16s. What do you think?
4. How do you think social media will change in the next ten years?

Try to give detailed answers and ask follow-up questions if your partner says something interesting.`,
    usefulPhrases: [
      "In my opinion, / I think that...",
      "On the one hand... on the other hand...",
      "I agree with that to some extent, but...",
      "That's an interesting point. Have you considered...?",
      "From my own experience...",
      "Research suggests that...",
      "I'd argue that the main issue is...",
      "What do you think about...?",
    ],
    assessmentFocus: [
      "Expressing and justifying opinions",
      "Using discourse markers (however, therefore, on the other hand)",
      "Engaging with different perspectives",
      "Vocabulary range on a relevant topic",
      "Pronunciation and fluency",
    ],
  },
  {
    id: "speaking-3",
    title: "Presentation: Something I Am Passionate About",
    type: "presentation",
    level: "B1-B2",
    timeLimit: 180,
    situation:
      "You will give a short presentation about something you feel strongly about. It could be a hobby, a cause, a sport, a subject at school, music, art, technology – anything that matters to you.",
    taskCard: `Prepare a 2-3 minute presentation on a topic you are passionate about.

Your presentation should include:
• An introduction: what is the topic and why did you choose it?
• Background: tell us something interesting about this topic that the audience might not know
• Why it matters: explain why this topic is important – to you personally, and to the world
• A conclusion: end with something memorable – a question, a call to action, or a striking fact

You can bring notes but try not to read from them.`,
    usefulPhrases: [
      "Today I'd like to talk to you about...",
      "You might be surprised to learn that...",
      "This matters because...",
      "From a personal perspective...",
      "Let me give you an example...",
      "I find this fascinating because...",
      "To conclude, I'd like to say that...",
      "What I'd like you to take away from this is...",
    ],
    assessmentFocus: [
      "Organisation and structure of speech",
      "Engagement and enthusiasm",
      "Vocabulary range and accuracy",
      "Pronunciation, stress and intonation",
      "Ability to elaborate and develop ideas",
    ],
  },
  {
    id: "speaking-4",
    title: "Picture Description: Changes in a Town",
    type: "picture-description",
    level: "B1",
    timeLimit: 120,
    situation:
      "You will be given a set of images showing how a town has changed over 50 years. Describe what you see and discuss what you think about these changes.",
    taskCard: `Look at these images of 'Millfield Town' – one from 1975 and one from 2025.

In 1975: Small shops, a market square, a cinema, trees lining the street, few cars.
In 2025: Large shopping centre, car park, fewer trees, busy traffic, chain restaurants.

Describe what has changed and:
• Say whether you think these changes are positive or negative (and why)
• Talk about what towns might look like in another 50 years
• Discuss what we might lose if all towns look the same`,
    usefulPhrases: [
      "In this image, I can see...",
      "Comparing the two pictures, it's clear that...",
      "One significant change is...",
      "What strikes me most is...",
      "I think this change is both positive and negative because...",
      "On the one hand, it seems that...",
      "Looking towards the future, I imagine...",
    ],
    assessmentFocus: [
      "Descriptive language and vocabulary",
      "Comparing and contrasting",
      "Speculating about the future",
      "Expressing opinions with justification",
      "Fluency and coherence",
    ],
  },
];
