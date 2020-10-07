import React, { Component } from "react";
import axios from "axios";
import { getLoggedInUser } from "./user";
import { Redirect, Link } from "react-router-dom";

class LoginForm extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };

  handleSubmit = (e) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    e.preventDefault();
    const data = this.state.user;

    axios
      .post(`${REACT_APP_BASE_URL}/api/login/`, data)
      .then(({ data }) => {
        const token = data.token;
        localStorage.setItem("token", token);
        window.location = "/";
      })
      .catch((error) => {});
  };

  handleChange = (e) => {
    e.preventDefault();
    const name = [e.target.name];
    const user = this.state.user;
    user[name] = e.target.value;
    this.setState({
      user,
    });
  };
  render() {
    if (getLoggedInUser()) return <Redirect to="/" />;
    return (
      <div className="jumbotron login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              Your credentials are safe with us.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <hr />
          <p>
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
