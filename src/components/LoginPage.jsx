import React from "react";

export default function LoginPage(props) {
  // logs in user with given credentials
  async function getUserInputAndLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await props.loginFunc(username, password);
  }

  return (
    <div className="marginFromTop">
      {/* error modal  */}
      {props.errors ? <div className="alert alert-danger" role="alert">{props.errors}</div> : ""}
      <h1 className="centerText">Login:🤓</h1>
      <div className="centerLogin">
        {/* username input  */}
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={async () => await getUserInputAndLogin()}
        >
          Login
        </button>
      </div>
      {/* footer */}
      <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
    </div>
  );
}
