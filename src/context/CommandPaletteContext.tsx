import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';

interface CommandPaletteContextValue {
  open: boolean;
  query: string;
  setQuery: (q: string) => void;
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext =
  createContext<CommandPaletteContextValue | undefined>(undefined);

export const CommandPaletteProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const openPalette = useCallback(() => {
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <CommandPaletteContext.Provider
      value={{ open, query, setQuery, openPalette, closePalette }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
};

