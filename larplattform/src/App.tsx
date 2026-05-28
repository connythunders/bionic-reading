import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardView } from '@/views/DashboardView'
import { MessagesView } from '@/views/MessagesView'
import { CalendarView } from '@/views/CalendarView'
import { AssignmentsView } from '@/views/AssignmentsView'
import { GroupView } from '@/views/GroupView'
import { StudentDashboardView } from '@/views/student/StudentDashboardView'
import { StudentAssignmentsView } from '@/views/student/StudentAssignmentsView'
import { SubmitAssignmentView } from '@/views/student/SubmitAssignmentView'
import { CreateAssignmentView } from '@/views/teacher/CreateAssignmentView'
import { AssignmentDetailView } from '@/views/teacher/AssignmentDetailView'
import { useAccessibility } from '@/hooks/useAccessibility'
import { RoleProvider, useRole } from '@/context/RoleContext'

function AppRoutes() {
  const accessibility = useAccessibility()
  const { role } = useRole()

  const shellProps = {
    theme: accessibility.theme,
    setTheme: accessibility.setTheme,
    fontSize: accessibility.fontSize,
    setFontSize: accessibility.setFontSize,
    dyslexiaFont: accessibility.dyslexiaFont,
    setDyslexiaFont: accessibility.setDyslexiaFont,
    focusMode: accessibility.focusMode,
    setFocusMode: accessibility.setFocusMode,
  }

  return (
    <Routes>
      <Route element={<AppShell {...shellProps} />}>
        {/* Home — role-dependent */}
        <Route
          index
          element={role === 'teacher' ? <DashboardView /> : <StudentDashboardView />}
        />

        {/* Shared views */}
        <Route path="meddelanden" element={<MessagesView />} />
        <Route path="kalender"    element={<CalendarView />} />
        <Route path="grupp/:id"   element={<GroupView />} />
        <Route path="notiser"     element={<PlaceholderView title="Notiser" text="Inga nya notiser." />} />
        <Route path="hitta"       element={<PlaceholderView title="Hitta" text="Sökfunktion kommer snart." />} />
        <Route path="skolbanken"  element={<PlaceholderView title="Skolbanken" text="Integreras med Skolbanken API." />} />

        {/* Teacher-only routes */}
        {role === 'teacher' && (
          <>
            <Route path="uppgifter"       element={<AssignmentsView />} />
            <Route path="uppgifter/skapa" element={<CreateAssignmentView />} />
            <Route path="uppgifter/:id"   element={<AssignmentDetailView />} />
          </>
        )}

        {/* Student-only routes */}
        {role === 'student' && (
          <>
            <Route path="uppgifter"     element={<StudentAssignmentsView />} />
            <Route path="uppgifter/:id" element={<SubmitAssignmentView />} />
          </>
        )}
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <RoleProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </RoleProvider>
  )
}

function PlaceholderView({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">{text}</p>
    </div>
  )
}

export default App
