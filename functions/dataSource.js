const quiz0 = {
  questions :[{
    id: 'favorite_color',
    text: 'What is your favorite color?',
    answers: [
      { id: 'red', text: 'Red' },
      { id: 'green', text: 'Green' },
      { id: 'green_circle', text: 'Also green but circle' }
    ]
  }, {
    id: 'like_tea',
    text: 'Do you like tea?',
    answers: [
      { id: 'yes', text: 'Yes, sure!' },
      { id: 'no', text: 'Nah, not for me' }
    ]
  }, {
    id: 'how_strong',
    text: 'How strong are you?',
    answers: [
      { id: 'very', text: 'Very strong' },
      { id: 'normal', text: 'Normal' },
      { id: 'weak', text: 'Pretty weak actually' }
    ]
  }],

  results: [ // TODO: indicative strings as id
    {
      id: 'apple',
      title: 'Apple',
      description: 'You are a tasty piece of fruit, and can be proud of yourself'
    },
    {
      id: 'pear',
      title: 'Pear',
      description: 'A pear is a nice and beutiful fruit'
    }
  ],
  
  effects: {
    'favorite_color': {
      'red': { resultId: 'apple', operator: '+', operand: 1 },
      'green': { resultId: 'pear', operator: '+', operand: 1 },
      'green_circle': { resultId: 'apple', operator: '+', operand: 0.5 }
    },
  
    'like_tea': {
      'yes': { resultId: 'apple', operator: '+', operand: 2 },
      'no': { resultId: 'apple', operator: '-', operand: -1 }
    },
  
    'how_strong': {
      'very': { resultId: 'pear', operator: '+', operand: 1 },
      'normal': { resultId: 'pear', operator: '-', operand: 0.5 },
      'weak': { resultId: 'apple', operator: '+', operand: 1 }
    }
  }  
};

const quizList = [
  {
    quizID: 0,
    title: 'Fruits Quiz',
    description: 'Take now a quiz and find out what fruit are you'
  }
];

exports.getQuizList = function() {
  return quizList;
}

exports.getQuiz = function(quizId) {
  if(quizId === '0') {
    return quiz0;
  } else {
    throw new Error(`No quiz ${quizId}`)
  }
}
