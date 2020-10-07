import React, { Component } from "react";
import { getLoggedInUser } from "./user";
import axios from "axios";
import { Link } from "react-router-dom";

class MyPhotos extends Component {
  state = {
    albums: [],
    user: {},
  };

  async componentDidMount() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const user = getLoggedInUser();
    const { data: albums } = await axios.get(
      `${REACT_APP_BASE_URL}/api/photo`,
      { headers: { "Content-Type": "application/json" } }
    );

    this.setState({
      albums,
      user,
    });
  }

  handleDelete = (itemID) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    axios.delete(`${REACT_APP_BASE_URL}/api/photo/${itemID}/`);
  };
  render() {
    const { user_id } = this.state.user;
    const albums = this.state.albums;
    const myPhotos = albums.filter((album) => album.user === user_id);
    return (
      <div>
        {myPhotos.map((item) => (
          <div
            key={item.id}
            className="card mb-3"
            style={{ maxWidth: "540px" }}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={item.image}
                  className="rounded"
                  style={{ width: "100%" }}
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-title">Album details</p>
                  <p className="card-text">{item.details}</p>
                  <Link to={`/photo/${item.id}`}>
                    <i
                      style={{ color: "black" }}
                      className="fa fa-lg fa-angle-double-right centered"
                    ></i>
                  </Link>
                  <i
                    onClick={() => this.handleDelete(item.id)}
                    className="fa fa-trash bottom-right"
                    style={{ cursor: "pointer", color: "green" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MyPhotos;
