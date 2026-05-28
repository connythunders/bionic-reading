import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'teacher' | 'student'

type RoleContextValue = {
  role: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<RoleContextValue>({ role: 'teacher', setRole: () => {} })

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() =>
    (localStorage.getItem('role') as Role) ?? 'teacher'
  )

  function handleSetRole(r: Role) {
    setRole(r)
    localStorage.setItem('role', r)
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
