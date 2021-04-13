import {connect} from 'react-redux'
import DateSelector from "../../components/elements/date_selector"
import {fetchStatistics} from "../../actions/analytics";

const mapDispatchToProps = dispatch => {
  return {
    onPeriodChange: (start, end) => {
      dispatch(fetchStatistics(start, end))
    }
  }
};

const mapStateToProps = state => {
  return {
    end: state.main.end,
    start: state.main.start,
  }
};

const DateSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelector);

export default DateSelectorContainer