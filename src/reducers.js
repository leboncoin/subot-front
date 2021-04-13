import {combineReducers} from 'redux'
import * as _ from 'lodash'
import {ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR} from './actions/types/notifs';
import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_END
} from './actions/types/analytics';
import {
  GET_TOOLS_END,
  GET_TOOLS_START
} from "./actions/types/tools";
import {
  GET_LABELS_END,
  GET_LABELS_START
} from "./actions/types/labels";
import moment from "moment";
import {
  GET_TEAM_MEMBERS_END,
  GET_TEAM_MEMBERS_START,
  DELETE_TEAM_MEMBER_START,
  DELETE_TEAM_MEMBER_END
} from "./actions/types/team";
import {
  DELETE_MESSAGE_START,
  DELETE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_START, UPDATE_MESSAGE_SUCCESS
} from "./actions/types/messages";
import {GET_ANSWERS_END, GET_ANSWERS_START} from "./actions/types/answers";
import {
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from "./actions/types/login";

const defaultState = {
  firemen: [],
  messages: [],
  start: moment().startOf("isoWeek").format("YYYY-MM-DD"),
  end: moment().endOf("isoWeek").format("YYYY-MM-DD"),
  tools: [],
  labels: [],
  notifications: [],
};

function mainReducer(state = defaultState, action) {
  const {
    start,
    end,
    firemen,
    messages,
    response_time,
    resolution_time,
    tools,
    labels,
    ts,
    field,
    message,
    answers,
    userInfo
  } = action;
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return Object.assign({}, state, {
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      });
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        notifications: state.notifications.map(notification => (
          (action.dismissAll || notification.key === action.key)
            ? {...notification, dismissed: true}
            : {...notification}
        )),
      });
    case REMOVE_SNACKBAR:
      return Object.assign({}, state, {
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      });
    case FETCH_STATISTICS_START:
      return Object.assign({}, state, {
        start,
        end,
        messages: [],
        firemen: [],
        loading: true,
        response_time: 0,
        resolution_time: 0
      });
    case FETCH_STATISTICS_END:
      return Object.assign({}, state, {
        firemen: _.uniqBy(firemen, "id"),
        messages,
        loading: false,
        response_time,
        resolution_time
      });
    case GET_TOOLS_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_TOOLS_END:
      return Object.assign({}, state, {
        tools,
        loading: false,
      });
    case GET_ANSWERS_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_ANSWERS_END:
      return Object.assign({}, state, {
        answers,
        loading: false,
      });
    case GET_LABELS_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_LABELS_END:
      return Object.assign({}, state, {
        labels,
        loading: false,
      });
    case GET_TEAM_MEMBERS_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_TEAM_MEMBERS_END:
      const {teamMembers} = action;
      return Object.assign({}, state, {
        teamMembers,
        loading: false,
      });
    case DELETE_TEAM_MEMBER_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case DELETE_TEAM_MEMBER_END:
      return Object.assign({}, state, {
        loading: false,
      });
    case DELETE_MESSAGE_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case DELETE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        messages: _.reject(state.messages, m => m.ts === ts)
      });
    case UPDATE_MESSAGE_START:
      return Object.assign({}, state, {
        loadingMessage: {
          ts,
          field,
          status: true
        },
      });
    case UPDATE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        loadingMessage: {
          status: false
        },
        messages: _.reduce(state.messages, (acc, m) => {
          if (m.ts === message.ts) {
            acc.push(message)
          } else {
            acc.push(m)
          }
          return acc
        }, [])
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        logged: true,
        userInfo
      });
    case GET_USER_ERROR:
      return Object.assign({}, state, {
        logged: false,
        userInfo: {}
      });
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        logged: false
      });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  main: mainReducer
});

export default rootReducer