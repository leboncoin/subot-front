import {BaseApiUrl as url} from '../globals'

import {
  postTool,
  postedTool,
  getTools,
  gotTools,
  deleteTool,
  deletedTool
} from './creators/tools';
import {enqueueSnackbar} from "./creators/notifs";

export function fetchTools() {
  return function (dispatch) {
    dispatch(getTools());
    return fetch(`${url}/v1/tools`, {
      method: 'GET',
      credentials: "include",
      redirect: 'follow',
    })
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
          dispatch(gotTools(json))
        }
      )
  }
}

export function createNewTool(tool, regex) {
  return function (dispatch) {
    dispatch(postTool(tool));
    return fetch(`${url}/v1/admin/tools/new`, {
        method: 'POST',
        body: JSON.stringify({name: tool, query: {regexp: {input: regex}}}),
        credentials: "include",
        redirect: 'follow',
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
        dispatch(postedTool(json));
        dispatch(enqueueSnackbar({
          message: "Tool created",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchTools())
      })
  }
}

export function editTool(id, tool) {
  return function (dispatch) {
    dispatch(postTool(tool));
    return fetch(`${url}/v1/admin/tools/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tool),
        credentials: "include",
        redirect: 'follow',
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
        dispatch(postedTool(json));
        dispatch(enqueueSnackbar({
          message: "Tool updated",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchTools())
      })
  }
}

export function removeTool(tool) {
  return function (dispatch) {
    dispatch(deleteTool(tool));
    return fetch(`${url}/v1/admin/tools/${tool.id}`, {
        method: 'DELETE',
        credentials: "include",
        redirect: 'follow',
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
          message: "Tool deleted",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(deletedTool());
        dispatch(fetchTools())
      })
  }
}
