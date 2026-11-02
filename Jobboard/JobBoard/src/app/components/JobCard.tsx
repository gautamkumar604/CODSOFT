import { Link } from 'react-router';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Job } from '../contexts/JobContext';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const daysAgo = Math.floor((new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
            {job.logo || '💼'}
          </div>
          <div>
            <h3 className="text-lg text-gray-900 hover:text-blue-600 transition">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Briefcase className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>{daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}</span>
        </div>
        {job.featured && (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            Featured
          </span>
        )}
      </div>
    </Link>
  );
}
