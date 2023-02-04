const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api/auth', require('./api/auth'));

module.exports = app;
