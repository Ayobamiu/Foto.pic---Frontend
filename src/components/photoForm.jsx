import React, { Component } from "react";
import { getLoggedInUser } from "./user";
import axios from "axios";
import NavBar from "./navBar";

class PhotoForm extends Component {
  state = {
    styles: "None",
    album: {
      details: "",
      image: null,
    },
  };
  handleClick = () => {
    if (!getLoggedInUser()) {
      window.location = "/exp";
    }
    const styles = this.state.styles;
    styles === "None"
      ? this.setState({ styles: "Block" })
      : this.setState({ styles: "None" });
  };

  handleImageChange = (event) => {
    const name = [event.target.name];
    const album = this.state.album;
    album[name] = event.target.files[0];
    this.setState({
      album,
      loaded: 0,
    });
  };
  handleChange = (event) => {
    const name = [event.target.name];
    const album = this.state.album;
    album[name] = event.target.value;
    this.setState({
      album,
      loaded: 0,
    });
  };

  handleSubmit = (e) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    e.preventDefault();

    const data = new FormData();
    const user = getLoggedInUser();
    data.append("image", this.state.album.image);
    data.append("details", this.state.album.details);
    data.append("user", user.user_id);

    axios.post(`${REACT_APP_BASE_URL}/api/photo/`, data, {}).then((res) => {
      window.location = "/";
    });
  };

  render() {
    const { handleSubmit, handleImageChange, handleChange } = this;
    const { album } = this.state;
    return (
      <React.Fragment>
        <NavBar/>
        <div className="jumbotron">
          <h3>Upload and share photos</h3>
          <p>Share awesome pictures with hundreds of Audience.</p>
          <button onClick={this.handleClick} className="btn btn-primary my-2">
            Add new photos
          </button>
          <div style={{ display: this.state.styles }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Details</label>
                <input
                  type="text"
                  className="form-control"
                  name="details"
                  onChange={handleChange}
                  value={album.details}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Leave some details about the picture.
                </small>
              </div>

              <div className="custom-file">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose file
                </label>
              </div>
              <button type="submit" className="btn btn-primary my-2">
                Upload
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PhotoForm;
