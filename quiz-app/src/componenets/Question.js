import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';


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
    const { selectedAnswer } = this.state;
    const { answers } = this.props;
    return <Container maxWidth='sm' justify='center'>
      {this.props.text}
      <br />
      {answers.map(({ id, text }) =>
        <AnswerButton
          variant={selectedAnswer === id ? 'contained' : 'outlined'}
          key={id}
          color={selectedAnswer === id ? 'primary' : 'default'}
          onClick={event => this.onAnswerClick(event, id)}
        >{text}</AnswerButton>
      )}
    </Container>
  }
}

export default Question