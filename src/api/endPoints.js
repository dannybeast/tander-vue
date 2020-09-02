import httpClient from "./httpClient";
export default {
  AUTH_REQUEST: (email, password) =>
    httpClient.$post("/auth/login", { email, password }),
};
