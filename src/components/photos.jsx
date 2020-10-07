import React, { Component } from "react";
import axios from "axios";
import Photo from "./photo";

class Photos extends Component {
  state = {
    selectedFile: null,
    status: false,
    selectedAlbum: {},
    likedPhotos: [],
  };

  handleFavourite = (item, user) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

    if (!user) {
      window.location = "/login";
    } else {
      if (item.favourite.includes(user.user_id)) {
        const newFavourite = item.favourite.filter((i) => i !== user.user_id);
        if (newFavourite.length === 0) {
          delete item.favourite;
          axios.patch(`${REACT_APP_BASE_URL}/api/photo/${item.id}/`, {
            favourite: [],
          });
        } else {
          axios.patch(`${REACT_APP_BASE_URL}/api/photo/${item.id}/`, {
            favourite: newFavourite,
          });
        }
      } else {
        const newFavourite = [...item.favourite, user.user_id];
        axios.patch(`${REACT_APP_BASE_URL}/api/photo/${item.id}/`, {
          favourite: newFavourite,
        });
      }
      window.location.reload();
    }
  };

  render() {
    const { user, albums } = this.props;
    console.log(this.props);

    return (
      <div className="">
        <div className="photos">
          {albums.map((item) => (
            <Photo
              key={item.id}
              item={item}
              user={user}
              status={this.state.status}
              handleFavourite={this.handleFavourite}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Photos;
