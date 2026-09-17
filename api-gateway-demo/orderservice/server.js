const express = require("express");

const app = express();
const PORT = 3002;

app.get("/", (req, res) => {
  res.send("Response from Order Service");
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
