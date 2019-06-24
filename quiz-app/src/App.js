import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

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
    const {selectedAnswer} = this.state;
    const {answers} = this.props;
    return <Container maxWidth='sm' justify='center'>
      {this.props.text}
      <br />
      {answers.map(({id, text}) =>
        <Button 
          key={id} 
          color={selectedAnswer === id ? 'primary' : 'default'} 
          onClick={event => this.onAnswerClick(event, id)}
        >{text}</Button>
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
      console.log('Completed quiz');
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
    const idToResultText = results.reduce((agg, { id, text }) => {
      agg[id] = text;
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
    
    const bestResultText = idToResultText[bestResultId];

    this.setState({
      phase: 'results',
      quizResult: bestResultText
    })
  }

  render() {
    const { phase, quizResult } = this.state;
    return phase === 'quiz' ?
      <Quiz 
        onQuizCompletion={this.handleQuizCompleted}
        {...this.props}
      /> :
      <h1>Result: {quizResult}</h1>;
  }
}

function App() {
  const quiz = [
    {
      id: 0,
      text: 'Foo bar baz?',
      answers: [
        { id: 0, text: 'foo' },
        { id: 1, text: 'bar' },
        { id: 2, text: 'baz' }
      ]
    },
    {
      id: 1,
      text: 'What is better?',
      answers: [
        { id: 0, text: 'To be' },
        { id: 1, text: 'Not to be' }
      ]
    },
    {
      id: 2,
      text: 'Who killed Mufasa?',
      answers: [
        { id: 0, text: 'Simba' },
        { id: 1, text: 'Kiara' },
        { id: 2, text: 'Scar' }
      ]
    }
  ];

  // TODO: indicative strings as id
  const results = [
    {
      id: 0,
      text: 'Apple'
    },
    {
      id: 1,
      text: 'Pear'
    }
  ];

  // This need to be text/numbers, so it can be received from server
  const effects = {
    '0': {
      '0': { resultId: 0, operator: '+', operand: 1 },
      '1': { resultId: 1, operator: '+', operand: 1 },
      '2': { resultId: 1, operator: '+', operand: 1 }
    },

    '1': {
      '0': { resultId: 0, operator: '+', operand: 3 },
      '1': { resultId: 1, operator: '-', operand: -1 }
    },

    '2': {
      '0': { resultId: 0, operator: '+', operand: 1 },
      '1': { resultId: 1, operator: '-', operand: 2 },
      '2': { resultId: 1, operator: '+', operand: 1 }
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
