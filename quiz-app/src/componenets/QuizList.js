import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardActionArea } from '@material-ui/core';

class QuizList extends React.Component {

  // TODO: fetch list from server
  render() {
    return (
      <Link to='/quiz/0'>
      <Card>
        <CardActionArea>
          <h1>Fruits quiz</h1>
          <p>
            Take now a quiz and find out what fruit are you
          </p>
        </CardActionArea>
      </Card>
    </Link>
    );
  }
}

export default QuizList;