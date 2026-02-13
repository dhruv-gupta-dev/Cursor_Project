import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { Users2, CalendarDays, Trophy, Bot } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { EventCard } from '../components/EventCard';

const lineData = [
  { name: 'Mon', members: 320 },
  { name: 'Tue', members: 450 },
  { name: 'Wed', members: 380 },
  { name: 'Thu', members: 520 },
  { name: 'Fri', members: 610 },
  { name: 'Sat', members: 700 },
  { name: 'Sun', members: 640 },
];

const pieData = [
  { name: 'Cultural', value: 16 },
  { name: 'Technical', value: 10 },
  { name: 'Sports', value: 8 },
  { name: 'Social', value: 6 },
];

const pieColors = ['#00f5ff', '#a855f7', '#22c55e', '#f97316'];

const activity = [
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

const upcomingEvents = [
  {
    name: 'Winter Cultural Night',
    date: 'Feb 22, 2026 · 6:00 PM',
    capacity: 500,
    registered: 340,
    status: 'Upcoming' as const,
    society: 'Cultural Society',
  },
  {
    name: 'Inter-College Robotics Showdown',
    date: 'Mar 3, 2026 · 10:00 AM',
    capacity: 200,
    registered: 160,
    status: 'Upcoming' as const,
    society: 'Robotics Society',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Overview Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Track society health, events, and engagement in real-time.
          </p>
        </div>
        <button className="btn-primary text-xs">
          <Bot className="mr-1.5 h-3.5 w-3.5" />
          Ask AI for insights
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Members"
          value={2940}
          icon={<Users2 className="h-4 w-4" />}
          trend="up"
          trendValue={12}
        />
        <StatCard
          label="Active Societies"
          value={40}
          icon={<Trophy className="h-4 w-4" />}
          trend="up"
          trendValue={4}
        />
        <StatCard
          label="Events this month"
          value={18}
          icon={<CalendarDays className="h-4 w-4" />}
          trend="up"
          trendValue={9}
        />
        <StatCard
          label="AI Suggestions"
          value={32}
          icon={<Bot className="h-4 w-4" />}
          trend="up"
          trendValue={22}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="col-span-2 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Weekly member engagement
              </h2>
              <p className="text-[11px] text-slate-400">
                Active check-ins and event participation
              </p>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020817',
                    borderRadius: 16,
                    border: '1px solid rgba(148, 163, 184, 0.35)',
                    fontSize: 11,
                  }}
                  cursor={{ stroke: '#0f172a', strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="members"
                  stroke="#00f5ff"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-50">
            Society distribution
          </h2>
          <p className="text-[11px] text-slate-400">
            By category across the campus
          </p>
          <div className="mt-4 grid grid-cols-2 items-center gap-3">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={32}
                    outerRadius={54}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-xs">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: pieColors[index] }}
                    />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-slate-400">{item.value} societies</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-50">
              Recent activity
            </h2>
          </div>
          <div className="space-y-3 text-xs">
            {activity.map((item) => (
              <div
                key={item.title}
                className="flex items-start justify-between gap-3 rounded-2xl bg-slate-900/60 p-2.5"
              >
                <div className="flex-1">
                  <p className="text-slate-200">{item.title}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-50">
              Upcoming events
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.name} {...event} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;

