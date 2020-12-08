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
            <h1 className ="centerText marginForTitle" style={{textDecorationLine: 'underline'}}>Gradebook✅</h1>
            {grades.map((grade) => {
                return (
                    <div key = {uniqid()} style={{marginTop: '4%'}}>
                        <h1 className ="centerText" key = {uniqid()}>
                            <span style={{color: 'green'}} key = {uniqid()}>{`Quiz: ${grade.title}`}</span>
                            <span> | </span>
                            <span style={{color: 'purple'}} key = {uniqid()}>{`Grade: ${grade.score}%`}</span>
                        </h1>
                    </div>
                );
            })}
            <button type="button" className="btn btn-primary" style={{textDecorationLine: 'underline', left: '40%', position: 'relative', marginTop: '3%'}} onClick={props.backToQuizPageFunc}>Back To Quizzes Page</button>
        </div>
    );
}