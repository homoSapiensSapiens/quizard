import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

function Question(props) {
  return <Container maxWidth='sm' justify='center'>
    {props.text}
    <br/>
    {props.answers.map((a, index) => 
      <Button key={index}>{a}</Button>)
    }
  </Container>
}

function Quiz(props) {
  const questions = props.questions.map((q, index) => 
    <Question text={q.text} answers={q.answers} key={index}/>
  )
  return <Container color='green'>
    {questions}
  </Container>
}

function App() {
  const quiz =  [
    {
      text: 'Foo bar baz?',
      answers: ['foo', 'bar', 'baz']
    }, 
    {
      text: 'What is better?',
      answers: ['To be', 'Not to be']
    }
  ]

  return (
    <Quiz questions={quiz} />
  );
}

export default App;
