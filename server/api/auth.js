const express = require('express');
const { User } = require('../db');

const app = express.Router();

app.get('/', async (req, res) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (err) {
    res.status(500).json({
      message: 'Could not find user',
      error: err.message,
    });
  }
});

app.post('/', async (req, res) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (err) {
    res.status(500).json({
      message: 'Could not log in user',
      error: err.message,
    });
  }
});

app.post('/register', async (req, res) => {
  try {
    const token = await User.encryptUser(req.body);
    res.json(token);
  } catch (err) {
    res.status(500).json({
      message: 'Could not register user',
      error: err.message,
    });
  }
});

module.exports = app;
