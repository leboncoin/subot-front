import {
  POST_TOOL_START,
  POST_TOOL_END,
  GET_TOOLS_START,
  GET_TOOLS_END
} from '../types/tools';

/*
 * action creators
 */

export function postTool(tool) {
  return {type: POST_TOOL_START, tool}
}

export function postedTool() {
  return {
    type: POST_TOOL_END,
  };
}

export function deleteTool(tool) {
  return {type: POST_TOOL_START, tool}
}

export function deletedTool() {
  return {
    type: POST_TOOL_END,
  };
}

export function getTools() {
  return {type: GET_TOOLS_START}
}

export function gotTools(json) {
  return {
    type: GET_TOOLS_END,
    tools: json
  };
}

