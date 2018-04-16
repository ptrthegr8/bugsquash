const path = require("path");
const express = require('express');
const app = express();
const publicDirectoryPath = path.join(__dirname, "public");

let scores = [];

app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.get("/scores", (req, res) => {
  // res.status(200);
  // res.setHeader('Content-Type', 'application/javascript');
  // scores.sort((a, b) => (b.score - a.score));
  // threeTopScores = scores.slice(0, 3);
  // scores = threeTopScores;
  res.send(scores);
});

app.post("/scores", (req, res) => {
  scores.push(req.body);
  scores.sort((a, b) => (b.score - a.score));
  scores = scores.slice(0, 3);
  res.status(201);
  res.end();
});

app.listen(3000, () => console.log(`Server started at Port 3000`));