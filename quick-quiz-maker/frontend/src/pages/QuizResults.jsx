import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, XCircle, CheckCircle, RotateCcw, Home } from 'lucide-react';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const quizData = sessionStorage.getItem('quizData');
    const quizAnswers = sessionStorage.getItem('quizAnswers');

    if (quizData && quizAnswers) {
      const parsedQuiz = JSON.parse(quizData);
      const parsedAnswers = JSON.parse(quizAnswers);
      
      setQuiz(parsedQuiz);
      setAnswers(parsedAnswers);

      // Calculate score
      let correctCount = 0;
      parsedQuiz.questions.forEach((question, index) => {
        if (parsedAnswers[index] === question.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
    } else {
      navigate('/quizzes');
    }
  }, [id, navigate]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= 60;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Trophy className={`w-12 h-12 ${passed ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-gray-600 mb-6">You completed the quiz</p>
            
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{score}</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-4xl text-gray-300">/</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-700">{quiz.questions.length}</div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="text-4xl text-gray-300">=</div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {percentage}%
                </div>
                <div className="text-gray-600">Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detailed Results</h2>
          
          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-gray-700">{question.question}</p>
                    </div>
                  </div>

                  <div className="ml-9 space-y-2">
                    <div className="text-sm text-gray-600 mb-2">
                      Your answer:{' '}
                      <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="text-sm text-gray-600">
                        Correct answer:{' '}
                        <span className="text-green-600 font-medium">
                          {question.options[question.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => {
              sessionStorage.removeItem('quizAnswers');
              sessionStorage.removeItem('quizData');
              navigate(`/quiz/${id}`);
            }}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quiz</span>
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('quizAnswers');
              sessionStorage.removeItem('quizData');
              navigate('/quizzes');
            }}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Home className="w-5 h-5" />
            <span>Browse More Quizzes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
