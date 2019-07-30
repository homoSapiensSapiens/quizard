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

  results: [
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

const quiz1 = {
  questions: [{
    id: 'how_calm',
    text: 'How calm are you?',
    answers: [
      { id: 'very', text: 'Very calm, darling'},
      { id: 'somewhat', text: 'Somewhat calm'},
      { id: 'not', text: 'THIS IS THE LAST TIME YOU ASK ME SUCH A STUPID QUESTION!'},
    ]
  }],
  results: [{
    id: 'black',
    title: 'Black',
    description: 'Black indicate silence, calmness and control. \
    Just like a ninja, a tire, or a raven, you are silent but deadly dangerous.\
    Don\'t forget to be kind to some people, they deserve it.'
  }, {
    id: 'red',
    title: 'Red',
    description: 'Red indicate boldness, dynamism, and anger upon the sinners. \
    Just like a red dress, a stop sign, or Coca Cola, you are drawing attention to yourself by all means.\
    Be careful with when you are choosing to make dramas, as sometimes it is better to be Blue or Green'
  }],
  effects: {
    how_calm: {
      very: { resultId: 'black', operator: '+', operand: 3 },
      somewhat: { resultId: 'black', operator: '+', operand: 1 },
      not: { resultId: 'red', operator: '+', operand: 5 }
    }
  }
};

// TODO: move ID title and description to quiz object.
const quizList = [
  {
    quizID: 0,
    title: 'Fruits Quiz',
    description: 'Take now a quiz and find out what fruit are you'
  }, {
    quizID: 1,
    title: 'What color are you?',
    description: 'Find out now, what color define you the best'
  }
];

exports.getQuizList = function() {
  return quizList;
}

exports.getQuiz = function(quizId) {
  // TODO: check from a list/map
  if (quizId === '0') {
    return quiz0;
  } else if (quizId === '1'){
    return quiz1;
  } else {
    throw new Error(`No quiz ${quizId}`)
  }
}
