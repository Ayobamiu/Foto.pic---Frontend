import React, { Component } from "react";
import { getLoggedInUser } from "./user";
import { Redirect, Link } from "react-router-dom";

class LoginPrompt extends Component {
  state = {};
  render() {
    if (getLoggedInUser()) return <Redirect to="/" />;
    return (
      <div className="jumbotron">
        <div className="container">
          <p>Login for better experience</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-primary m-3">SignUp</Link>
        </div>
      </div>
    );
  }
}

export default LoginPrompt;
