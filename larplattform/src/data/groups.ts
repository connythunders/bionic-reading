// TODO: Replace with API call to /api/groups
export type Group = {
  id: string
  code: string
  name: string
  color: string
  subject: string
  memberCount: number
}

export const groups: Group[] = [
  { id: 'g-01', code: 'CHT', name: 'Connys Hi test',           color: '#166534', subject: 'Historia',        memberCount: 24 },
  { id: 'g-02', code: 'G',   name: 'Geografi-IMA-CLN',         color: '#166534', subject: 'Geografi',        memberCount: 18 },
  { id: 'g-03', code: 'H',   name: 'HISHIS01a1-BA24-CLN',      color: '#166534', subject: 'Historia',        memberCount: 21 },
  { id: 'g-04', code: 'H',   name: 'HISHIS01a1-EE24-CLN',      color: '#166534', subject: 'Historia',        memberCount: 19 },
  { id: 'g-05', code: 'H',   name: 'HIST1A10X-BA25-CLN',       color: '#166534', subject: 'Historia',        memberCount: 22 },
  { id: 'g-06', code: 'H',   name: 'Historia-IMA-CLN',         color: '#166534', subject: 'Historia',        memberCount: 20 },
  { id: 'g-07', code: 'I',   name: 'IMA',                      color: '#166534', subject: 'IMA',             memberCount: 30 },
  { id: 'g-08', code: 'R',   name: 'Religionskunskap-IMA-CLN', color: '#166534', subject: 'Religionskunskap', memberCount: 25 },
  { id: 'g-09', code: 'S',   name: 'Samhällskunskap-IMA-CLN',  color: '#166534', subject: 'Samhällskunskap', memberCount: 23 },
]
