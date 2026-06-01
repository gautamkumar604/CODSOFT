# Quick Quiz Maker

A full-stack quiz platform that enables users to create and take quizzes with immediate feedback on scores.

## Features

- **User Authentication**: Register and login for personalized experiences
- **Quiz Creation**: Create custom quizzes with multiple-choice questions
- **Quiz Taking**: Take quizzes with a clean, intuitive interface
- **Instant Results**: View your score and detailed feedback immediately after completing a quiz
- **Quiz Listing**: Browse all available quizzes created by users
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs for password hashing
- JSON file-based data storage

### Frontend
- React 18
- Vite
- React Router
- TailwindCSS
- Lucide React (icons)
- Axios

## Project Structure

```
quick-quiz-maker/
├── backend/
│   ├── data/
│   │   ├── users.json
│   │   └── quizzes.json
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── CreateQuiz.jsx
    │   │   ├── QuizList.jsx
    │   │   ├── TakeQuiz.jsx
    │   │   └── QuizResults.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register**: Create a new account by clicking "Register" on the home page
2. **Create Quiz**: After logging in, click "Create Quiz" to build your own quiz
3. **Browse Quizzes**: Click "Browse Quizzes" to see all available quizzes
4. **Take Quiz**: Select a quiz and answer questions one at a time
5. **View Results**: See your score and detailed feedback after completing the quiz

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz (requires authentication)
- `DELETE /api/quizzes/:id` - Delete a quiz (requires authentication)

## Data Storage

The application uses JSON files for data storage:
- `backend/data/users.json` - Stores user information
- `backend/data/quizzes.json` - Stores quiz data

Note: In production, consider using a proper database like MongoDB or PostgreSQL.

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory.

## License

This project is open source and available for educational purposes.
