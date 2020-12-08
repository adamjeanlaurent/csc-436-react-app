import { useState } from 'react';
import API from './api/API';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import QuizzesPage from './components/QuizzesPage';
import QuestionsPage from './components/QuestionsPage';
import GradebookPage from './components/GradebookPage';

function App() {
  const [state, updateState] = useState(
    {
      loggedIn: false,
      showLoginPage: false,
      showRegisterPage: false,
      showQuizPage: false,
      showHomePage: true,
      studentID: null,
      quizID: null,
      numberOfQuestions: null,
      showQuizzesPage: false,
      errors: null,
      showQuestionsPage: false,
      showGradebookPage: false
    }
    );

  // login user
  async function login(username, password) {  
    const res = await API.Login(username, password);
    if(res.message === 'success') {
      let newState = { ...state };
      newState.studentID = res.studentID;
      newState.loggedIn = true;
      newState.showLoginPage = false;
      newState.showQuizzesPage = true;
      updateState(newState);
    }

    else {
      let newState = { ...state };
      newState.errors = res.message;
      updateState(newState);
    }
  }

  // register user
  async function register(username, password) {  
    const res = await API.Register(username, password);
    if(res.message === 'success') {
      let newState = { ...state };
      newState.studentID = res.studentID;
      newState.loggedIn = true;
      newState.showRegisterPage = false;
      newState.showQuizzesPage = true;
      updateState(newState);
    }

    else {
      let newState = { ...state };
      newState.errors = res.message;
      updateState(newState);
    }
  }

  // show register page
  function navRegisterPage() {
    let newState = { ...state };
    newState.showHomePage = false;
    newState.showRegisterPage = true;
    updateState(newState);
  }

  // show login page
  function navLoginPage() {
    let newState = { ...state };
    newState.showHomePage = false;
    newState.showLoginPage = true;
    updateState(newState);
  }

  // show questions page
  async function navQuestionsPage(quizID, numberOfQuestions) {
    // check if they have taken the quiz before
    // if so send to gradebook page
    const res = await API.CheckIfStartedQuiz(state.studentID, quizID);
    if(res.message === 'took already') {
        // send to gradebook
        await navGradebook(state.studentID);
        return;
    }
    
    // send to questions page
    let newState = { ...state }
    newState.showQuizzesPage = false;
    newState.showQuestionsPage = true;
    newState.numberOfQuestions = numberOfQuestions;
    newState.quizID = quizID;
    updateState(newState);
  }

  // send to gradebook
  async function navGradebook() {
    let newState = { ...state };
    newState.showQuestionsPage = false;
    newState.showQuizzesPage = false;
    newState.showGradebookPage = true;
    updateState(newState);
  }
  
  // grade quiz
  async function gradeQuiz(answers) {
      // insert answers into db
      await API.AnswerQuizQuestions(answers);

      // score quiz
      await API.ScoreQuiz(state.studentID, state.quizID);

      // send to gradebook
      await navGradebook(state.studentID);
  }

  // nav back to quizzes page from gradebook
  async function navQuizzesPage() {
    let newState = { ...state };
    newState.showQuizzesPage = true;
    newState.showGradebookPage = false;
    updateState(newState);
  }

  return (
    <div className="App">
      {state.showHomePage && <HomePage goToRegisterPage = {navRegisterPage} goToLoginPage = {navLoginPage}/>}
      {state.showRegisterPage && <RegisterPage registerFunc = {register} errors = {state.errors}/>}
      {state.showLoginPage && <LoginPage loginFunc = {login} errors = {state.errors}/>}
      {state.showQuizzesPage && <QuizzesPage goToQuestionsPage = {navQuestionsPage}/>}
      {state.showQuestionsPage && <QuestionsPage gradeFunc = {gradeQuiz} quizID = {state.quizID} numberOfQuestions = {state.numberOfQuestions} studentID = {state.studentID}/>}
      {state.showGradebookPage && <GradebookPage studentID = {state.studentID} backToQuizPageFunc ={navQuizzesPage}/>}
    </div>
  );
}

export default App;
