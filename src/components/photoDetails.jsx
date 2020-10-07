import React, { Component } from "react";
import axios from "axios";
import Comment from "./comments";
import Rate from "./rate";
import NavBar from "./navBar";

class PhotoDetails extends Component {
  state = {
    styles: { display: "None" },
    album: {},
    comments: [],
  };

  async componentDidMount() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const id = this.props.match.params.id;

    const photUrl = `${REACT_APP_BASE_URL}/api/photo/${id}/`;
    const commentsUrl = `${REACT_APP_BASE_URL}/api/comment/`;
    const { data: album } = await axios.get(photUrl);
    const { data: allComments } = await axios.get(commentsUrl);

    const comments = allComments.filter(
      (comment) => comment.photo === album.id
    );

    this.setState({
      album,
      comments,
    });
  }
  render() {
    const { album, comments } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={album.image} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Album Details</h5>
                  <p className="card-text">{album.details}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                  <div
                    style={{
                      bottom: "10%",
                      right: "10%",
                      position: "absolute",
                    }}
                  >
                    <a
                      href={album.image}
                      className="fa fa-download"
                      download
                    ></a>
                    <i />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <span>Rate this photo</span>
          <hr />
          <Rate album={album} />
          <br />
          <h5>Comments</h5>
          <hr />
          <Comment album={album} comments={comments} />
        </div>
      </React.Fragment>
    );
  }
}

export default PhotoDetails;
