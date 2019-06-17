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
    if (this.onAnswerCallback) {
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
  render() {
    const questions = this.props.questions.map((q, index) =>
      <Question text={q.text} answers={q.answers} key={index} id={q.id}
        onAnswerCallback={(questionID, AnswerID) => console.log("Q:" + questionID + ", Answer: " + AnswerID)}
      />
    )
    return <Container color='green'>
      {questions}
    </Container>
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
    <Quiz questions={quiz} />
  );
}

export default App;
