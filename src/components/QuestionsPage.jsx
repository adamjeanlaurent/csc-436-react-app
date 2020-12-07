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
                    <div> 
                        <h2>{question.questionText}</h2>
                        {question.answers.map((answer) => {
                            return (
                                <section>
                                    <input value={answer.answerID} name={question.questionText} type="radio"></input>
                                    <label>{answer.answerText}</label>
                                </section>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}