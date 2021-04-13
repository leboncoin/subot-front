import {
  POST_LABEL_START,
  POST_LABEL_END,
  GET_LABELS_START,
  GET_LABELS_END
} from '../types/labels';

/*
 * action creators
 */

export function postLabel(label) {
  return {type: POST_LABEL_START, label}
}

export function postedLabel() {
  return {
    type: POST_LABEL_END,
  };
}
export function deleteLabel(label) {
  return {type: POST_LABEL_START, label}
}

export function deletedLabel() {
  return {
    type: POST_LABEL_END,
  };
}

export function getLabels() {
  return {type: GET_LABELS_START}
}

export function gotLabels(json) {
  return {
    type: GET_LABELS_END,
    labels: json
  };
}

