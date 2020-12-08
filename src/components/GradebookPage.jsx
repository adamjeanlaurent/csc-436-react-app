import React, {useEffect, useState} from 'react';
import API from '../api/API';
import uniqid from 'uniqid';

export default function Gradebook(props) {
    useEffect(() => {
        async function getGradebook() {
            const res = await API.GetGradebook(props.studentID);
            updateGrades(res);
        }
        getGradebook();
    },[]);
    
    const [grades, updateGrades] = useState([]);
    return(
        <div>
            <h1>Gradebook</h1>
            {grades.map((grade) => {
                return (
                    <div key = {uniqid()}>
                        <h1 key = {uniqid()}>{`Quiz: ${grade.title} | Grade: ${grade.score}%`}</h1>
                    </div>
                );
            })}
            <button onClick={props.backToQuizPageFunc}>Back To Quizzes Page</button>
        </div>
    );
}