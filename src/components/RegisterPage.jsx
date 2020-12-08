import React from "react";

export default function LoginPage(props) {
  async function getUserInputAndRegister() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await props.registerFunc(username, password);
  }

  return (
    <div className="marginFromTop">
      {props.errors ? <div class="alert alert-danger" role="alert">{props.errors}</div> : ""}
      <h1 className="centerText">Register:🤓</h1>
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
        <button type="button" className="btn btn-info" onClick={async () => await getUserInputAndRegister()}>
          Register
        </button>
      </div>
    </div>
  );
}
