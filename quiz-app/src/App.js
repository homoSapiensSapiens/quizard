import React from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';

import './App.css';

const AnswerButton = withStyles({
  root: {
    textTransform: 'none',
    margin: '2px',
  },
})(Button);


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: -1
    }
  }

  onAnswerClick = (event, answerId) => {
    this.setState({
      selectedAnswer: answerId
    })
    if (this.props.onAnswerCallback) {
      this.props.onAnswerCallback(this.props.id, answerId);
    }
  }

  render() {
    // TODO: Allow images
    const {selectedAnswer} = this.state;
    const {answers} = this.props;
    return <Container maxWidth='sm' justify='center'>
      {this.props.text}
      <br />
      {answers.map(({id, text}) =>
        <AnswerButton 
          variant= {selectedAnswer === id ? 'contained' : 'outlined'} 
          key={id} 
          color={selectedAnswer === id ? 'primary' : 'default'} 
          onClick={event => this.onAnswerClick(event, id)}
        >{text}</AnswerButton>
      )}
    </Container>
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    const questionsIDs = props.questions.map(q => q.id);
    this.state = {
      'answers': questionsIDs.reduce((o, k) => {o[k] = -1; return o}, {})
    }
  }

  handleAnswer = (questionID, answerID) => {
    const { onQuizCompletion } = this.props;
    var {answers} = this.state;
    answers[questionID] = answerID;
    this.setState( {answers} )
    if (Object.keys(answers).every(i => answers[i] !== -1)) {
      if (onQuizCompletion) {
        onQuizCompletion(answers)
      }
    }
  }

  render() {
    const questions = this.props.questions.map((q, index) =>
      <Question text={q.text} answers={q.answers} key={index} id={q.id}
        onAnswerCallback={this.handleAnswer}
      />
    )
    return <Container color='green'>
      {questions}
    </Container>
  }
}

function QuizResult(props) {
  const { title, description } = props.result;
  return <div>
    <h1 align='center'>Result: {title}</h1>
    <p align='center'>{description}</p>
  </div>
}

class QuizSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'quiz',
      quizResult: null
    }
  }

  operationLambdas = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  }

  handleQuizCompleted = (answers) => {
    const { results, effects } = this.props;
    console.log(results);
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
      const operation = this.operationLambdas[operator];
      idToScore[resultId] = operation(oldScore, operand);
    }
    
    const bestResultId = Object.keys(idToScore).reduce(
      (resultId, currentMax) => idToScore[resultId] > idToScore[currentMax] ? resultId : currentMax);
    
    const bestResult = idToResulObject[bestResultId];

    this.setState({
      phase: 'results',
      quizResult: bestResult
    })
  }

  render() {
    const { phase, quizResult } = this.state;
    return <div>
      <Quiz 
        onQuizCompletion={this.handleQuizCompleted}
        {...this.props}
      />
      {phase === 'results' && <QuizResult result={ quizResult }/>}
    </div>
  }
}

function App() {
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

  return (
      <QuizSession
        questions={quiz}
        results={results}
        effects={effects}
      />
  );
}

export default App;
