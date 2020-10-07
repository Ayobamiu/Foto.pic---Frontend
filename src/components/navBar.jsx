import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/foto.png";
import { getLoggedInUser } from './user';

class NavBar extends Component {
  state = { user: null };
  componentDidMount() {
    const user = getLoggedInUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="">
        <div className="fixed-top-nav">
          <NavLink className="fixed-top-nav__logo" to="/">
            <img src={logo} alt="" />
          </NavLink>
          {user && (
            <NavLink className="fixed-top-nav__nav-link" to="/add">
              Upload
            </NavLink>
          )}
          {!user ? (
            <NavLink className="fixed-top-nav__nav-link" to="/login">
              Login
            </NavLink>
          ) : (
            <NavLink className="fixed-top-nav__nav-link-user" to="/profile">
              <i className="fa fa-user"></i>
            </NavLink>
          )}
        </div>
      </div>
      // <div className="topnav" id="myTopnav">
      //   <NavLink to="/">
      //     <i className="fa fa-camera"></i>
      //   </NavLink>
      //   <NavLink to="/photo">Photos</NavLink>
      //   {user && <NavLink to="/add">Upload</NavLink>}
      //   {!user ? (
      //     <NavLink to="/login">Login</NavLink>
      //   ) : (
      //     <NavLink to="/profile">Account</NavLink>
      //   )}
      //   <NavLink to="#" className="icon" onClick={this.myFunction}>
      //     <i className="fa fa-bars"></i>
      //   </NavLink>
      // </div>
    );
  }
}

export default NavBar;
