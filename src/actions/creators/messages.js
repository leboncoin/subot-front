import {
  UPDATE_MESSAGE_START,
  UPDATE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_START,
  DELETE_MESSAGE_SUCCESS,
} from '../types/messages';

export function postMessageUpdate(field, ts) {
  return {type: UPDATE_MESSAGE_START, field, ts}
}

export function postDeleteMessage() {
  return {type: DELETE_MESSAGE_START}
}

export function receivedMessageUpdate(message) {
  return {
    type: UPDATE_MESSAGE_SUCCESS,
    message
  };
}

export function receivedDeleteMessage(ts) {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    ts,
  };
}
