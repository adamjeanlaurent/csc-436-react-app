import React, {useEffect, useState} from 'react';
import uniqid from 'uniqid';
import API from '../api/API'

export default function QuestionsPage(props) {
    // when components mounts
    // get questions from given quiz id
    // and start timer ticking
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

    // timer vars
    let timer;
    let timeLeft;

    // start timer ticking interval
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(tick, 1000);
    }

    // handling ticks, called each second
    function tick() {
        timeLeft--;
        // stops negative countdown
        if(timeLeft <= 0) {
            clearInterval(timer);
            getAnswers();
            return;
        }
        let stringTime = secondsToTime(timeLeft);
        // update DOM
        let domE = document.getElementById('time');
        if(domE !== null && domE !== undefined) {
            domE.textContent = `Time Left: ${stringTime}`;
        }
        else {
            clearInterval(timer);
            return;
        }
    }

    // convert seconds to minutes:seconds
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

    // gets all checked answers grades
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
            {/* title */}
            <h1 className="centerText marginForTitle" style={{textDecorationLine: 'underline'}}>Goodluck!⏰</h1>
            {/* time left */}
            <h1 id = "time" style={{color: 'red'}}></h1>
            {questions.map((question) => {
                return (
                    <div key = {uniqid()} className ="marginForTitle">
                         {/*question  */}
                        <h2 key = {uniqid()}>{question.questionText}</h2>
                        {question.answers.map((answer) => {
                            return (
                                <section key = {uniqid()}>
                                    {/* answer */}
                                    <input key = {uniqid()} question_id = {answer.questionID} value={answer.answerID} name={question.questionText} type="radio"></input> 
                                    <label key = {uniqid()}>{answer.answerText}</label>
                                </section>
                            );
                        })}
                    </div>
                );
            })}
            {/* submit button */}
            <button key = {uniqid()} onClick = {getAnswers} type="button" className="btn btn-info">Submit</button>
            <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
        </div>
    );
}