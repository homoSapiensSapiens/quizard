import React from 'react'
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core';
import Quiz from './Quiz';

class RemoteFetchingQuiz extends React.Component {
  
  state = {
    loading: false,
    quiz: undefined,
    error: undefined
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(this.props.url)
      .finally(() => this.setState({loading: false}))
      .then(response => response.json())
      .then(quiz => this.setState({quiz}))
      .catch(error => this.setState({error}));
  }
  
  render() {
    const { loading, quiz, error } = this.state;
    const { url, ...restProps } = this.props;
    return error ? <Paper>An error occured</Paper> :
      loading ? <CircularProgress /> :
      quiz ? <Quiz questions={quiz} {...restProps}/> : null
  }
}

RemoteFetchingQuiz.propTypes = {
  url: PropTypes.string
}

export default RemoteFetchingQuiz