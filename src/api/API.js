const fetch = require('node-fetch');

// makes API calls
class API {
    // API url
    static URL = 'https://csc436quizapi.herokuapp.com/api';
    
    // register user
    static async Register(username, password) {
        const options = {method: 'POST'};
        if(username.length === 0 || password.length === 0) {
            username = 'empty';
            password = 'empty';
        }
        const response = await fetch(`${this.URL}/auth/register/${username}/${password}`, options);
        const data = await response.json();
        return data;
    }
    
    // login user
    static async Login(username, password) {
        const response = await fetch(`${this.URL}/auth/login/${username}/${password}`);
        const data = await response.json();
        return data;
    }

    // get all questions and answers for all questions in a quiz
    static async GetQuestionsForQuiz(quizID, numberOfQuestions) {
        let questions = [];
        for(let i = 1; i <= numberOfQuestions; i++) {
            const response = await fetch(`${this.URL}/question/getSingleQuestion/${quizID}/${i}`);
            const data = await response.json();
            questions.push(data);
        }
        return questions;
    }

    // answer all questions in a quiz
    static async AnswerQuizQuestions(answers) {
        const options = {method: 'POST'};
        for(let answer of answers) {
            await fetch(`${this.URL}/question/answerSingleQuestion/${answer.studentID}/${answer.questionID}/${answer.answerID}`, options);
        }
    }

    // get information about all quizzes
    static async GetAllQuizzes() {
        const response = await fetch(`${this.URL}/quiz/getAllQuizzes`);
        const data = await response.json();
        return data;
    }

    // check if user alreadt started a quiz in the past
    static async CheckIfStartedQuiz(studentID, quizID) {
        const response = await fetch(`${this.URL}/quiz/quizStarted/${studentID}/${quizID}`);
        const data = await response.json();
        return data;
    }

    // score a quiz and answered are inserted
    static async ScoreQuiz(studentID, quizID) {
        const options = {method: 'POST'};
        const response = await fetch(`${this.URL}/quiz/score/${studentID}/${quizID}`, options);
        const data = await response.json();
        return data;
    }

    static async GetGradebook(studentID) {
        const respose = await fetch(`${this.URL}/quiz/gradebook/${studentID}`);
        const data = await respose.json();
        return data;
    }
};

export default API;