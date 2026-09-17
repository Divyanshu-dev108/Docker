const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Response from backend container: ${os.hostname()}`);
});

app.listen(PORT, () => {
  console.log(`Backend service running on port ${PORT}`);
});
