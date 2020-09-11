// USER
export const AUTH_REQUEST_URL = () => `auth`;
export const USER_REQUEST_URL = () => `user`;

// INFRASTUCTURE
export const GET_INFRASTUCTURE_URL = () => `infrastructure`;
export const GET_BY_ID_INFRASTUCTURE_URL = (id) => `infrastructure/${id}`;
export const ADD_INFRASTUCTURE_URL = () => `infrastructure/add`;
export const UPDATE_INFRASTUCTURE_URL = (id) => `infrastructure/${id}`;
export const COPY_INFRASTUCTURE_URL = (id) => `infrastructure/copy/${id}`;
export const REMOVE_INFRASTUCTURE_URL = (id) => `infrastructure/${id}`;
export const GET_INFO_INFRASTUCTURE_URL = () => `infrastructure/info`;
export const APPROVE_INFRASTUCTURE_URL = () => `infrastructure/approve`;
