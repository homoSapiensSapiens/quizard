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

  handleQuizCompleted = (answers) => {
    this.setState({
      phase: 'results',
      quizResult: Object.keys(answers).join(' ')
    })
  }

  render() {
    const { phase, quizResult } = this.state;
    return phase === 'quiz' ?
      <Quiz 
        onQuizCompletion={this.handleQuizCompleted}
        {...this.props}
      /> :
      <h1>Finished: {quizResult}</h1>;
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
  ]

  return (
      <QuizSession questions={quiz} />
  );
}

export default App;
