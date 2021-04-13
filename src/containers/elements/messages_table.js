import {connect} from 'react-redux'
import Messages from "../../components/elements/messages_table"
import {deleteMessage, updateMessage} from "../../actions/messages";

const mapDispatchToProps = dispatch => {
  return {
    updateMessage: (field, message) => {
      return dispatch(updateMessage(field, message))
    },
    deleteMessage: message => {
      return dispatch(deleteMessage(message))
    }
  }
};

const mapStateToProps = state => {
  return {
    messages: state.main.messages,
    loadingMessage: state.main.loadingMessage,
    tools: state.main.tools,
    labels: state.main.labels,
    userInfo: state.main.userInfo || {}
  }
};

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default MessagesContainer