import { Link } from 'react-router';
import { useJobs } from '../contexts/JobContext';
import { Search, TrendingUp, Users, Building2 } from 'lucide-react';
import { JobCard } from '../components/JobCard';

export default function Home() {
  const { jobs } = useJobs();
  const featuredJobs = jobs.filter(job => job.featured).slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your <span className="text-blue-200">Dream Job</span> Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Connect with top employers and discover opportunities that match your skills
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-2xl">
                <Link
                  to="/jobs"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
                >
                  <Search className="w-5 h-5" />
                  Browse All Jobs
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition flex items-center justify-center font-semibold shadow-lg animate-bounce-subtle"
                >
                  Post a Job
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] lg:max-w-none animate-float">
                {/* Background glow effects */}
                <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-3xl opacity-20 transform scale-90 animate-pulse"></div>
                <img
                  src="/img2.png"
                  alt="Job Board Platform"
                  className="relative z-10 w-full h-auto object-contain rounded-2xl transform hover:scale-[1.02] transition duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-2">Top Companies</h3>
              <p className="text-gray-600">Work with leading companies across industries</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-2">Career Growth</h3>
              <p className="text-gray-600">Find opportunities that accelerate your career</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-2">Trusted Platform</h3>
              <p className="text-gray-600">Join thousands of successful job seekers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Featured Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
              View all jobs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our platform today and discover opportunities that match your ambitions
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
