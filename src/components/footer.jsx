import React, { Component } from "react";
import { getLoggedInUser } from "./user";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="footer foot">
        <div className="container ">
          <p className="text-muted centered">
            Photoly App.{" "}
            {getLoggedInUser() && (
              <Link style={{ color: "blue" }} to="/logout">
                Logout
              </Link>
            )}
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
