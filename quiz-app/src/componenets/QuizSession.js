import React from 'react'
import QuizResult from './QuizResult'
import { Link, Button, CircularProgress } from '@material-ui/core';

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

    this.setState({phase: 'result_fetch'}, () => {
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
          }))
          .catch(error => {
            this.setState({phase: 'result_error', error})
          });
    });
  }

  render() {
    const { phase, quizResult } = this.state;
    const { quizElement } = this.props;
    return <>
      {quizElement(this.handleQuizCompleted)}
      {phase === 'results' && <>
        <QuizResult result={quizResult} />
        <Link href='/'>
          <Button>
            Back to main page
          </Button>
        </Link>
      </>}
      {phase === 'result_fetch' && <p>Fetching result...</p>}
    </>
  }
}

export default QuizSession;