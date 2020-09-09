export const authMocks = {
  auth: { token: "This-is-a-mocked-token" },
};
export function authMethods({ url, data, method, id, mocks, resolve, reject }) {
  switch (`${url}|${method}`) {
    // Auth POST
    case "auth|POST":
      resolve(mocks.auth);
      console.log(`response ${method} - ${url}: `, mocks.auth);
      break;
    // User GET
    case "user|GET":
      resolve(data);
      console.log(`response ${method} - ${url}: `, data);
      break;
  }
}
