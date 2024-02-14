const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

// Allow requests from specific origins
// const allowedOrigins = ['https://school-react-frontend.netlify.app'];
app.use(cors({
  origin: `*`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
 / allowedHeaders: ['Content-Type'],
}));






app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./school.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the school database.');
});

// Setting up the table for students
db.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT)');



// Routes

// Get all students
app.get('/students', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get specific student
app.get('/students/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Create a new student
app.post('/students', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO students(name) VALUES(?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a student
app.put('/students/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  db.run('UPDATE students SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedRows: this.changes });
  });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedRows: this.changes });
  });
});

// Setting up the table for teachers
db.run('CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY, name TEXT)');

// Get all teachers
app.get('/teachers', (req, res) => {
  db.all('SELECT * FROM teachers', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new teacher
app.post('/teachers', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO teachers(name) VALUES(?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a teacher
app.put('/teachers/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  db.run('UPDATE teachers SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedRows: this.changes });
  });
});

// Delete a teacher
app.delete('/teachers/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM teachers WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedRows: this.changes });
  });
});

// Setting up the table for subjects
db.run('CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY, name TEXT)');

// Get all subjects
app.get('/subjects', (req, res) => {
  db.all('SELECT * FROM subjects', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new subject
app.post('/subjects', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO subjects(name) VALUES(?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a subject
app.put('/subjects/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  db.run('UPDATE subjects SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedRows: this.changes });
  });
});

// Delete a subject
app.delete('/subjects/:id', (req, res) => {
  
  const id = req.params.id;
  db.run('DELETE FROM subjects WHERE id = ?', [id], function(err) {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ deletedRows: this.changes });
  });
});




// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Welcome message route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the School API!" });
});
