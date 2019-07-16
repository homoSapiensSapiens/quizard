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
    const { results, effects } = this.props;
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
    const { quizElement } = this.props;
    return <div>
      {quizElement(this.handleQuizCompleted)}
      {phase === 'results' && <QuizResult result={quizResult} />}
    </div>
  }
}

export default QuizSession;