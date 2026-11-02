import { useParams, useNavigate, Link } from 'react-router';
import { useJobs } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Briefcase, DollarSign, Clock, Building2, CheckCircle2, Upload, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, applyForJob } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const job = getJobById(id || '');

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Job not found</h1>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
            Browse all jobs →
          </Link>
        </div>
      </div>
    );
  }

  const daysAgo = Math.floor((new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24));

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'candidate') {
      toast.error('Only candidates can apply for jobs');
      return;
    }

    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    applyForJob({
      jobId: job.id,
      candidateId: user.id,
      candidateName: user.name,
      candidateEmail: user.email,
      resume: resumeFile.name,
      coverLetter,
    });

    toast.success('Application submitted successfully!');
    setShowApplicationForm(false);
    setCoverLetter('');
    setResumeFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-3xl">
                {job.logo || '💼'}
              </div>
              <div>
                <h1 className="text-3xl text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span className="text-lg">{job.company}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Posted {daysAgo === 0 ? 'today' : `${daysAgo} days ago`}</span>
            </div>
          </div>

          {!showApplicationForm ? (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                } else if (user?.role === 'employer') {
                  toast.error('Employers cannot apply for jobs');
                } else {
                  setShowApplicationForm(true);
                }
              }}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          ) : null}
        </div>

        {showApplicationForm && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-2xl mb-6">Submit Your Application</h2>
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                  rows={6}
                  placeholder="Tell us why you're a great fit for this position..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    required
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    Click to upload resume
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX (Max 5MB)</p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-4 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {resumeFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-2xl mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
