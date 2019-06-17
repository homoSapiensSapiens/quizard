import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { onAnswerCallback } = props;
    this.onAnswerCallback = onAnswerCallback;
    this.state = {
      selectedAnswer: -1
    }
  }

  onAnswerClick = (event, answerId) => {
    this.setState({
      selectedAnswer: answerId
    })
    if (this.onAnswerCallback) {
      this.onAnswerCallback(this.props.id, answerId);
    }
  }

  render() {
    const that = this;
    return <Container maxWidth='sm' justify='center'>
    {this.props.text}
    <br/>
    {this.props.answers.map((a, index) => {
      const color = that.state.selectedAnswer === a.id ? 'primary' : 'default';
      const clickCallback = (event) => that.onAnswerClick(event, a.id);
      return <Button color={color} key={index} onClick={clickCallback}>{a.text}</Button>
    })}
  </Container>  }
}

function Quiz(props) {
  const questions = props.questions.map((q, index) => 
    <Question text={q.text} answers={q.answers} key={index}
    onAnswerCallback={(questionID, AnswerID) => console.log("Q:" + questionID + ", Answer: " +  AnswerID)}
    />
  )
  return <Container color='green'>
    {questions}
  </Container>
}

function App() {
  const quiz =  [
    {
      id: 0,
      text: 'Foo bar baz?',
      answers: [
        {id: 0, text: 'foo'},
        {id: 1, text: 'bar'},
        {id: 2, text: 'baz'}
      ]
    }, 
    {
      id: 1,
      text: 'What is better?',
      answers: [
        {id: 0, text: 'To be'},
        {id: 1, text: 'Not to be'}
      ]
    }
  ]

  return (
    <Quiz questions={quiz} />
  );
}

export default App;
