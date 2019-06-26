import React from 'react'

function QuizResult(props) {
  const { title, description } = props.result;
  return <div>
    <h1 align='center'>Result: {title}</h1>
    <p align='center'>{description}</p>
  </div>
}

export default QuizResult;