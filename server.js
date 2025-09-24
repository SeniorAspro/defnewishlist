import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyByjevB1PNY7on6prEBmgJCSY0AqG7IAEU"
  authDomain: "fir-b9220.firebaseapp.com",
  databaseURL: "https://fir-b9220.firebaseio.com",
  projectId: "fir-b9220",
  storageBucket: "fir-b9220.appspot.com",
  messagingSenderId: "997689523725",
  appId: "1:997689523725: web: 6707d209c97cfe70a39f44",
  measurementId:

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: firebase } = require('firebase/compat/app');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new firebase('wishlist.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT NOT NULL,
      done INTEGER DEFAULT 0
    )
  `);
});

app.get('/wishlist', (req, res) => {
  db.all('SELECT * FROM wishlist', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/wishlist', (req, res) => {
  const { item } = req.body;
  db.run('INSERT INTO wishlist(item) VALUES(?)', [item], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, item, done: 0 });
  });
});

app.delete('/wishlist/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM wishlist WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: id });
  });
});

// 🚨 IMPORTANT: use Railway’s dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
