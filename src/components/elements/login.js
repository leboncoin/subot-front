import Button from "@material-ui/core/Button";
import {BaseApiUrl} from "../../globals";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";


const useStyles = makeStyles((theme) => ({
  button: {
    color: "white"
  },
}));

export default function SimpleMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const origin = window.location.href

  useEffect(() => {
    props.fetchUserInfo()
  }, [props.logged]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (props.logged) {
    return [
      <Button
        classes={classes.button}
        aria-controls="logged-menu" aria-haspopup="true" onClick={handleClick}
      >
        {props.userInfo.name}
      </Button>,
      <Menu
        id="logged-menu"
        anchorEl={anchorEl}
        elevation={0}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            props.logout();
            handleClose()
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    ]
  }
  return (
    <Button
      classes={classes.button}
      onClick={() => window.location = `${BaseApiUrl}/auth/login?redirect_uri=${origin}`}>
      Login
    </Button>
  )
}
