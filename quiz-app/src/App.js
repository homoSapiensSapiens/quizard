import React from 'react'

import './App.css'
import QuizSession from './componenets/QuizSession'
import RemoteFetchingQuiz from './componenets/RemoteFetchingQuiz';

function App() {
  return (
      <QuizSession
        quizId={0}
        quizElement={(onQuizCompletion) =>
          <RemoteFetchingQuiz
            url='/api/quiz/0'
            onQuizCompletion={onQuizCompletion}/>
          }
      />
  );
}

export default App;
