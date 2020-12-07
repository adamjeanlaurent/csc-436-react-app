import React, {useEffect, useState} from 'react';
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

    return (
        <div>
            {questions.map((question) => {
                return (
                    <h1>{question.questionText}</h1>
                );
            })}
        </div>
    );
}