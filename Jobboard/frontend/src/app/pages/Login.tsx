import { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { Briefcase, LogIn } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('candidate');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast.success('Login successful!');
      navigate(role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Try employer@demo.com or candidate@demo.com');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`p-4 border-2 rounded-lg transition ${
                    role === 'candidate'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <p className="font-semibold">Job Seeker</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-4 border-2 rounded-lg transition ${
                    role === 'employer'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <p className="font-semibold">Employer</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Demo Accounts:</p>
            <p className="text-sm text-gray-600">
              <strong>Employer:</strong> employer@demo.com
            </p>
            <p className="text-sm text-gray-600">
              <strong>Candidate:</strong> candidate@demo.com
            </p>
            <p className="text-sm text-gray-500 mt-2">Password: any</p>
          </div>
        </div>
      </div>
    </div>
  );
}
