import React, { Component } from "react";
import axios from "axios";
import { getLoggedInUser } from "./user";

class Rate extends Component {
  state = {
    user: {},
    totalRating: "",
    rates: [],
  };
  async componentDidMount() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const { data: rates } = await axios.get(
      `${REACT_APP_BASE_URL}/api/rating/`
    );
    const user = getLoggedInUser();
    this.setState({
      user,
      rates,
    });
  }

  handleClick = async (id, value) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    let one = document.getElementById("one");
    let two = document.getElementById("two");
    let three = document.getElementById("three");
    let four = document.getElementById("four");
    let five = document.getElementById("five");

    one.style.color = "yellow";
    two.style.color = "yellow";
    three.style.color = "yellow";
    four.style.color = "yellow";
    five.style.color = "yellow";

    switch (id) {
      case "one":
        one.style.color = "red";
        break;
      case "two":
        one.style.color = "red";
        two.style.color = "red";
        break;
      case "three":
        one.style.color = "red";
        two.style.color = "red";
        three.style.color = "red";
        break;
      case "four":
        one.style.color = "red";
        two.style.color = "red";
        three.style.color = "red";
        four.style.color = "red";
        break;
      case "five":
        one.style.color = "red";
        two.style.color = "red";
        three.style.color = "red";
        four.style.color = "red";
        five.style.color = "red";
        break;
      default:
        break;
    }
    if (!this.state.user) {
      window.location = "/login";
    }
    const { data: rates } = await axios.get(
      `${REACT_APP_BASE_URL}/api/rating/`
    );
    const existing = rates.filter(
      (rate) =>
        rate.photo === this.props.album.id &&
        rate.user === this.state.user.user_id
    );
    if (existing.length > 0) {
      const maini = existing[0];
      axios.patch(`${REACT_APP_BASE_URL}/api/rating/${maini.id}/`, {
        value: value,
      });
    } else {
      const data = {
        value,
        photo: this.props.album.id,
        user: this.state.user.user_id,
      };
      axios.post(`${REACT_APP_BASE_URL}/api/rating/`, data);
    }
  };
  render() {
    const { rates } = this.state;
    const totalRating = rates.filter(
      (rate) => rate.photo === this.props.album.id
    );
    let allRatingValues = [];
    let count = 0;
    for (let index = 0; index < totalRating.length; index++) {
      allRatingValues.push(totalRating[index].value);
      count += totalRating[index].value;
    }
    const average = count / totalRating.length;

    return (
      <React.Fragment>
        <div className="type-one">
          <i
            id="one"
            onClick={() => this.handleClick("one", 1)}
            className="fa fa-star "
          ></i>
          <i
            id="two"
            onClick={() => this.handleClick("two", 2)}
            className="fa fa-star "
          ></i>
          <i
            id="three"
            onClick={() => this.handleClick("three", 3)}
            className="fa fa-star "
          ></i>
          <i
            id="four"
            onClick={() => this.handleClick("four", 4)}
            className="fa fa-star "
          ></i>
          <i
            id="five"
            onClick={() => this.handleClick("five", 5)}
            className="fa fa-star "
          ></i>
          <small>
            {" "}
            Average Rating of {average} in {totalRating.length} Rating(s)
          </small>
        </div>
      </React.Fragment>
    );
  }
}

export default Rate;
