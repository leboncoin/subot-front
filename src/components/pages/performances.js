import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import Iframe from 'react-iframe'
import {DashboardUrl} from '../../globals';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    textAlign: "center",
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "calc(100vh - 64px)",
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

class Main extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: this.props.menuOpen,
        })}
      >
        <Iframe
          url={DashboardUrl}
          height="100%" width="100%"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
