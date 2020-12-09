import React from "react";

export default function HomePage(props) {
  return (
    <div>
      <h1 className="centerText marginForTitle">Welcome To My CSC 436 Semester Project 😀</h1>
      <h4 className="centerText">
        Login or Register To Test Your Knowledge With Some Quizzes!
      </h4>

      {/* Register Card */}
      <div className="container marginFromTop">
        <div className="row">
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Register</h5>
                <h6 className="card-subtitle mb-2 text-muted">Register to Become a new student. 👨🏽‍🎓👩🏼‍🎓</h6>
                <button type="button" className="btn btn-primary" onClick={props.goToRegisterPage} id="loginButton">
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Login</h5>
                <h6 className="card-subtitle mb-2 text-muted">Login Into Your Student Account. 👨🏽‍🎓👩🏼‍🎓</h6>
                <button type="button" className="btn btn-success" onClick={props.goToLoginPage} id="loginButton">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h4 className="centerText" style={{marginTop: '2%'}}>Adam Jean-Laurent @ 2020</h4>
    </div>
  );
}
