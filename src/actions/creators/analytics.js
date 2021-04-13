import * as _ from 'lodash';
import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_END
} from '../types/analytics';


export function requestStatistics(start, end) {
  return {type: FETCH_STATISTICS_START, start, end}
}

export function receivedStatistics(json) {
  let {
    analytics: {
      firemen,
      messages,
      response_time
    }
  } = json;

  if (firemen === null)
    firemen = [];

  return {
    type: FETCH_STATISTICS_END,
    firemen,
    messages: _.filter(messages, m => _.includes(["message", "user"], m.type)),
    response_time: response_time
  };
}
