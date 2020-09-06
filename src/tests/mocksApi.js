// Тест
const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
};

const apiCall = ({ url, data, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {

        switch(url){
          case 'user/me':
            resolve(data);
            console.log("response: ", data);
          default:
            resolve(mocks[url][method || "GET"]);
            console.log("response: ", mocks[url][method || "GET"]);
        }
        
          
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default apiCall;
