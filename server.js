// server.js
const express = require("express");
const path = require("path");
const chatHandler = require("./api/chat"); // Make sure chat.js is correctly imported

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this to parse JSON bodies
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", chatHandler);  // Make sure this matches your fetch URL

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
