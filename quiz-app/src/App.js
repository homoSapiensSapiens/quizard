import React from 'react'

import './App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import QuizSession from './componenets/QuizSession'
import RemoteFetchingQuiz from './componenets/RemoteFetchingQuiz';
import QuizList from './componenets/QuizList';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Grid, MenuItem } from '@material-ui/core';

function App() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >

      <HashRouter>
        <AppBar position="static">
          <Toolbar>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              <MenuItem>
                Main Page
              </MenuItem>
            </Link>
          </Toolbar>
        </AppBar>

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