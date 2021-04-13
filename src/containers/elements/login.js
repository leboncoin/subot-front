import {connect} from 'react-redux'
import LoginButton from "../../components/elements/login"
import {fetchUserInfo, sendUserLogout} from "../../actions/login";

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchUserInfo())
    },
    logout: () => {
      dispatch(sendUserLogout())
    }
  }
};

const mapStateToProps = state => {
  return {
    logged: state.main.logged,
    userInfo: state.main.userInfo
  }
};

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer