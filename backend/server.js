// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'linux',
  database: 'recommend_db'
});

app.post('/api/recommend', (req, res) => {
  const { storeName, reason, nickname } = req.body;
  db.query(
    'INSERT INTO recommendations (storeName, reason, nickname) VALUES (?, ?, ?)',
    [storeName, reason, nickname],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ success: true });
    }
  );
});

app.get('/api/recommend', (req, res) => {
  db.query('SELECT * FROM recommendations', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
