const express = require('express');
const { User } = require('../db');

const app = express.Router();

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getConversations());
  } catch (err) {
    next(err);
  }
});

module.exports = app;
