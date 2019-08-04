import React from 'react';
import lodash from 'lodash';
import update from 'immutability-helper';
import { TextField, Button } from '@material-ui/core';

class Question extends React.Component {

  makeChange = changeFunc => {
    this.props.onChange({
      target: {
        value: changeFunc(this.props.value)
      }
    });
  }

  handleChangeFor = field => e => {
    const newText = e.target.value;
    this.makeChange(value => update(value, {
      [field]: {$set: newText}
    }));
  }

  handleAnswerChange = (index, text) => {
    this.makeChange(value => update(value, {
        answers: {
          [index]: {$set: text}
        }
    }));
  }

  handleAnswerAdd = (text) => {
    this.makeChange(value => 
      update(value, {
        answers: ans => 
          update((ans || []), {$push: [text]})
      })
    );
  }

  render() {
    const question = this.props.value;
    const text = question.text || '';
    const answers = question.answers || [];
    
    return <div>
      <TextField
        label='The question'
        placeholder='What is you favorite color?'
        onChange={this.handleChangeFor('text')}
        value={text}/>
      <br />
      {
        answers.map((a, i) => 
        <TextField label='answer' placeholder='Color'
          value={a} key={i}
          onChange={e => this.handleAnswerChange(i, e.target.value)}/>)
      }
      <Button onClick={() => this.handleAnswerAdd('')}>Add answer</Button>
    </div>
  }
}

class CreateQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz : {
        questions: [{}]
      }
    };
  }

  bindToPathProps = path => {
    return {
      value: lodash.get(this.state, path) || '',
      onChange: e => {
        const value = e.target.value;
        this.setState(state => {
          lodash.set(state, path, value);
          return state;
        })
      },
    };
  }

  render() {
    const {quiz} = this.state;
    const questions = quiz.questions || [];
    return (
      <form>
        <p>Add quiz (:</p>
        <p>
          {JSON.stringify(quiz)}
        </p>
        <TextField label='Quiz Title' placeholder='My Awesome Quiz'
          {...this.bindToPathProps('quiz.title')}/>
        <br/>
        <TextField label='Quiz Description' placeholder='Describe your quiz' multiline fullWidth
          {...this.bindToPathProps('quiz.description')}/>
        <br/><br/>
        Questions: <br/>
        {
          questions.map((q, i) => <Question
            key={i}
            {...this.bindToPathProps(`quiz.questions[${i}]`)}/>)
        }
        <Button onClick={() => this.setState(state => update(state, {quiz: {questions: {$push: [{}]}}}))}>
          Add a question
        </Button>
      </form>
    );
  }
}

export default CreateQuiz;