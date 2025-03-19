const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("./leaderboard.db");

// Middleware
app.use(bodyParser.json());

app.use(express.static("public"));

// Create leaderboard table if not exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS leaderboard (id INTEGER PRIMARY KEY, username TEXT, score INTEGER)");
});

// Endpoint to submit score
app.post("/submit-score", (req, res) => {
  const { username, score } = req.body;
  const stmt = db.prepare("INSERT INTO leaderboard (username, score) VALUES (?, ?)");
  stmt.run(username, score, function (err) {
    if (err) {
      return res.status(500).json({ message: "Error saving score" });
    }
    res.status(200).json({ message: "Score saved successfully" });
  });
  stmt.finalize();
});

// Endpoint to get leaderboard
app.get("/leaderboard", (req, res) => {
  db.all("SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving leaderboard" });
    }
    res.json(rows);
  });
});

// Serve the static files
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
