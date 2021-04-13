import {connect} from 'react-redux'
import * as _ from 'lodash'
import AnswersTabComponent from "../../../components/elements/settings_tabs/answers_tab"
import {fetchAnswers, editAnswer, createNewAnswer, removeAnswer} from "../../../actions/answers";
import {fetchLabels} from "../../../actions/labels";
import {fetchTools} from "../../../actions/tools";

const mapDispatchToProps = dispatch => {
  return {
    fetchAnswers: () => {
      dispatch(fetchAnswers())
    },
    fetchTools: () => {
      dispatch(fetchTools())
    },
    fetchLabels: () => {
      dispatch(fetchLabels())
    },
    editAnswer: answer => {
      dispatch(editAnswer(answer))
    },
    createNewAnswer: answer => {
      return dispatch(createNewAnswer(answer))
    },
    deleteAnswer: answer => {
      dispatch(removeAnswer(answer))
    }
  }
};

const mapStateToProps = state => {
  return {
    answers: _.map(state.main.answers) || [],
    tools: _.map(state.main.tools) || [],
    labels: _.map(state.main.labels) || [],
    loading: state.main.loading,
    userInfo: state.main.userInfo || {}
  }
};

const AnswersTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersTabComponent);

export default AnswersTabContainer