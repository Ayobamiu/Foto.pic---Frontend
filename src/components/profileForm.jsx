import React, { Component } from "react";
// import axios from "axios";
import { getLoggedInUser } from "./user";

class ProfileForm extends Component {
  state = {
    user: {},
    profile: {
      firstName: "",
      lastName: "",
      phone: "",
      image: null,
    },
  };
  async componentDidMount() {
    const user = getLoggedInUser();

    this.setState({
      user,
    });
  }
  handleImageChange = (event) => {
    const name = [event.target.name];
    const profile = this.state.profile;
    profile[name] = event.target.files[0];
    this.setState({
      profile,
      loaded: 0,
    });
  };
  handleChange = (event) => {
    const name = [event.target.name];
    const profile = this.state.profile;
    profile[name] = event.target.value;
    this.setState({
      profile,
      loaded: 0,
    });
  };

  render() {
    const { profile } = this.state;
    return (
      <div>
        <div style={{ display: this.props.styles }}>
          <br />
          <h3>Profile</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={this.handleChange}
                value={profile.firstName}
                id="firstName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                onChange={this.handleChange}
                value={profile.lastName}
                id="lastName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={this.handleChange}
                value={profile.phone}
                id="phone"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="custom-file">
              <input
                type="file"
                name="image"
                onChange={this.handleImageChange}
                className="form-control"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
            <button type="submit" className="btn btn-success my-2">
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
