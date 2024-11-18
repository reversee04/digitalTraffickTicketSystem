
const express = require('express');
const connection = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// Create a new user
app.post('/users', (req, res) => {
  const { BadgeID, Username, Email, Role } = req.body;
  const query = 'INSERT INTO users (BadgeID, Username, Email, Role) VALUES (?, ?, ?, ?)';
  connection.query(query, [BadgeID, Username, Email, Role], (err, results) => {
    if (err) throw err;
    res.status(201).send('User created successfully');
  });
});

// Read all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { Username, Email, Role } = req.body;
  const query = 'UPDATE users SET Username = ?, Email = ?, Role = ? WHERE BadgeID = ?';
  connection.query(query, [Username, Email, Role, id], (err, results) => {
    if (err) throw err;
    res.status(200).send('User updated successfully');
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE BadgeID = ?';
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.status(200).send('User deleted successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
