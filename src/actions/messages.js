import {BaseApiUrl as url} from '../globals'
import {postDeleteMessage, postMessageUpdate, receivedDeleteMessage, receivedMessageUpdate} from './creators/messages'
import {enqueueSnackbar} from "./creators/notifs";

export function updateMessage(field, message) {
  return function (dispatch) {
    dispatch(postMessageUpdate(field, message.ts));
    return fetch(`${url}/v1/admin/messages/${message.id}`, {
        method: 'PUT',
        body: JSON.stringify(message),
        credentials: "include"
      }
    ).then(response =>
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
        dispatch(receivedMessageUpdate(message))
        dispatch(enqueueSnackbar({
          message: `Message ${field} updated`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
      })
  }
}

export function deleteMessage(messageTs) {
  return (dispatch, state) => {
    dispatch(postDeleteMessage());
    return fetch(`${url}/v1/admin/messages/${messageTs}`, {
        method: 'DELETE',
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
          message: "Message deleted",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(receivedDeleteMessage(messageTs))
      })
  }
}
