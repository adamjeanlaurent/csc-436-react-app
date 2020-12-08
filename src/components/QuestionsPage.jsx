import React, {useEffect, useState} from 'react';
import uniqid from 'uniqid';
import API from '../api/API'

export default function QuestionsPage(props) {
    useEffect(() => {
        async function getQuestions() {
            const results = await API.GetQuestionsForQuiz(props.quizID, props.numberOfQuestions);
            updateQuestions(results);
        }
        getQuestions();
    }, []);

    const [questions, updateQuestions] = useState([]);

    function getAnswers() {
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
        </div>

        
    );
}