import {connect} from 'react-redux'
import Main from "../../components/panels/notifs"

const mapStateToProps = state => {
  return {
    errors: state.main.errors || []
  }
};

const NotifsContainer = connect(
  mapStateToProps,
  null
)(Main);

export default NotifsContainer