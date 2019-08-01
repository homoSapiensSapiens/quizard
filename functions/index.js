const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataSource = require('./dataSource');
const lodash = require('lodash');

app.use(bodyParser.json());


app.get('/api/quiz', async (req, res) => {
  try {
    res.status(200).send(await dataSource.getQuizList());
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

app.get('/api/quiz/:quizId', async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await dataSource.getQuiz(quizId);
    res.status(200).send(quiz.questions);
  } catch (error) {
    // TODO: Analyze error and return 500 in case of internal error
    console.log(error);
    res.status(404).send({error: 'Quiz was not found'});
  }
})

app.post('/api/result/:quizId', async (req, res) => {
  const { quizId } = req.params;
  var quiz;
  try {
    quiz = await dataSource.getQuiz(quizId);
  } catch (error) {
    console.log(error);
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
    const { resultId, factor } = effects[questionID][answerID];
    const oldScore = idToScore[resultId] || 0;
    idToScore[resultId] = oldScore + factor;
  }

  const bestResultId = Object.keys(idToScore).reduce(
    (resultId, currentMax) => idToScore[resultId] > idToScore[currentMax] ? resultId : currentMax);

  const bestResult = idToResulObject[bestResultId];
  res.send(bestResult);
})

exports.restApi = functions.https.onRequest(app);