import {connect} from 'react-redux'
import MenuPanel from "../../components/panels/menu"
import {fetchUserInfo} from "../../actions/login";

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchUserInfo())
    }
  }
};

const mapStateToProps = state => {
  return {
    logged: state.main.logged,
    userInfo: state.main.userInfo || {}
  }
};

const MenuPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPanel);

export default MenuPanelContainer