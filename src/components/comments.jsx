import React, { Component } from "react";
import { getLoggedInUser } from "./user";
import axios from "axios";

class Comment extends Component {
  state = {
    user: {},
    comment: "",
    noo: null,
  };

  componentDidMount() {
    const user = getLoggedInUser();
    this.setState({
      user,
    });
  }
  handleSubmit = (e) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    e.preventDefault();
    const data = {
      body: this.state.comment,
      photo: this.props.album.id,
      user: this.state.user.user_id,
    };
    axios.post(`${REACT_APP_BASE_URL}/api/comment/`, data);
  };
  handleChange = (e) => {
    e.preventDefault();
    const comment = e.target.value;
    this.setState({
      comment,
    });
  };
  render() {
    const { comments } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
            placeholder="write a comment..."
            className="form-control"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
        <br />
        {comments.map((comment) => (
          <div className="jumbotron" key={comment.id}>
            <blockquote className="blockquote mb-0">
              <p className="badge badge-primary badge-bg">{comment.body}</p>
              <footer className="blockquote-footer">
                User {comment.user} on <cite title="Source Title"></cite>
              </footer>
            </blockquote>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Comment;
