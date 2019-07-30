const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataSource = require('./dataSource');


app.use(bodyParser.json());


const operationLambdas = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}


app.get('/api/quiz', (req, res) => {
  res.status(200).send(dataSource.getQuizList());
})

app.get('/api/quiz/:quizId', (req, res) => {
  const { quizId } = req.params;
  try {
    res.status(200).send(dataSource.getQuiz(quizId).questions);
  } catch {
    // TODO: Analyze error and return 500 in case of internal error
    res.status(404).send({error: 'Quiz was not found'});
  }
})

app.post('/api/result/:quizId', (req, res) => {
  const { quizId } = req.params;
  var quiz;
  try {
    quiz = dataSource.getQuiz(quizId);
  } catch {
    res.status(404).send({error: 'Quiz was not found'});
    return;
  }
  const results = quiz.results;
  const idToResulObject = results.reduce((agg, result) => {
    agg[result.id] = result;
    return agg;
  }, {})
  var idToScore = {};
  
  const effects = quiz.effects;
  const answers = req.body.answers;
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