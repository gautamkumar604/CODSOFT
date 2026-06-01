import { useState, useMemo } from 'react';
import { useJobs } from '../contexts/JobContext';
import { JobCard } from '../components/JobCard';
import { Search, Filter } from 'lucide-react';

export default function JobListings() {
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = locationFilter === '' ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesType = typeFilter === '' || job.type === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-600">Browse through {jobs.length} available positions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm mb-2 text-gray-700">Search Jobs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Location</label>
              <input
                type="text"
                placeholder="City or state..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Job Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setTypeFilter('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setTypeFilter('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
