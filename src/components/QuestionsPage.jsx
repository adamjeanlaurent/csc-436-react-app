import React, {useEffect, useState} from 'react';
import uniqid from 'uniqid';
import API from '../api/API'

export default function QuestionsPage(props) {
    useEffect(() => {
        async function getQuestions() {
            const results = await API.GetQuestionsForQuiz(props.quizID, props.numberOfQuestions);
            clearInterval(timer);
            updateQuestions(results);
            startTimer();
            timeLeft = props.timeLimit;
        }
        getQuestions();
    }, []);

    let timer;
    let timeLeft;

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(tick, 1000);
    }

    function tick() {
        timeLeft--;
        // stops negative countdown
        if(timeLeft <= 0) {
            clearInterval(timer);
            getAnswers();
            return;
        }
        let stringTime = secondsToTime(timeLeft);
        let domE = document.getElementById('time');
        if(domE !== null && domE !== undefined) {
            domE.textContent = `Time Left: ${stringTime}`;
        }
        else {
            clearInterval(timer);
            return;
        }
    }

    function secondsToTime(sec) {
        let minutes = parseInt(sec / 60);
        let seconds = parseInt(sec % 60);

        if(minutes < 10) {
            minutes = '0' + minutes;
        }

        if(seconds < 10) {
            seconds = '0' + seconds;
        }

        return `${minutes}:${seconds}`;
    }

    const [questions, updateQuestions] = useState([]);


    function getAnswers() {
        clearInterval(timer);
        timer = null;
        let answers = [];
        const radioButtons = document.querySelectorAll('input');
        for(let radioButton of radioButtons) {
            if(radioButton.checked) {
                const answerID = parseInt(radioButton.value);
                const studentID = props.studentID;
                const questionID = parseInt(radioButton.getAttribute('question_id'));
                const obj = {
                    studentID: studentID,
                    questionID: questionID,
                    answerID: answerID
                };
                answers.push(obj);
            }
        }
        props.gradeFunc(answers);
    }

    return (
        <div>
            <h1 className="centerText marginForTitle" style={{textDecorationLine: 'underline'}}>Goodluck!⏰</h1>
            <h1 id = "time" style={{color: 'red'}}></h1>
            {questions.map((question) => {
                return (
                    <div key = {uniqid()} className ="marginForTitle"> 
                        <h2 key = {uniqid()}>{question.questionText}</h2>
                        {question.answers.map((answer) => {
                            return (
                                <section key = {uniqid()}>
                                    <input key = {uniqid()} question_id = {answer.questionID} value={answer.answerID} name={question.questionText} type="radio"></input> 
                                    <label key = {uniqid()}>{answer.answerText}</label>
                                </section>
                            );
                        })}
                    </div>
                );
            })}
            <button key = {uniqid()} onClick = {getAnswers} type="button" className="btn btn-info">Submit</button>
            <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
        </div>
    );
}