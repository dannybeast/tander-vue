import { infrastructureMocks, infrastructureMethods } from "./Infrastructure";
import { authMocks, authMethods } from "./Auth";

const delay = 150;
const mocks = {
  ...authMocks,
  ...infrastructureMocks,
};

const apiCall = ({ url, data, method, id }) =>
  new Promise((resolve, reject) => {
    let params = {
      url,
      data,
      method,
      id,
      mocks,
      resolve,
      reject,
    };
    setTimeout(() => {
      try {
        authMethods(params);
        infrastructureMethods(params);
      } catch (err) {
        reject(new Error(err));
      }
    }, delay);
  });

export default apiCall;
