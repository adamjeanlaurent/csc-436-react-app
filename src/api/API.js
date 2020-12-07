const fetch = require('node-fetch');

class API {
    static URL = 'https://csc436quizapi.herokuapp.com/api';
    
    static async Register(username, password) {
        const options = {method: 'POST'};
        const response = await fetch(`${this.URL}/auth/register/${username}/${password}`, options);
        const data = await response.json();
        return data;
    }
    
    static async Login(username, password) {
        const response = await fetch(`${this.URL}/auth/login/${username}/${password}`);
        const data = await response.json();
        return data;
    }

    static async GetQuestionsForQuiz(quizID, numberOfQuestions) {
        let questions = [];
        for(let i = 1; i <= numberOfQuestions; i++) {
            const response = await fetch(`${this.URL}/question/getSingleQuestion/${quizID}/${i}`);
            const data = await response.json();
            questions.push(data);
        }
        return questions;
    }

    static async AnswerQuizQuestions(answers) {
        const options = {method: 'POST'};
        for(let answer of answers) {
            await fetch(`${this.URL}/question/answerSingleQuestion/${answer.studentID}/${answer.questionID}/${answer.answerID}`, options);
        }
    }

    static async GetAllQuizzes() {
        const response = await fetch(`${this.URL}/quiz/getAllQuizzes`);
        const data = await response.json();
        return data;
    }

    static async CheckIfStartedQuiz(studentID, quizID) {
        const response = await fetch(`${this.URL}/quiz/quizStarted/${studentID}/${quizID}`);
        const data = await response.json();
        return data;
    }

    static async GetScore(studentID, quizID) {
        const response = await fetch(`${this.URL}/quiz/score/${studentID}/quizID`);
        const data = await response.json();
        return data;
    }
};

module.exports = API;