import Vue from "vue";
import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
});

const getAuthToken = () => localStorage.getItem("user-token");

const authInterceptor = (config) => {
  config.headers["Authorization"] = getAuthToken();
  return config;
};

// interceptor to catch errors
const errorInterceptor = (error) => {
  // check if it's a server error
  if (!error.response) {
    Vue.notify.warn("Network/Server error");
    return Promise.reject(error);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      Vue.notify.warn("Nothing to display", "Data Not Found");
      break;

    case 401: // authentication error, logout the user
      Vue.notify.warn("Please login again", "Session Expired");
      localStorage.removeItem("token");
      router.push("/auth");
      break;

    default:
      console.error(error.response.status, error.message);
      Vue.notify.error("Server Error");
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
};

httpClient.interceptors.response.use(
  authInterceptor,
  responseInterceptor,
  errorInterceptor
);

export default httpClient;
