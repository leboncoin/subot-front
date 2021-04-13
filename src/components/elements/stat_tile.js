import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper/index';
import Grid from "@material-ui/core/Grid/index";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          {props.loading ? [
            <Skeleton
              key={`tile-skel-circle-${props.legend}`}
              variant="circle"
              width={95}
              height={95}
            />,
            <Skeleton
              key={`tile-skel-rect-${props.legend}`}
              variant="rect"
              width={80}
              height={30}
            />
          ] : props.children}
        </Grid>
      </Paper>
    </div>
  );
}