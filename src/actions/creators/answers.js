import {
  POST_ANSWER_START,
  POST_ANSWER_END,
  GET_ANSWERS_START,
  GET_ANSWERS_END
} from '../types/answers';

/*
 * action creators
 */

export function postAnswer(answer) {
  return {type: POST_ANSWER_START, answer}
}

export function postedAnswer() {
  return {
    type: POST_ANSWER_END,
  };
}

export function getAnswers() {
  return {type: GET_ANSWERS_START}
}

export function gotAnswers(json) {
  return {
    type: GET_ANSWERS_END,
    answers: json
  };
}

export function deleteAnswer(answer) {
  return {type: POST_ANSWER_START, answer}
}

export function deletedAnswer() {
  return {
    type: POST_ANSWER_END,
  };
}


