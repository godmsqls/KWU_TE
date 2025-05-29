// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'webuser',
  password: '1234',
  database: 'recommend_db'
});

app.post('/api/recommend', (req, res) => {
  const { storeName, reason, nickname } = req.body;
  console.log("받은데이터:",req.body);
  db.query(
    'INSERT INTO recommendations (storeName, reason, nickname) VALUES (?, ?, ?)',
    [storeName, reason, nickname],
    (err, result) => {
      if (err) {
        console.error("데이터베이스 에러",err);
        return res.status(500).send(err);
      }
      console.log("데이터베이스 저장 성공");
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
