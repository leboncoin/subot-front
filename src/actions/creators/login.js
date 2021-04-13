import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR, LOGOUT_USER_START, LOGOUT_USER_ERROR, LOGOUT_USER_SUCCESS,
} from '../types/login';

export function getUserInfo(field, ts) {
  return {type: GET_USER_START, field, ts}
}

export function receivedUserInfo(json, err) {
  if (err) {
    return {
      type: GET_USER_ERROR,
      error: err,
    };
  }

  if (json === undefined)
    return {type: GET_USER_ERROR};

  return {
    type: GET_USER_SUCCESS,
    userInfo: json
  };
}

export function logoutUser(field, ts) {
  return {type: LOGOUT_USER_START, field, ts}
}

export function loggedOutUser(json, err) {
  if (err) {
    return {
      type: LOGOUT_USER_ERROR,
      error: err,
    };
  }

  if (json === undefined)
    return {type: LOGOUT_USER_ERROR};

  return {
    type: LOGOUT_USER_SUCCESS,
    userInfo: json
  };
}
