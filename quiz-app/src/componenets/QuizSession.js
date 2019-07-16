import React from 'react'
import QuizResult from './QuizResult'

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
    const {quizId} = this.props;
    // TODO: Loading indicator?
    fetch(`/api/result/${quizId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({answers})})
        .then(response => response.json())
        .then(bestResult => this.setState({
          phase: 'results',
          quizResult: bestResult
        }));
  }

  render() {
    const { phase, quizResult } = this.state;
    const { quizElement } = this.props;
    console.log(quizResult);
    return <>
      {quizElement(this.handleQuizCompleted)}
      {phase === 'results' && <QuizResult result={quizResult} />}
    </>
  }
}

export default QuizSession;