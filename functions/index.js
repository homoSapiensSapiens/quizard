const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

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

const operationLambdas = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}

// TODO: indicative strings as id
const results = [
  {
    id: 0,
    title: 'Apple',
    description: 'You are a tasty piece of fruit, and can be proud of yourself'
  },
  {
    id: 1,
    title: 'Pear',
    description: 'A pear is a nice and beutiful fruit'
  }
];

// This need to be text/numbers, so it can be received from server
const effects = {
  '0': {
    '0': { resultId: 0, operator: '+', operand: 1 },
    '1': { resultId: 1, operator: '+', operand: 1 },
    '2': { resultId: 0, operator: '+', operand: 0.5 }
  },

  '1': {
    '0': { resultId: 0, operator: '+', operand: 2 },
    '1': { resultId: 0, operator: '-', operand: -1 }
  },

  '2': {
    '0': { resultId: 1, operator: '+', operand: 1 },
    '1': { resultId: 1, operator: '-', operand: 0.5 },
    '2': { resultId: 0, operator: '+', operand: 1 }
  }
}

app.get('/api/quiz', (req, res) => {
  res.status(200).send([
    {
      quizID: 0,
      title: 'Fruits Quiz',
      description: 'Take now a quiz and find out what fruit are you'
    }
  ]);
})

app.get('/api/quiz/:quizId', (req, res) => {
  const { quizId } = req.params;
  if (quizId === '0') {
    res.status(200).send(quiz);
  } else {
    res.status(404)
      .send({error: 'Quiz was not found'});
  }
})

app.post('/api/result/:quizId', (req, res) => {
  const { quizId } = req.params;
  if (quizId !== '0') {
    res.status(404);
    res.send({error: 'Quiz was not found'});
    return;
  }
  const answers = req.body.answers;
  const idToResulObject = results.reduce((agg, result) => {
    agg[result.id] = result;
    return agg;
  }, {})
  var idToScore = {};

  // TODO: answers should be an array of question + answer?
  for (var questionID in answers) {
    const answerID = answers[questionID];
    // TODO: enable multiple effects
    const { resultId, operator, operand } = effects[questionID][answerID];
    const oldScore = idToScore[resultId] || 0;
    const operation = operationLambdas[operator];
    idToScore[resultId] = operation(oldScore, operand);
  }

  const bestResultId = Object.keys(idToScore).reduce(
    (resultId, currentMax) => idToScore[resultId] > idToScore[currentMax] ? resultId : currentMax);

  const bestResult = idToResulObject[bestResultId];
  res.send(bestResult);
})

exports.restApi = functions.https.onRequest(app);