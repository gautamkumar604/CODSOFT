import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Quick Quiz Maker</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/quizzes" className="text-gray-600 hover:text-blue-600 transition">
              Browse Quizzes
            </Link>
            
            {user ? (
              <>
                <Link to="/create-quiz" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Quiz</span>
                </Link>
                <div className="flex items-center space-x-2 border-l pl-4">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{user.username}</span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
