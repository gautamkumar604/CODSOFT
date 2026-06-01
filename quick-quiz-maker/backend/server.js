const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data storage paths
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const quizzesFile = path.join(dataDir, 'quizzes.json');

// Initialize data directory and files
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

if (!fs.existsSync(quizzesFile)) {
  fs.writeFileSync(quizzesFile, JSON.stringify([]));
}

// Helper functions to read/write data
const readUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
const readQuizzes = () => JSON.parse(fs.readFileSync(quizzesFile, 'utf8'));
const writeQuizzes = (quizzes) => fs.writeFileSync(quizzesFile, JSON.stringify(quizzes, null, 2));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readUsers();
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Quiz routes
app.get('/api/quizzes', (req, res) => {
  try {
    const quizzes = readQuizzes();
    res.json(quizzes.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      createdBy: q.createdBy,
      createdAt: q.createdAt,
      questionCount: q.questions.length
    })));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/quizzes/:id', (req, res) => {
  try {
    const quizzes = readQuizzes();
    const quiz = quizzes.find(q => q.id === req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/quizzes', authenticateToken, (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Title and questions are required' });
    }

    const quizzes = readQuizzes();
    const newQuiz = {
      id: Date.now().toString(),
      title,
      description: description || '',
      questions,
      createdBy: req.user.id,
      createdByUsername: req.user.username,
      createdAt: new Date().toISOString()
    };

    quizzes.push(newQuiz);
    writeQuizzes(quizzes);

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/quizzes/:id', authenticateToken, (req, res) => {
  try {
    const quizzes = readQuizzes();
    const quizIndex = quizzes.findIndex(q => q.id === req.params.id);

    if (quizIndex === -1) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quizzes[quizIndex].createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this quiz' });
    }

    quizzes.splice(quizIndex, 1);
    writeQuizzes(quizzes);

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
