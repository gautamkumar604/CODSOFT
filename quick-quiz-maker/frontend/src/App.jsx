import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import QuizResults from './pages/QuizResults';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quiz/:id" element={<TakeQuiz />} />
            <Route path="/quiz/:id/results" element={<QuizResults />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
