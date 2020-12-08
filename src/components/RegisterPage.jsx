import React from 'react';

export default function LoginPage(props) {
    async function getUserInputAndRegister() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await props.registerFunc(username, password);
    }
    
    return(
        <div>
            {props.errors ? <h1>{props.errors}</h1> : ""}
            <h1>Regsiter Page:</h1>
            username:
            <input type="text" id = "username"></input>
            <br/>
            <br/>
            password:
            <input type="text" id = "password"></input>

            <br/>
            <br/>
            <button onClick= {async () => await getUserInputAndRegister()}>Register</button>
        </div>
    );
}

