import { EventCard } from '../components/EventCard';

const events = [
  {
    name: 'AI x Robotics Hackathon',
    date: 'Feb 20, 2026 · 9:00 AM',
    capacity: 150,
    registered: 140,
    status: 'Live' as const,
    society: 'AI & Robotics',
  },
  {
    name: 'Cultural Fest Auditions',
    date: 'Feb 25, 2026 · 4:00 PM',
    capacity: 300,
    registered: 210,
    status: 'Upcoming' as const,
    society: 'Performing Arts',
  },
  {
    name: 'Sports League Finals',
    date: 'Feb 16, 2026 · 5:00 PM',
    capacity: 500,
    registered: 500,
    status: 'Completed' as const,
    society: 'Sports Council',
  },
];

const Events = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">Events</h1>
          <p className="mt-1 text-xs text-slate-400">
            Manage event capacity, RSVP health, and status at a glance.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.name} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;

