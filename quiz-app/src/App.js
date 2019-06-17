import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

function Question(props) {
  return <Box>
    {props.text}
    {props.answers.map(a => 
      <Button>{a}</Button>)
    }
  </Box>
}

function App() {
  const answers = [
    'foo', 'bar', 'baz'
  ];

  return (
    <Question text='foo bar baz?' answers={answers} />
  );
}

export default App;
