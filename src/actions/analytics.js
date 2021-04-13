import * as qs from 'query-string';
import {BaseApiUrl as url} from '../globals'
import {requestStatistics, receivedStatistics} from "./creators/analytics";
import {enqueueSnackbar} from "./creators/notifs";

export function fetchStatistics(start, end) {
  return (dispatch) => {
    dispatch(requestStatistics(start, end));
    const args = qs.stringify({start, end});
    return fetch(`${url}/v1/analytics?${args}`)
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
        dispatch(receivedStatistics(json));
      })
  }
}
