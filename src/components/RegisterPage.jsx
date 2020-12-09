import React from "react";

// register user with given credentails
export default function RegisterPage(props) {
  async function getUserInputAndRegister() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await props.registerFunc(username, password);
  }

  return (
    <div className="marginFromTop">
      {/* errors modal */}
      {props.errors ? <div class="alert alert-danger" role="alert">{props.errors}</div> : ""}
      <h1 className="centerText">Register:🤓</h1>
      <div className="centerLogin">
      {/* username input */}
        <span>username:</span>
        <input
          placeholder="username"
          type="text"
          id="username"
          className="centerLogin bigWidth"
        ></input>
        <br />
        <br />
        {/* password input */}
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
      <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>

    </div>
  );
}
