import React from 'react';
import './App.css';

function Question(props) {
  return <div>
    {props.text}
    {props.answers.map(a => 
      <button>{a}</button>)
    }
  </div>
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
