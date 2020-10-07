import React, { Component } from "react";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="not-found">
        <h1>Not found</h1>
        <a href="/">
          <button>Goto Homepage</button>
        </a>
      </div>
    );
  }
}

export default NotFound;
