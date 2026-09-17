const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Response from User Service");
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
