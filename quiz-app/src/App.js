import React from 'react'

import './App.css'
import QuizSession from './componenets/QuizSession'
import RemoteFetchingQuiz from './componenets/RemoteFetchingQuiz';

function App() {

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
        quizElement={(onQuizCompletion) =>
          <RemoteFetchingQuiz
            url='/api/quiz/0'
            onQuizCompletion={onQuizCompletion}/>
          }
        results={results}
        effects={effects}
      />
  );
}

export default App;
