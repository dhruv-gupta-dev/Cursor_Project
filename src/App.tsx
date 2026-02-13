import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layout/AppLayout';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { DataProvider } from './context/DataContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SocietiesPage = lazy(() => import('./pages/Societies'));
const EventsPage = lazy(() => import('./pages/Events'));
const AIPage = lazy(() => import('./pages/AI'));

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <CommandPaletteProvider>
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
        </CommandPaletteProvider>
      </DataProvider>
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          className:
            'rounded-3xl border border-white/10 bg-slate-900/80 text-slate-50 shadow-soft backdrop-blur-xl',
        }}
      />
      <Analytics />
    </ThemeProvider>
  );
}

export default App;

