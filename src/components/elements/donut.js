import Stat from "./stat_tile";
import {Doughnut} from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";


export default function DonutTile(props) {
  return (
    <Grid key={`grid-${props.legend}`} item md={3} xs={6}>
      <Stat loading={props.loading}>
        <Grid key={`grid-grid-${props.legend}`} container direction="row" alignItems="center">
          <Grid key={`graph-${props.legend}`} item md={6} xs={12}>
            <Doughnut
              legend={{
                "display": false,
              }}
              data={props.data}
            />
          </Grid>
          <Grid key={`grid-legend-${props.legend}`} item md={6} xs={12}>
            <Typography
              key={`legend-${props.legend}`}
              variant="h5"
              gutterBottom
            >
              {props.legend}
            </Typography>
          </Grid>
        </Grid>
      </Stat>
    </Grid>
  )
}