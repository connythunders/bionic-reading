import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardView } from '@/views/DashboardView'
import { MessagesView } from '@/views/MessagesView'
import { CalendarView } from '@/views/CalendarView'
import { AssignmentsView } from '@/views/AssignmentsView'
import { GroupView } from '@/views/GroupView'
import { useAccessibility } from '@/hooks/useAccessibility'

function App() {
  const accessibility = useAccessibility()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppShell
              theme={accessibility.theme}
              setTheme={accessibility.setTheme}
              fontSize={accessibility.fontSize}
              setFontSize={accessibility.setFontSize}
              dyslexiaFont={accessibility.dyslexiaFont}
              setDyslexiaFont={accessibility.setDyslexiaFont}
              focusMode={accessibility.focusMode}
              setFocusMode={accessibility.setFocusMode}
            />
          }
        >
          <Route index element={<DashboardView />} />
          <Route path="meddelanden" element={<MessagesView />} />
          <Route path="kalender" element={<CalendarView />} />
          <Route path="uppgifter" element={<AssignmentsView />} />
          <Route path="uppgifter/:id" element={<AssignmentsView />} />
          <Route path="grupp/:id" element={<GroupView />} />
          <Route path="notiser" element={<PlaceholderView title="Notiser" text="Inga nya notiser." />} />
          <Route path="hitta" element={<PlaceholderView title="Hitta" text="Sökfunktion kommer snart." />} />
          <Route path="skolbanken" element={<PlaceholderView title="Skolbanken" text="Integreras med Skolbanken API." />} />
        </Route>
      </Routes>
    </BrowserRouter>
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
