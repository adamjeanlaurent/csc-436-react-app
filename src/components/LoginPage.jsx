import React from "react";

export default function LoginPage(props) {
  async function getUserInputAndLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await props.loginFunc(username, password);
  }

  return (
    <div className="marginFromTop">
      {props.errors ? <div className="alert alert-danger" role="alert">{props.errors}</div> : ""}
      <h1 className="centerText">Login:🤓</h1>
      <div className="centerLogin">
        <span>username:</span>
        <input
          placeholder="username"
          type="text"
          id="username"
          className="centerLogin bigWidth"
        ></input>
        <br />
        <br />
        <span>password:</span>
        <input
          placeholder="password"
          type="password"
          id="password"
          className="centerLogin bigWidth"
        ></input>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-danger"
          onClick={async () => await getUserInputAndLogin()}
        >
          Login
        </button>
      </div>
      <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
    </div>
  );
}
