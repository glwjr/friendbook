const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/conversations', require('./api/conversations'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

module.exports = app;
