import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/foto.png";
import Footer from "./footer";
import Photos from "./photos";

class HomePage extends Component {
  state = {};
  render() {
    const { albums, user, handleSearch } = this.props;
    return (
      <div className="home">
        <section className="first-page">
          <div className="top">
            <NavLink className="logo" to="/">
              <img src={logo} alt="" />
            </NavLink>
            {user && (
              <NavLink className="nav-link" to="/add">
                Upload
              </NavLink>
            )}
            {!user ? (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            ) : (
              <NavLink className="nav-link-user" to="/profile">
                <i className="fa fa-user"></i>
              </NavLink>
            )}
          </div>
          <h1>Graphic resources for everyone</h1>
          <p>Find Free Vectors, Stock Photos, PSD and Icons</p>
          <div className="search">
            <select name="types" id="types">
              <option value="">All types</option>
              <option value="type-1">Type 1</option>
              <option value="type-2">Type 2</option>
              <option value="type-3">Type 3</option>
            </select>
            <input
              type="text"
              name="query"
              onChange={handleSearch}
              placeholder="Search all images"
            />
            <i className="fa fa-search"></i>
          </div>
          <small>Examples: Logo, Phone, Beach..</small>
        </section>
        <Photos user={user} albums={albums} />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
