import { Outlet, Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Root() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Briefcase className="w-8 h-8" />
              <span className="font-bold text-xl">JobBoard</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">
                Browse Jobs
              </Link>
              {isAuthenticated ? (
                <>
                  {user?.role === 'employer' ? (
                    <Link to="/employer/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                      Employer Dashboard
                    </Link>
                  ) : (
                    <Link to="/candidate/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                      My Applications
                    </Link>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span>{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link
                  to="/jobs"
                  className="text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
                {isAuthenticated ? (
                  <>
                    {user?.role === 'employer' ? (
                      <Link
                        to="/employer/dashboard"
                        className="text-gray-700 hover:text-blue-600 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Employer Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/candidate/dashboard"
                        className="text-gray-700 hover:text-blue-600 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Applications
                      </Link>
                    )}
                    <div className="flex items-center gap-2 text-gray-700 py-2">
                      <User className="w-5 h-5" />
                      <span>{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">JobBoard</h3>
              <p className="text-gray-400">Find your dream job or hire top talent.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
                <li><Link to="/signup" className="hover:text-white transition">Post a Job</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-400">support@jobboard.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2026 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
