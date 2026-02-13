import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

export type EventStatus = 'Upcoming' | 'Live' | 'Completed';

export interface Society {
  id: string;
  name: string;
  category: string;
  members: number;
  rating: number;
  location: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  society: string;
}

interface ActivityItem {
  title: string;
  time: string;
  type: 'member' | 'event' | 'funding';
}

interface StatsSnapshot {
  totalMembers: number;
  activeSocieties: number;
  eventsThisMonth: number;
  aiSuggestions: number;
}

interface DataContextValue {
  societies: Society[];
  events: Event[];
  activity: ActivityItem[];
  stats: StatsSnapshot;
  joinSociety: (id: string) => Promise<void>;
  registerForEvent: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const initialSocieties: Society[] = [
  {
    id: 'soc-ai-ml',
    name: 'AI & Machine Learning Society',
    category: 'Technical',
    members: 220,
    rating: 4.8,
    location: 'Innovation Block · Room 302',
  },
  {
    id: 'soc-theater',
    name: 'Performing Arts & Theater',
    category: 'Cultural',
    members: 180,
    rating: 4.7,
    location: 'Auditorium Wing',
  },
  {
    id: 'soc-robotics',
    name: 'Robotics & Automation',
    category: 'Technical',
    members: 150,
    rating: 4.9,
    location: 'Lab Complex · R-12',
  },
  {
    id: 'soc-sports',
    name: 'Sports & Fitness Council',
    category: 'Sports',
    members: 260,
    rating: 4.6,
    location: 'Sports Complex',
  },
  {
    id: 'soc-photo',
    name: 'Photography & Media Club',
    category: 'Cultural',
    members: 130,
    rating: 4.5,
    location: 'Media Studio',
  },
  {
    id: 'soc-ecell',
    name: 'Entrepreneurship Cell',
    category: 'Social',
    members: 200,
    rating: 4.8,
    location: 'Startup Incubator',
  },
];

const initialEvents: Event[] = [
  {
    id: 'evt-ai-robotics-hack',
    name: 'AI x Robotics Hackathon',
    date: 'Feb 20, 2026 · 9:00 AM',
    capacity: 150,
    registered: 140,
    status: 'Live',
    society: 'AI & Machine Learning Society',
  },
  {
    id: 'evt-cultural-auditions',
    name: 'Cultural Fest Auditions',
    date: 'Feb 25, 2026 · 4:00 PM',
    capacity: 300,
    registered: 210,
    status: 'Upcoming',
    society: 'Performing Arts & Theater',
  },
  {
    id: 'evt-sports-finals',
    name: 'Sports League Finals',
    date: 'Feb 16, 2026 · 5:00 PM',
    capacity: 500,
    registered: 500,
    status: 'Completed',
    society: 'Sports & Fitness Council',
  },
  {
    id: 'evt-winter-cultural',
    name: 'Winter Cultural Night',
    date: 'Feb 22, 2026 · 6:00 PM',
    capacity: 500,
    registered: 340,
    status: 'Upcoming',
    society: 'Cultural Society',
  },
  {
    id: 'evt-robotics-showdown',
    name: 'Inter-College Robotics Showdown',
    date: 'Mar 3, 2026 · 10:00 AM',
    capacity: 200,
    registered: 160,
    status: 'Upcoming',
    society: 'Robotics Society',
  },
];

const initialActivity: ActivityItem[] = [
  {
    title: 'Robotics Society onboarded 12 new members',
    time: '5 min ago',
    type: 'member',
  },
  {
    title: 'Cultural Fest 2026 approved by council',
    time: '1 hr ago',
    type: 'event',
  },
  {
    title: 'AI Society requested funding for hackathon',
    time: '3 hrs ago',
    type: 'funding',
  },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [societies, setSocieties] = useState<Society[]>(initialSocieties);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [activity] = useState<ActivityItem[]>(initialActivity);

  const stats = useMemo<StatsSnapshot>(() => {
    const totalMembers = societies.reduce((sum, s) => sum + s.members, 0);
    const activeSocieties = societies.length;
    const eventsThisMonth = events.length;
    const aiSuggestions = 32; // mock value for now
    return { totalMembers, activeSocieties, eventsThisMonth, aiSuggestions };
  }, [societies, events]);

  const joinSociety = (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSocieties((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, members: s.members + 1 } : s,
          ),
        );
        resolve();
      }, 800);
    });
  };

  const registerForEvent = (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === id && e.registered < e.capacity
              ? { ...e, registered: e.registered + 1 }
              : e,
          ),
        );
        resolve();
      }, 800);
    });
  };

  return (
    <DataContext.Provider
      value={{
        societies,
        events,
        activity,
        stats,
        joinSociety,
        registerForEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

