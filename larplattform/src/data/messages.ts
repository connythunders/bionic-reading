// TODO: Replace with API call to /api/messages
export type Message = {
  id: string
  title: string
  date: string
  author: string
  groupId: string | null
  body: string
  isRead: boolean
}

export const messages: Message[] = [
  {
    id: 'm-01',
    title: '31 mars serveras skollunchen vid Rättvik Arena (Påsksmällen)',
    date: '2026-03-24',
    author: 'Cecilia Högvall',
    groupId: null,
    body: 'På grund av Påsksmällen serveras skollunchen den 31 mars vid Rättvik Arena istället för i skolmatsalen. Ta med er matbricka.',
    isRead: true,
  },
  {
    id: 'm-02',
    title: 'Till elever som har skåp på Tunet',
    date: '2026-02-25',
    author: 'Cecilia Högvall',
    groupId: null,
    body: 'Påminnelse till er som har skåp på Tunet: se till att era skåp är tömda och låsta.',
    isRead: false,
  },
  {
    id: 'm-03',
    title: 'Boendeansökan åk 2 o 3 inför hösten 2026',
    date: '2026-02-17',
    author: 'Maria Magnusson',
    groupId: null,
    body: 'Nu är det dags att söka boende för läsåret 2026/2027. Ansökan ska lämnas in senast 15 mars.',
    isRead: true,
  },
  {
    id: 'm-04',
    title: 'Information om studieresan',
    date: '2026-01-20',
    author: 'Conny Lindgren',
    groupId: 'g-08',
    body: 'Studieresa till Stockholm planeras i april. Mer information kommer.',
    isRead: true,
  },
]
