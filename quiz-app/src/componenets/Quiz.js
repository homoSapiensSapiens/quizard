import React from 'react'
import Container from '@material-ui/core/Container'
import Question from './Question'

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
      } else {
        console.warn('No onQuizCompletion callback');
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

export default Quiz;