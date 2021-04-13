import {connect} from 'react-redux'
import Main from "../../components/pages/dashboard"
import {fetchStatistics} from '../../actions/analytics'
import {fetchTools} from "../../actions/tools";
import {fetchLabels} from "../../actions/labels";

const mapDispatchToProps = dispatch => {
  return {
    onPeriodChange: (start, end) => {
      dispatch(fetchStatistics(start, end));
      dispatch(fetchTools())
      dispatch(fetchLabels())
    }
  }
};

const mapStateToProps = state => {
  return {
    firemen: state.main.firemen,
    messages: state.main.messages,
    responseTime: state.main.response_time,
    responsePercentile: state.main.firemen,
    end: state.main.end,
    start: state.main.start,
    loadingStats: state.main.loading
  }
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer