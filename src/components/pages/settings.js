import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import Tabs from '../panels/tabs'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
});

class Settings extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: this.props.menuOpen,
        })}
      >
        <Tabs/>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
