import {BaseApiUrl as url} from '../globals'

import {
  postAnswer,
  postedAnswer,
  getAnswers,
  gotAnswers,
  deletedAnswer,
  deleteAnswer
} from "./creators/answers";

import {enqueueSnackbar} from './creators/notifs';

export function fetchAnswers() {
  return function (dispatch) {
    dispatch(getAnswers());
    return fetch(`${url}/v1/answers`)
      .then(response =>
        response.json().then(json => ({
            ok: response.ok,
            json
          })
        ))
      .then(({json, ok}) => {
        if (!ok) {
          dispatch(enqueueSnackbar({
            message: json.error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
              action: null
            },
          }));
          throw json.error
        }
        dispatch(gotAnswers(json))
      })
  }
}

export function createNewAnswer(answer) {
  return function (dispatch) {
    dispatch(postAnswer(answer));
    return fetch(`${url}/v1/admin/answers/new`, {
        method: 'POST',
        body: JSON.stringify(answer),
        redirect: 'follow',
        credentials: "include"
      }
    )
      .then(response =>
        response.json().then(json => ({
            ok: response.ok,
            json
          })
        ))
      .then(({json, ok}) => {
        if (!ok) {
          dispatch(enqueueSnackbar({
            message: json.error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
              action: null
            },
          }));
          throw json.error
        }
        dispatch(postedAnswer(json));
        dispatch(enqueueSnackbar({
          message: "Answer created",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchAnswers());
      })
  }
}

export function editAnswer(answer) {
  return function (dispatch) {
    dispatch(postAnswer(answer));
    return fetch(`${url}/v1/admin/answers/${answer.id}`, {
        method: 'PUT',
        body: JSON.stringify({...answer}),
        redirect: 'follow',
        credentials: "include"
      }
    )
      .then(response =>
        response.json().then(json => ({
            ok: response.ok,
            json
          })
        ))
      .then(({json, ok}) => {
        if (!ok) {
          dispatch(enqueueSnackbar({
            message: json.error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
              action: null
            },
          }));
          throw json.error
        }
        dispatch(postedAnswer(json));
        dispatch(enqueueSnackbar({
          message: "Answer updated",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchAnswers())
      })
  }
}

export function removeAnswer(answer) {
  return function (dispatch) {
    dispatch(deleteAnswer(answer));
    return fetch(`${url}/v1/admin/answers/${answer.id}`, {
      method: 'DELETE',
      redirect: 'follow',
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(json => {
            dispatch(enqueueSnackbar({
              message: json.error,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: "error",
                action: null
              },
            }));
            throw json.error
          })
        }
        dispatch(enqueueSnackbar({
          message: "Answer deleted",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(deletedAnswer());
        dispatch(fetchAnswers())
      })
  }
}

