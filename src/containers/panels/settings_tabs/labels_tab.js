import {connect} from 'react-redux'
import Main from "../../../components/elements/settings_tabs/labels_tab"
import {fetchLabels, createNewLabel, editLabel, removeLabel} from '../../../actions/labels'

const mapDispatchToProps = dispatch => {
  return {
    fetchLabels: () => {
      return dispatch(fetchLabels())
    },
    editLabel: (id, label) => {
      return dispatch(editLabel(id, label))
    },
    createLabel: (id, regex) => {
      return dispatch(createNewLabel(id, regex))
    },
    deleteLabel: label => {
      return dispatch(removeLabel(label))
    }
  }
};

const mapStateToProps = state => {
  return {
    labels: state.main.labels || [],
    loading: state.main.loading,
    userInfo: state.main.userInfo || {}
  }
};

const LabelsTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default LabelsTabContainer