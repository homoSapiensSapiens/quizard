import React from 'react'

import './App.css'
import QuizSession from './componenets/QuizSession'

function App() {
  const quiz = [
    {
      id: 0,
      text: 'What is your favorite color?',
      answers: [
        { id: 0, text: 'Red' },
        { id: 1, text: 'Green' },
        { id: 2, text: 'Also green but circle' }
      ]
    },
    {
      id: 1,
      text: 'Do you like tea?',
      answers: [
        { id: 0, text: 'Yes, sure!' },
        { id: 1, text: 'Nah, not for me' }
      ]
    },
    {
      id: 2,
      text: 'How strong are you?',
      answers: [
        { id: 0, text: 'Very strong' },
        { id: 1, text: 'Normal' },
        { id: 2, text: 'Pretty weak actually' }
      ]
    }
  ];

  // TODO: indicative strings as id
  const results = [
    {
      id: 0,
      title: 'Apple',
      description: 'You are a tasty piece of fruit, and can be proud of yourself'
    },
    {
      id: 1,
      title: 'Pear',
      description: 'A pear is a nice and beutiful fruit'
    }
  ];

  // This need to be text/numbers, so it can be received from server
  const effects = {
    '0': {
      '0': { resultId: 0, operator: '+', operand: 1 },
      '1': { resultId: 1, operator: '+', operand: 1 },
      '2': { resultId: 0, operator: '+', operand: 0.5 }
    },

    '1': {
      '0': { resultId: 0, operator: '+', operand: 2 },
      '1': { resultId: 0, operator: '-', operand: -1 }
    },

    '2': {
      '0': { resultId: 1, operator: '+', operand: 1 },
      '1': { resultId: 1, operator: '-', operand: 0.5 },
      '2': { resultId: 0, operator: '+', operand: 1 }
    }
  }

  return (
      <QuizSession
        questions={quiz}
        results={results}
        effects={effects}
      />
  );
}

export default App;
