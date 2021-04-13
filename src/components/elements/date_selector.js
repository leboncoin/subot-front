import React from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import clsx from "clsx";
import {createStyles, withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LeftIcon from "@material-ui/icons/ArrowBackIos"
import RightIcon from "@material-ui/icons/ArrowForwardIos"

const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  button: {
    color: "white",
    cursor: "pointer"
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date(props.start);
    this.state = {
      date
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.formatWeekSelectLabel = this.formatWeekSelectLabel.bind(this);
    this.renderWrappedWeekDay = this.renderWrappedWeekDay.bind(this);
  }

  onDateChange(date) {
    this.setState({date: moment(date).startOf("isoWeek").format("YYYY-MM-DD")});
    this.props.onPeriodChange(
      moment(date).startOf("isoWeek").format("YYYY-MM-DD"),
      moment(date).endOf("isoWeek").format("YYYY-MM-DD")
    );
  }

  PropTypes = {
    date: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    onPeriodChange: PropTypes.func.isRequired
  };

  formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = moment(date);

    return dateClone && dateClone.isValid()
      ? `Week of ${dateClone.startOf('isoWeek').format("MMM Do")}`
      : invalidLabel;
  };

  renderWrappedWeekDay(date, selectedDate, dayInCurrentMonth) {
    const {classes} = this.props;
    let dateClone = moment(date);
    let selectedDateClone = moment(selectedDate);

    const start = moment(selectedDateClone).startOf('isoWeek');
    const end = moment(selectedDateClone).endOf('isoWeek');

    const dayIsBetween = dateClone.isBetween(start - 1, end);
    const isFirstDay = dateClone.isSame(start, "day");
    const isLastDay = dateClone.isSame(end, "day");

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {dateClone.format("D")} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const {classes} = this.props;
    const date = new Date(this.props.start);
    return [
      <IconButton
        className={classes.button}
        onClick={() => this.onDateChange(moment(date).subtract(7, "days"))}
      >
        <LeftIcon/>
      </IconButton>,
      <DatePicker
        id="date"
        className={classes.button}
        InputProps={{
          className: classes.button
        }}
        inputVariant={"outlined"}
        value={date}
        showTodayButton
        disableFuture
        onChange={this.onDateChange}
        renderDay={this.renderWrappedWeekDay}
        labelFunc={this.formatWeekSelectLabel}
      />,
      <IconButton
        className={classes.button}
        disabled={moment().isBefore(moment(date).add(7, "days"))}
        onClick={() => this.onDateChange(moment(date).add(7, "days" ))}
      >
        <RightIcon/>
      </IconButton>,
    ]
  }
}

export default withStyles(styles)(DateSelector);
