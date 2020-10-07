import React, { Component } from "react";
import axios from "axios";
import { getLoggedInUser } from "./user";
import { Redirect, Link } from "react-router-dom";

class SignUpForm extends Component {
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
      .post(`${REACT_APP_BASE_URL}/api/signup/`, data)
      .then((response) => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="jumbotron">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <hr />
          <p>
            Have an account? <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
