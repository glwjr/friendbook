const express = require('express');
const { User } = require('../db');

const app = express.Router();

app.get('/', async (req, res) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.status(200).json(await user.getPosts());
  } catch (err) {
    res.status(500).json({
      message: 'Could not retrieve posts for that user',
      error: err.message,
    });
  }
});

module.exports = app;
