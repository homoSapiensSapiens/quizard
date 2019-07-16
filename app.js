const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'quiz-app', 'build', 'static')));

const quiz = [
  {
    id: 0,
    text: 'What is your favorite color?',
    answers: [
      { id: 0, text: 'Red' },
      { id: 1, text: 'Green' },
      { id: 2, text: 'Also green but circle' }
    ]
  },
  {
    id: 1,
    text: 'Do you like tea?',
    answers: [
      { id: 0, text: 'Yes, sure!' },
      { id: 1, text: 'Nah, not for me' }
    ]
  },
  {
    id: 2,
    text: 'How strong are you?',
    answers: [
      { id: 0, text: 'Very strong' },
      { id: 1, text: 'Normal' },
      { id: 2, text: 'Pretty weak actually' }
    ]
  }
];


app.get('/api/quiz/:quizId', (req, res) => {
  const { quizId } = req.params;
  if (quizId === '0') {
    res.send(quiz);
  } else {
    res.status(404);
    res.send({error: 'Quiz was not found'});
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'quiz-app', 'build', 'index.html'));
});

app.listen(9000);
