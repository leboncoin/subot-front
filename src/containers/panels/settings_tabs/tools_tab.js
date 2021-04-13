import {connect} from 'react-redux'
import Main from "../../../components/elements/settings_tabs/tools_tab"
import {fetchTools, createNewTool, editTool, removeTool} from '../../../actions/tools'

const mapDispatchToProps = dispatch => {
  return {
    fetchTools: () => {
      return dispatch(fetchTools())
    },
    editTool: (id, tool) => {
      return dispatch(editTool(id, tool))
    },
    createTool: (id, regex) => {
      return dispatch(createNewTool(id, regex))
    },
    deleteTool: tool => {
      return dispatch(removeTool(tool))
    }
  }
};

const mapStateToProps = state => {
  return {
    tools: state.main.tools,
    loading: state.main.loading,
    userInfo: state.main.userInfo || {}
  }
};

const ToolsTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default ToolsTabContainer