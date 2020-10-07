import React, { Component } from "react";
import Photos from "./components/photos";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signupForm";
import Logout from "./components/logout";
import { getLoggedInUser, getProfiles } from "./components/user";
import NotFound from "./components/notFound";
import PhotoDetails from "./components/photoDetails";
import Profile from "./components/profile";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import LoginPrompt from "./components/loginPrompt";
import PhotoForm from "./components/photoForm";
import axios from "axios";
import Rate from "./components/rate";
import HomePage from "./components/home";
class App extends Component {
  state = {
    user: null,
    profiles: [],
    albums: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const user = getLoggedInUser();
    const { data: profiles } = await getProfiles();
    const { data: albums } = await axios.get(
      `${REACT_APP_BASE_URL}/api/photo`,
      { headers: { "Content-Type": "application/json" }}
    );
    this.setState({ user, profiles, albums });
  }
  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  };
  render() {
    const { user, profiles, searchQuery, albums } = this.state;
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log(REACT_APP_BASE_URL);

    let filtered = [];
    if (searchQuery) {
      filtered = albums.filter((album) =>
        album.details.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered = albums;
    }

    return (
      <React.Fragment>
        <div className="">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/rating" component={Rate} />
            <Route
              path="/profile"
              render={(props) => (
                <Profile {...props} user={user} profiles={profiles} />
              )}
            />
            <Route path="/photo/:id" component={PhotoDetails} />
            <Route
              path="/photo"
              render={(props) => (
                <Photos {...props} user={user} albums={filtered} />
              )}
            />
            <Route path="/add" component={PhotoForm} />
            <Route path="/exp" component={LoginPrompt} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  user={user}
                  albums={filtered}
                  handleSearch={this.handleSearch}
                />
              )}
            />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
