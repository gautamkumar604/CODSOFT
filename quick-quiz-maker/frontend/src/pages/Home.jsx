import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, PlusCircle, Users, Trophy } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Quick Quiz Maker</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create engaging quizzes, challenge your friends, and test your knowledge. 
            It's fast, easy, and fun!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quizzes"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Browse Quizzes
            </Link>
            {user ? (
              <Link
                to="/create-quiz"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <PlusCircle className="inline w-5 h-5 mr-2" />
                Create a Quiz
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Quizzes</h3>
            <p className="text-gray-600">
              Build custom quizzes with multiple-choice questions. Set your own questions and correct answers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Take Quizzes</h3>
            <p className="text-gray-600">
              Browse and take quizzes created by others. Challenge yourself and learn something new.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get immediate feedback on your performance. See your score and review correct answers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
