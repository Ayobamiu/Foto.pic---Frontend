import React, { Component } from "react";
import MyPhotos from "./myPhotos";
import MyLikedPhotos from "./myLikedPhotos";
import ProfileForm from "./profileForm";
import { getLoggedInUser } from "./user";
import NavBar from "./navBar";

class Profile extends Component {
  state = {
    myPhotoStyles: "None",
    likedPhotoStyles: "None",
    styles: "None",
    uploadClasses: "fa fa-caret-up",
    likePhotosClasses: "fa fa-caret-up",
  };

  render() {
    const { user_id } = getLoggedInUser();
    const profiles = this.props.profiles;
    const myProfile = profiles.filter((profile) => profile.user === user_id);
console.log(myProfile);
    return (
      <React.Fragment>
        <NavBar />

        {myProfile.map((profile) => (
          <div key={profile.user} className="profile">
            <div className="photo">
              <div className="frame">
                <img src={profile.image} alt="" />
              </div>
            </div>
            <div className="details">
              <p>First name: {profile.first_name}</p>
              <p>Last name: {profile.last_name}</p>
            </div>
            <i className="fa fa-lg fa-edit bottom-right"></i>
          </div>
        ))}
        <ProfileForm styles={this.state.styles} />
        <div className="profile-page">
          <summary>
            Your Uploads
            <hr />
            <details>
              <MyPhotos />
            </details>
          </summary>
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
