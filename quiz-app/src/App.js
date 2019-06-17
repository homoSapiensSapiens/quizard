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

function App() {
  const answers = [
    'foo', 'bar', 'baz'
  ];

  return (
    <Question text='foo bar or baz?' answers={answers} />
  );
}

export default App;
