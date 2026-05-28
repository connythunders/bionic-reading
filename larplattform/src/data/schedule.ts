// TODO: Replace with API call to /api/schedule
export type Lesson = {
  id: string
  subject: string
  groupCode: string
  groupId: string
  start: string  // HH:MM
  end: string    // HH:MM
  room: string | null
  dayOffset: number  // 0 = today, 1 = tomorrow, etc.
}

export const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre']

export const lessons: Lesson[] = [
  // Thursday (today, offset 0)
  { id: 'l-01', subject: 'REL',          groupCode: 'gr~90',  groupId: 'g-08', start: '10:50', end: '11:35', room: null,    dayOffset: 0 },
  { id: 'l-02', subject: 'REL',          groupCode: 'gr~91',  groupId: 'g-08', start: '12:15', end: '13:00', room: null,    dayOffset: 0 },
  { id: 'l-03', subject: 'Provtillfällen', groupCode: 'gr~128', groupId: 'g-04', start: '13:00', end: '14:00', room: 'TU104', dayOffset: 0 },
  // Monday
  { id: 'l-04', subject: 'HIS',          groupCode: 'gr~90',  groupId: 'g-03', start: '08:15', end: '09:30', room: null,    dayOffset: -3 },
  { id: 'l-05', subject: 'SAM',          groupCode: 'gr~85',  groupId: 'g-09', start: '10:00', end: '11:15', room: null,    dayOffset: -3 },
  // Friday
  { id: 'l-06', subject: 'GEO',          groupCode: 'gr~72',  groupId: 'g-02', start: '09:00', end: '10:15', room: null,    dayOffset: 1 },
  { id: 'l-07', subject: 'HIS',          groupCode: 'gr~91',  groupId: 'g-04', start: '13:00', end: '14:15', room: null,    dayOffset: 1 },
]
