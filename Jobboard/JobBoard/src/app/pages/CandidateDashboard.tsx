import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
import { useNavigate, Link } from 'react-router';
import { FileText, CheckCircle2, Clock, XCircle, Eye } from 'lucide-react';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const { getApplicationsByCandidate, getJobById } = useJobs();
  const navigate = useNavigate();

  if (!user || user.role !== 'candidate') {
    navigate('/login');
    return null;
  }

  const applications = getApplicationsByCandidate(user.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'reviewed':
        return <Eye className="w-5 h-5 text-blue-600" />;
      case 'accepted':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Candidate Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl">{applications.length}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Pending</p>
                <p className="text-3xl">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Accepted</p>
                <p className="text-3xl">
                  {applications.filter(app => app.status === 'accepted').length}
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Account Type</label>
              <p className="text-lg capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl mb-6">My Applications</h2>
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet.</p>
              <Link
                to="/jobs"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map(app => {
                const job = getJobById(app.jobId);
                if (!job) return null;

                return (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
                            {job.logo || '💼'}
                          </div>
                          <div>
                            <h3 className="text-lg">
                              <Link to={`/jobs/${job.id}`} className="hover:text-blue-600">
                                {job.title}
                              </Link>
                            </h3>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {job.location} • {job.type}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Cover Letter:</span> {app.coverLetter.substring(0, 150)}
                            {app.coverLetter.length > 150 && '...'}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Resume:</span> {app.resume}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Applied on {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                        {app.status === 'accepted' && (
                          <p className="text-sm text-green-600">🎉 Congratulations!</p>
                        )}
                        {app.status === 'rejected' && (
                          <p className="text-sm text-gray-500">Keep trying!</p>
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
