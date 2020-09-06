import axios from "axios";

// Инициализируем Axios
const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик access-token
const tokenInterceptor = (config) => {
  let token = localStorage.getItem("access-token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
};

// Перехватчик ошибок
const errorInterceptor = (error) => {
  if (!error.response) {
    return Promise.reject(error);
  }
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      break;

    case 401:
      localStorage.removeItem("access-token");
      router.push("/login");
      break;

    default:
      console.error(error.response.status, error.message);
  }
  return Promise.reject(error);
};

// Перехватчик ответов сервера
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

httpClient.interceptors.request.use(tokenInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
