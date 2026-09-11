const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Read password from secret file
const dbPassword = fs.readFileSync(
  "/run/secrets/db_password",
  "utf8"
).trim();

const db = mysql.createConnection({
  host: "database",
  user: "root",
  password: dbPassword,
  database: "securedb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("Connected to database securely using secret");
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running with secure secret-based configuration");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
