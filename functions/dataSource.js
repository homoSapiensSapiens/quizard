const admin = require('firebase-admin');
const functions = require('firebase-functions');
const lodash = require('lodash');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

exports.getQuizList = async function() {
  const snapshot = await db.collection('quizzes').get();
  return snapshot.docs.map(doc => 
    lodash.assign(lodash.pick(doc.data(), ['title', 'description']), {quizID: doc.id})  
  );
}

exports.getQuiz = async function(quizId) {
  const quizDocument = await db.collection('quizzes').doc(quizId).get();
  if (!quizDocument.exists) {
    throw new Error(`No quiz ${quizId}`)
  }
  return quizDocument.data();
}
