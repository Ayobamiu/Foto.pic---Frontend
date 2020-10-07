import jwtDecode from "jwt-decode";
import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export function getLoggedInUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getProfiles() {
  return axios.get(`${REACT_APP_BASE_URL}/api/profile/`);
}
