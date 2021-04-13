import {
  POST_TEAM_MEMBER_START,
  POST_TEAM_MEMBER_END,
  GET_TEAM_MEMBERS_START,
  GET_TEAM_MEMBERS_END
} from '../types/team';

/*
 * action creators
 */

export function postTeamMember(teamMember) {
  return {type: POST_TEAM_MEMBER_START, teamMember}
}

export function postedTeamMember() {
  return {
    type: POST_TEAM_MEMBER_END,
  };
}

export function getTeams() {
  return {type: GET_TEAM_MEMBERS_START}
}

export function gotTeams(json) {
  return {
    type: GET_TEAM_MEMBERS_END,
    teamMembers: json
  };
}

export function deleteTeamMember(teamMember) {
  return {type: POST_TEAM_MEMBER_START, teamMember}
}

export function deletedTeamMember() {
  return {
    type: POST_TEAM_MEMBER_END,
  };
}
