import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import tools from "../../assets/tools.jpg";
import BtnLink from "../elements/btn_link";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    textAlign: "center",
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

class Main extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: this.props.menuOpen,
        })}
      >
        <div style={{height: "calc(100vh - 64px)", position: "relative", overflow: "hidden"}}>
          <div style={{paddingTop: "30vh", position: "relative", zIndex: 2}}>
            <Typography variant={"h2"}>Support analytics</Typography>
            <Typography style={{marginTop: 30}} variant={"h4"}>Explore, edit and manage configuration of the Subot program</Typography>
            <BtnLink style={{marginTop: 30}} variant="contained" color="primary" size="large" to="/support">View analytics</BtnLink>
          </div>
          <img style={{position: "absolute", left: 0, top: 0, width: "100%", height: "auto", opacity: 0.6}} src={tools}
               alt=""/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
