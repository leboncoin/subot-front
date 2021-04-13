import {BaseApiUrl as url} from '../globals'

import {
  postLabel,
  postedLabel,
  getLabels,
  gotLabels,
  deleteLabel,
  deletedLabel
} from './creators/labels';
import {enqueueSnackbar} from "./creators/notifs";

export function fetchLabels() {
  return function (dispatch) {
    dispatch(getLabels());
    return fetch(`${url}/v1/labels`)
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
        dispatch(gotLabels(json))
      })
  }
}

export function createNewLabel(label, regex) {
  return function (dispatch) {
    dispatch(postLabel(label));
    return fetch(`${url}/v1/admin/labels/new`, {
        method: 'POST',
        body: JSON.stringify({name: label, query: {regexp: {input: regex}}}),
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
        dispatch(postedLabel(json));
        dispatch(enqueueSnackbar({
          message: "Label created",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchLabels())
      })
  }
}

export function editLabel(id, label) {
  return function (dispatch) {
    dispatch(postLabel(label));
    return fetch(`${url}/v1/admin/labels/${id}`, {
        method: 'PUT',
        body: JSON.stringify(label),
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
        dispatch(postedLabel(json));
        dispatch(enqueueSnackbar({
          message: "Label updated",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchLabels())
      })
  }
}

export function removeLabel(label) {
  return function (dispatch) {
    dispatch(deleteLabel(label));
    return fetch(`${url}/v1/admin/labels/${label.id}`, {
        method: 'DELETE',
        redirect: 'follow',
        credentials: "include"
      }
    )
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
          message: "Label deleted",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(deletedLabel());
        dispatch(fetchLabels())
      })
  }
}
