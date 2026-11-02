import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
import { useNavigate } from 'react-router';
import { PlusCircle, Briefcase, Users, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { jobs, addJob, getApplicationsByEmployer, updateApplicationStatus, applications } = useJobs();
  const navigate = useNavigate();

  const [showJobForm, setShowJobForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time' as const,
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
  });

  if (!user || user.role !== 'employer') {
    navigate('/login');
    return null;
  }

  const employerJobs = jobs.filter(job => job.employerId === user.id);
  const employerApplications = getApplicationsByEmployer(user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addJob({
      title: formData.title,
      company: user.company || user.name,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      employerId: user.id,
      logo: '🏢',
    });

    toast.success('Job posted successfully!');
    setShowJobForm(false);
    setFormData({
      title: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Active Jobs</p>
                <p className="text-3xl">{employerJobs.length}</p>
              </div>
              <Briefcase className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl">{employerApplications.length}</p>
              </div>
              <Users className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Pending Review</p>
                <p className="text-3xl">
                  {employerApplications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {showJobForm && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl mb-6">Post a New Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Job Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Salary Range *</label>
                  <input
                    type="text"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. $100,000 - $150,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Job Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role and what you're looking for..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Requirements (one per line) *</label>
                <textarea
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5+ years of experience&#10;Strong communication skills&#10;Bachelor's degree"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Responsibilities (one per line) *</label>
                <textarea
                  required
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lead development team&#10;Design system architecture&#10;Code reviews"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Benefits (one per line) *</label>
                <textarea
                  required
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Health insurance&#10;401k matching&#10;Remote work"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl mb-6">Your Posted Jobs</h2>
          {employerJobs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You haven't posted any jobs yet.</p>
          ) : (
            <div className="space-y-4">
              {employerJobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.location} • {job.type}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {applications.filter(app => app.jobId === job.id).length} applications
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl mb-6">Recent Applications</h2>
          {employerApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No applications received yet.</p>
          ) : (
            <div className="space-y-4">
              {employerApplications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg">{app.candidateName}</h3>
                        <p className="text-gray-600">{app.candidateEmail}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied for: {job?.title}</p>
                        <p className="text-sm text-gray-500">Resume: {app.resume}</p>
                        <p className="text-sm text-gray-700 mt-2">{app.coverLetter}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                updateApplicationStatus(app.id, 'accepted');
                                toast.success('Application accepted');
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                              title="Accept"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                updateApplicationStatus(app.id, 'rejected');
                                toast.error('Application rejected');
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
