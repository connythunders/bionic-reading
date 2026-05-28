// TODO: Replace with API call to /api/assignments
export type Assignment = {
  id: string
  title: string
  groupId: string
  groupName: string
  dueDate: string
  submissions: number
  graded: number
  total: number
  status: 'open' | 'closed' | 'draft'
}

export const assignments: Assignment[] = [
  {
    id: 'a-01',
    title: 'Häst',
    groupId: 'g-08',
    groupName: 'Religionskunskap-IMA-CLN',
    dueDate: '2026-03-28',
    submissions: 1,
    graded: 0,
    total: 1,
    status: 'open',
  },
  {
    id: 'a-02',
    title: 'Första världskriget – orsaker',
    groupId: 'g-03',
    groupName: 'HISHIS01a1-BA24-CLN',
    dueDate: '2026-04-04',
    submissions: 8,
    graded: 3,
    total: 21,
    status: 'open',
  },
  {
    id: 'a-03',
    title: 'Geografins grunder',
    groupId: 'g-02',
    groupName: 'Geografi-IMA-CLN',
    dueDate: '2026-04-10',
    submissions: 0,
    graded: 0,
    total: 18,
    status: 'open',
  },
  {
    id: 'a-04',
    title: 'Demokrati och mänskliga rättigheter',
    groupId: 'g-09',
    groupName: 'Samhällskunskap-IMA-CLN',
    dueDate: '2026-03-15',
    submissions: 23,
    graded: 23,
    total: 23,
    status: 'closed',
  },
]
