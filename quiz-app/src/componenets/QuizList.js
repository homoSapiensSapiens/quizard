import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardActionArea } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

class QuizList extends React.Component {

  state = {
    loading: false,
    quizList: [],
    error: undefined
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch('/api/quiz')
      .then(res => res.json())
      .then(quizList => {
        this.setState({ quizList })
      })
      .catch(error => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({loading: false});
      });
  }

  // TODO: fetch list from server
  render() {
    const { quizList, loading, error } = this.state;

    return loading ? <CircularProgress/> :
      error ? <p>An error: {error.toString()}</p> :
    quizList.map(q => (
      <Link to={`/quiz/${q.quizID}`}>
      <Card>
        <CardActionArea>
          <h1>{q.title}</h1>
          <p>
            {q.description}
          </p>
        </CardActionArea>
      </Card>
    </Link>
    ));
  }
}

export default QuizList;