import {BaseApiUrl as url} from '../globals'

import {
  postTeamMember,
  postedTeamMember,
  getTeams,
  gotTeams,
  deleteTeamMember,
  deletedTeamMember
} from './creators/team';
import {enqueueSnackbar} from "./creators/notifs";

export function fetchTeams() {
  return function (dispatch) {
    dispatch(getTeams());
    return fetch(`${url}/v1/team`)
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
        dispatch(gotTeams(json))
      })
  }
}

export function addNewTeamMember(teamMember) {
  return function (dispatch) {
    dispatch(postTeamMember(teamMember));
    return fetch(`${url}/v1/admin/team/new`, {
        method: 'POST',
        body: JSON.stringify({...teamMember}),
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
          dispatch(postedTeamMember(json));
          dispatch(enqueueSnackbar({
            message: "Team member created",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
              action: null
            },
          }));
          dispatch(fetchTeams())
        }
      )
  }
}

export function updateTeamMember(id, teamMember) {
  return function (dispatch) {
    dispatch(postTeamMember(teamMember));
    return fetch(`${url}/v1/admin/team/${id}`, {
        method: 'PUT',
        body: JSON.stringify(teamMember),
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
        dispatch(postedTeamMember(json));
        dispatch(enqueueSnackbar({
          message: "Team member updated",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(fetchTeams())
      })
  }
}

export function removeTeamMember(teamMember) {
  return function (dispatch) {
    dispatch(deleteTeamMember(teamMember));
    return fetch(`${url}/v1/admin/team/${teamMember.id}`, {
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
          message: "Team member deleted",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: null
          },
        }));
        dispatch(deletedTeamMember());
        dispatch(fetchTeams())
      })
  }
}
