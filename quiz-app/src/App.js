import React from 'react'

import * as firebase from "firebase/app";
import "firebase/performance";

import './App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import QuizSession from './componenets/QuizSession'
import RemoteFetchingQuiz from './componenets/RemoteFetchingQuiz';
import QuizList from './componenets/QuizList';
import { HashRouter, Route, Link } from 'react-router-dom';
import { MenuItem, Container } from '@material-ui/core';

class App extends React.Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyD5Ei7Zjfhklk4VSkUi253LX_K_JKP0PYg",
      authDomain: "quiz-app-c1d68.firebaseapp.com",
      databaseURL: "https://quiz-app-c1d68.firebaseio.com",
      projectId: "quiz-app-c1d68",
      storageBucket: "",
      messagingSenderId: "723737407305",
      appId: "1:723737407305:web:8874949cdd186353"
    };
    firebase.initializeApp(firebaseConfig);
  }
  
  render() {
    return (
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
        <Container maxWidth='sm' justify='center'>
          <Route path='/' exact component={() => <QuizList/>}/>
          <Route path='/quiz/:id' component={({match}) => 
            <QuizSession
              quizId={match.params.id}
              quizElement={(onQuizCompletion) =>
                <RemoteFetchingQuiz
                url={`/api/quiz/${match.params.id}`}
                onQuizCompletion={onQuizCompletion}/>
              }
          />}/>
        </Container>
      </HashRouter>
      );
    }
  }
  export default App;