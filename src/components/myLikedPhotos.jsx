import React, { Component } from "react";
import axios from "axios";
import { getLoggedInUser } from "./user";
import { Link } from "react-router-dom";

class MyLikedPhotos extends Component {
  state = {
    albums: [],
    likedPhotos: [],
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
      user,
      albums,
    });
  }
  render() {
    const { user, albums } = this.state;
    // user &&
    const likedByMe = albums.filter((item) =>
      item.favourite.includes(user.user_id)
    );

    return (
      <div>
        <h3>Favourite photos</h3>
        <div className="list-group">
          {likedByMe.map((item) => (
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
                    style={{ width: "100%", height: "100%" }}
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">{item.details}</p>
                    <Link to={`/photo/${item.id}`}>
                      <i
                        style={{ color: "black" }}
                        className="fa fa-lg fa-angle-double-right centered"
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MyLikedPhotos;
