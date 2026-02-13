import { SocietyCard } from '../components/SocietyCard';

const societies = [
  {
    name: 'AI & Machine Learning Society',
    category: 'Technical',
    members: 220,
    rating: 4.8,
    location: 'Innovation Block · Room 302',
  },
  {
    name: 'Performing Arts & Theater',
    category: 'Cultural',
    members: 180,
    rating: 4.7,
    location: 'Auditorium Wing',
  },
  {
    name: 'Robotics & Automation',
    category: 'Technical',
    members: 150,
    rating: 4.9,
    location: 'Lab Complex · R-12',
  },
  {
    name: 'Sports & Fitness Council',
    category: 'Sports',
    members: 260,
    rating: 4.6,
    location: 'Sports Complex',
  },
  {
    name: 'Photography & Media Club',
    category: 'Cultural',
    members: 130,
    rating: 4.5,
    location: 'Media Studio',
  },
  {
    name: 'Entrepreneurship Cell',
    category: 'Social',
    members: 200,
    rating: 4.8,
    location: 'Startup Incubator',
  },
];

const Societies = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Societies directory
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Explore all registered societies with live engagement metrics.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {societies.map((society) => (
          <SocietyCard key={society.name} {...society} />
        ))}
      </div>
    </div>
  );
};

export default Societies;

