const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const getUser = require('./utils/getUser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve the index.html

app.post("/leetcode", async (req, res) => {
  const { userInput } = req.body;
  try {
      const data = await getUser(userInput);
      res.json(data);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});