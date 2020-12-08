import React, {useEffect, useState} from 'react';
import uniqid from 'uniqid';
import API from '../api/API'

export default function QuizzesPage(props) {
    useEffect(() => {
        async function getQuizzes() {
            const res = await API.GetAllQuizzes();
            updateQuizzes(res);
        }
        getQuizzes();
    }, []);

    const [quizzes, updateQuizzes] = useState([]);

    return (
        <div>
            <h1 className="centerText marginForTitle">Available Quizzes:🎓</h1>
            {quizzes.map((quiz) => {
                return (
                    <div key = {uniqid()} className="card marginForTitle" style={{ width: "18rem" }}>
                        <div key = {uniqid()} className="card-body">
                            <h5 key = {uniqid()} className="card-title">{`Title: ${quiz.title}`}</h5>
                            <h6 key = {uniqid()} className="card-subtitle mb-2 text-muted">{`Number Of Questions: ${quiz.numQuestions}`}</h6>
                            <p className="card-text">{`Time Limit: ${quiz.timeLimit / 60} Minutes`}</p>
                            <button key = {uniqid()} type="button" className="btn btn-success" onClick = {async() => await props.goToQuestionsPage(quiz.quizID, quiz.numQuestions)}>Take This Quiz</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}