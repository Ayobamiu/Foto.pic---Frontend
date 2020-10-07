import React, { Component } from "react";

class Photo extends Component {
  render() {
    const { item, user } = this.props;

    const classes = item.is_fav === true ? "fa fa-heart" : "fa fa-heart-o";
    return (
      <div>
        {
          <div className="item">
            <a href={`/photo/${item.id}`}>
              <img className="img_img" src={item.image} alt="" />
              <div className="img_description">
                <p>{item.details}</p>
              </div>
            </a>
          </div>
        }
      </div>
    );
  }
}

export default Photo;
