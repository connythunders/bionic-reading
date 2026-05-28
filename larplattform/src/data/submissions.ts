// TODO: Replace with API calls to /api/assignments/:id/submissions
export type Submission = {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  studentInitials: string
  submittedAt: string | null
  text: string
  grade: string | null
  feedback: string | null
  status: 'not_submitted' | 'submitted' | 'graded'
}

export const submissions: Submission[] = [
  {
    id: 'sub-01',
    assignmentId: 'a-01',
    studentId: 'u-002',
    studentName: 'Alex Bergström',
    studentInitials: 'AB',
    submittedAt: '2026-03-27T14:30:00',
    text: 'Hästar har spelat en central roll i mänsklighetens historia sedan lång tid tillbaka. De användes i jordbruk, krig och som transportmedel. I Sverige har hästhållning en lång tradition, särskilt i landsbygdsmiljöer. Idag används hästar främst för sport och rekreation, men de är fortfarande en viktig del av den svenska kulturen.',
    grade: null,
    feedback: null,
    status: 'submitted',
  },
  {
    id: 'sub-02',
    assignmentId: 'a-02',
    studentId: 'u-002',
    studentName: 'Alex Bergström',
    studentInitials: 'AB',
    submittedAt: null,
    text: '',
    grade: null,
    feedback: null,
    status: 'not_submitted',
  },
  {
    id: 'sub-03',
    assignmentId: 'a-02',
    studentId: 'u-003',
    studentName: 'Maja Lindqvist',
    studentInitials: 'ML',
    submittedAt: '2026-03-25T09:15:00',
    text: 'Första världskrigets orsaker kan delas in i direkta och indirekta orsaker. De direkta orsakerna inkluderar mordet på Franz Ferdinand i Sarajevo 1914. Bland de indirekta orsakerna räknas nationalism, imperialism, militarism och alliansystem (MAIN).',
    grade: 'B',
    feedback: 'Bra analys av de indirekta orsakerna. Kan du utveckla kopplingen till allianserna mer?',
    status: 'graded',
  },
  {
    id: 'sub-04',
    assignmentId: 'a-02',
    studentId: 'u-004',
    studentName: 'Erik Söderström',
    studentInitials: 'ES',
    submittedAt: '2026-03-26T16:45:00',
    text: 'Världskriget bröt ut 1914 efter att Frans Ferdinand sköts. Det fanns många spänningar i Europa dessförinnan, bland annat konkurrens om kolonier och starka nationalister i många länder.',
    grade: null,
    feedback: null,
    status: 'submitted',
  },
]

export function getSubmissionForStudent(assignmentId: string, studentId: string): Submission | undefined {
  return submissions.find(s => s.assignmentId === assignmentId && s.studentId === studentId)
}

export function getSubmissionsForAssignment(assignmentId: string): Submission[] {
  return submissions.filter(s => s.assignmentId === assignmentId)
}
