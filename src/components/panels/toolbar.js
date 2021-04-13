import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DateSelector from '../../containers/elements/date_selector';
import PropTypes from "prop-types";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import LoginButton from "../../containers/elements/login"

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    display: "grow",
    color: "white"
  },
  button: {
    color: "white"
  },
});

class AppToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: props.start,
      end: props.end,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
  }

  PropTypes = {
    onMenuToggle: PropTypes.func.isRequired,
    menuToggled: PropTypes.bool,
    toggleMenu: PropTypes.func.isRequired,
  };

  handleStartChange(start, end) {
    this.props.onPeriodChange(start, end)
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.menuOpen,
          })}
        >
          <Toolbar>
            {!this.props.menuOpen &&
            <IconButton onClick={this.props.toggleMenu} edge="start" className={classes.menuButton} color="inherit"
                        aria-label="menu">
              <MenuIcon/>
            </IconButton>}
            <Typography variant="h6" className={classes.title}>
              {this.props.header}
            </Typography>
            <div className={classes.root}/>
            {this.props.displayCalendar && <div>
              <DateSelector
                onDateChange={this.handleStartChange}
              />
            </div>}
            <LoginButton/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppToolbar);
