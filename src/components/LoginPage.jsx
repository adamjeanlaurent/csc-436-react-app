import React from 'react';

export default function LoginPage(props) {
    async function getUserInputAndLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await props.loginFunc(username, password);
    }

    return(
        <div>
            {props.errors ? <h1>{props.errors}</h1> : ""}
            <h1>Login Page</h1>
            username:
            <input type="text" id = "username"></input>
            <br/>
            <br/>
            password:
            <input type="text" id = "password"></input>

            <br/>
            <br/>
            <button onClick= {async () => await getUserInputAndLogin()}>Login</button>
        </div>
    );
}

