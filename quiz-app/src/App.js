import React from 'react'

import './App.css'
import QuizSession from './componenets/QuizSession'
import RemoteFetchingQuiz from './componenets/RemoteFetchingQuiz';
import QuizList from './componenets/QuizList';
import { HashRouter, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <HashRouter>
        <Route path='/' exact component={() => <QuizList/>}/>
        <Route path='/quiz/0' component={() => 
          <QuizSession
          quizId={0}
          quizElement={(onQuizCompletion) =>
            <RemoteFetchingQuiz
            url='/api/quiz/0'
            onQuizCompletion={onQuizCompletion}/>
          }
          />
        }/>
      </HashRouter>
    </Grid>
    );
}
export default App;