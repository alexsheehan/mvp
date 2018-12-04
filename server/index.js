require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = process.env.PORT || 3842;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/save', (req, res) => {
  db.create({
    firstRoundScore: req.query.firstRoundScore,
    secondRoundScore: req.query.secondRoundScore,
    date: req.query.date,
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.end('Ok');
    }
  });
});

app.get('/scores', (req, res) => {
  db.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
