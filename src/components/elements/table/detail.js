import React from 'react';
import * as _ from 'lodash';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import {ListItemAvatar} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export default function DetailPanel(props) {
  return (
    <div style={{overflow: "auto", width: "75%", margin: "auto", maxHeight: 300}}>
      <List component="nav">
        {_.map(_.sortBy(props.replies, "ts"), (r, i) => [
          i > 0 ? <Divider variant="inset" component="li"/> : "",
          <ListItem key={r.ts} button>
            <ListItemAvatar>
              {r.user_info.profile.real_name === "" ?
                <Avatar/> :
                <Avatar alt={r.user_info.profile.real_name} src={r.user_info.profile.avatar32}/>}
            </ListItemAvatar>
            <ListItemText
              primary={<b>{r.user_info.profile.real_name}</b>}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body"
                    color="textPrimary"
                  >
                    {r.text}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ])}
      </List>
    </div>
  )
}