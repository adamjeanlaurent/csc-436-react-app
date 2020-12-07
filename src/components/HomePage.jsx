import React from 'react';

export default function HomePage(props) {
    return (
        <div>
            <h1>Home Page:</h1>
            <button onClick = {props.goToRegisterPage} id = "loginButton">register</button>
            <br/>
            <br/>
            <button onClick = {props.goToLoginPage} id = "registerButton">login</button>
        </div>
    );
}