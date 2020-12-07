import React, {useEffect, useState} from 'react';
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
            <h1>Quizzes Page:</h1>
            {quizzes.map((quiz) => {
                return (
                    <div>
                        <h1>{`Title: ${quiz.title}`}</h1>
                        <h2>{`Number Of Questions: ${quiz.numQuestions}`}</h2>
                        <h2>{`Time Limit: ${quiz.timeLimit / 60} Minutes`}</h2>
                        <button onClick = {async() => await props.goToQuestionsPage(quiz.quizID, quiz.numQuestions)}>Take This Quiz</button>
                    </div>
                );
            })}
        </div>
    );
}