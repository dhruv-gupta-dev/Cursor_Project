import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layout/AppLayout';
import { Analytics } from '@vercel/analytics/react';
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SocietiesPage = lazy(() => import('./pages/Societies'));
const EventsPage = lazy(() => import('./pages/Events'));
const AIPage = lazy(() => import('./pages/AI'));

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm">Loading...</div>}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/ai" element={<AIPage />} />
          </Routes>
        </AppLayout>
      </Suspense>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;

