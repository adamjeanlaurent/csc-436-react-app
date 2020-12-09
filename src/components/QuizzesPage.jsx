import React, {useEffect, useState} from 'react';
import uniqid from 'uniqid';
import API from '../api/API'

export default function QuizzesPage(props) {
    // when component mounts
    // get all quizzes
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
            {/* title */}
            <h1 className="centerText marginForTitle">Available Quizzes:🎓</h1>
            {/* gradebook button */}
            <button type="button" className="btn btn-primary" style={{textDecorationLine: 'underline', left: '43%', position: 'relative', marginTop: '3%'}} onClick={props.goToGradebook}>Go To Gradebook📊</button>
            {quizzes.map((quiz) => {
                return (
                    <div key = {uniqid()} className="card marginForTitle" style={{ width: "18rem" }}>
                        <div key = {uniqid()} className="card-body">
                            {/* title */}
                            <h5 key = {uniqid()} className="card-title">{`Title: ${quiz.title}`}</h5>
                            {/* number of questions */}
                            <h6 key = {uniqid()} className="card-subtitle mb-2 text-muted">{`Number Of Questions: ${quiz.numQuestions}`}</h6>
                            {/* time limit */}
                            <p className="card-text">{`Time Limit: ${quiz.timeLimit / 60} Minutes`}</p>
                            {/* take quiz button */}
                            <button key = {uniqid()} type="button" className="btn btn-success" onClick = {async() => await props.goToQuestionsPage(quiz.quizID, quiz.numQuestions, quiz.timeLimit)}>Take This Quiz</button>
                        </div>
                    </div>
                );
            })}
           <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
        </div>
    );
}