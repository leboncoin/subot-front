import {connect} from 'react-redux'
import Main from "../../../components/elements/settings_tabs/team_tab"
import {addNewTeamMember, fetchTeams, removeTeamMember, updateTeamMember} from '../../../actions/team'

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: () => {
      dispatch(fetchTeams())
    },
    addTeamMember: config => {
      dispatch(addNewTeamMember(config))
    },
    deleteTeamMember: teamMember => {
      dispatch(removeTeamMember(teamMember))
    },
    editTeamMember: (id, teamMember) => {
      dispatch(updateTeamMember(id, teamMember))
    }
  }
};

const mapStateToProps = state => {
  return {
    teamMembers: state.main.teamMembers || [],
    loading: state.main.loading,
    userInfo: state.main.userInfo || {}
  }
};

const TeamTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default TeamTabContainer