import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Routes from '../../routes';
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
  },
});


function ListItemLink(props) {
  const { icon, primary, to, selected } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem selected={selected} button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchUserInfo()
  }

  render() {
    const {classes, userInfo} = this.props;
    const admin = userInfo.is_admin || false;

    return (
      <div>
        <Drawer
          open={this.props.open} onClose={this.props.onToggle}
          variant="persistent"
          anchor={"left"}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={() => this.props.onToggle(false)}
            onKeyDown={() => this.props.onToggle(false)}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={() => this.props.onToggle(false)}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider/>
            <List>
              {Routes.map(p => (
                <ListItemLink selected={this.props.active === p.path} primary={p.title} icon={p.icon} to={p.path} key={p.title}/>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);