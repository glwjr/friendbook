const express = require('express');
const { Post } = require('../db');

const app = express.Router();

app.get('/', async (req, res) => {
  try {
    const posts = Post.getUserPosts(parseInt(req.user.id, 10));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: 'Could not retrieve posts for that user',
      error: err.message,
    });
  }
});

module.exports = app;
