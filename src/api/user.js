import axios from "axios";
import headerConfig from "./headerConfig";

// defining frequently used endpoints
let apiEndPoint = process.env.REACT_APP_NODE_API;

// defining all api calls that interact with the table
const userApi = {
  isUserAuth: async function () {
    let url = apiEndPoint + "auth";
    let result = axios.get(url, headerConfig.axiosConfig).then(response => {
      return response.data;
    });
    return result;
  },
  getCurrentUserDetails: async function () {
    let url = apiEndPoint + "user";
    let result = axios.get(url, headerConfig.axiosConfig).then(response => {
      return response.data;
    });
    return result;
  },
  signUpUser: async function ({ username, password, email }) {
    let url = apiEndPoint + "user/signup";
    let formData = { username, email, password };
    let result = axios.post(url, formData, headerConfig.axiosConfig).then(response => {
      return response.data;
    });
    return result;
  },
  signInUser: async function ({ username, password }) {
    let url = apiEndPoint + "user/signin";
    let formData = { username, password };
    let result = axios.post(url, formData, headerConfig.axiosConfig).then(response => {
      return response.data;
    });
    return result;
  }
};

export default userApi;
