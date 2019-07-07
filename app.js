const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'quiz-app', 'build', 'static')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'quiz-app', 'build', 'index.html'));
});

app.listen(9000);
