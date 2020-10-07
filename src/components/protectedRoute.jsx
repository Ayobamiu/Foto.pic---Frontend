import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getLoggedInUser } from "./user";

class ProtectedRoute extends Component {
  render() {
    const { path, component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!getLoggedInUser()) {
            return <Redirect to={
                {
                    pathname:"/login",
                    state: { from: props.location}
                    
                }
            } />;
          } else
            return Component ? <Component {...props} /> : this.render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;
