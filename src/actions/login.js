import {BaseApiUrl as url} from '../globals'
import {getUserInfo, loggedOutUser, logoutUser, receivedUserInfo} from './creators/login'

export function fetchUserInfo(messageTs, tools) {
  return function (dispatch) {
    dispatch(getUserInfo());
    return fetch(`${url}/auth/userinfo`, {
        method: 'GET',
        credentials: "include"
      }
    )
      .then(
        response => response.json(),
      )
      .then(json =>
        dispatch(receivedUserInfo(json))
      )
      .catch(err => dispatch(receivedUserInfo(undefined, {error: err})))
  }
}

export function sendUserLogout(messageTs, tools) {
  return function (dispatch) {
    dispatch(logoutUser());
    return fetch(`${url}/auth/logout`, {
        method: 'GET',
        credentials: "include",
        mode: "cors"
      }
    )
      .then(
        response => response.json(),
      )
      .then(json =>
        dispatch(loggedOutUser())
      )
      .catch(err => dispatch(loggedOutUser({error: err})))
  }
}
