import React from 'react';
import PropTypes from 'prop-types'
import Donut from '../elements/donut';
import MessagesTable from '../../containers/elements/messages_table';
import Stat from '../elements/stat_tile'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import * as _ from "lodash";
import clsx from "clsx";

const colors = [
  "yellow",
  "green",
  "blue",
  "red",
  "lightgrey",
  "aliceblue",
  "lightgreen",
  "black",
  "brown"
];

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
  responseTime: {
    height: 95
  },
  control: {
    padding: theme.spacing(2),
  },
  dashboard: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  table: {
    marginTop: 10,
  },
  bigAvatar: {
    margin: 0,
    width: 95,
    height: 95,
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
  constructor(props) {
    super(props);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.initStatusDataSet = this.initStatusDataSet.bind(this);
    this.initToolsDataSet = this.initToolsDataSet.bind(this);

    this.state = {
      start: props.start,
      end: props.end,
      fix_rate: this.initStatusDataSet(props.messages),
      tool_rate: this.initToolsDataSet(props.messages)
    };
  }

  PropTypes = {
    firemen: PropTypes.string.isRequired,
    onPeriodChange: PropTypes.func.isRequired,
    resolutionTime: PropTypes.number.isRequired,
    responseTime: PropTypes.number.isRequired,
    loadingStats: PropTypes.bool
  };

  componentDidMount() {
    if (this.props.firemen.length === 0) {
      this.props.onPeriodChange(this.state.start, this.state.end)
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.messages.length > 0 && this.props !== prevProps) {
      this.setState({
        fix_rate: this.initStatusDataSet(this.props.messages),
        tool_rate: this.initToolsDataSet(this.props.messages)
      })
    }
  }

  handleStartChange(newStart) {
    let newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 7);
    this.props.onPeriodChange(newStart, newEnd.toISOString().slice(0, 10))
  }

  initStatusDataSet(messages) {
    let rate = _.reduce(messages, (acc, m) => {
      if (_.indexOf(acc['labels'], m.status) < 0) {
        acc['labels'].push(m.status);
        acc.datasets[0].data.push(1);
        return acc
      }
      acc.datasets[0].data[_.indexOf(acc.labels, m.status)] = acc.datasets[0].data[_.indexOf(acc.labels, m.status)] + 1;
      return acc
    }, {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
      }]
    });
    rate.datasets[0].backgroundColor[_.indexOf(rate.labels, "fixed")] = "#A5C151";
    rate.datasets[0].backgroundColor[_.indexOf(rate.labels, "unresponded")] = "#FF6384"; // RED
    rate.datasets[0].backgroundColor[_.indexOf(rate.labels, "unknown")] = "#36A2EB"; // BLUE
    rate.datasets[0].backgroundColor[_.indexOf(rate.labels, "acknowledged")] = "#FFCE56"; // YELLOW
    return rate
  }

  initToolsDataSet(messages) {
    const tools = _.flatten(_.pullAll(_.map(messages, "tools"), [null]));
    let rate = _.reduce(tools, (acc, l) => {
      if (_.indexOf(acc['labels'], l) < 0) {
        acc['labels'].push(l);
        acc.datasets[0].data.push(1);
        return acc;
      }
      acc.datasets[0].data[_.indexOf(acc.labels, l)] = acc.datasets[0].data[_.indexOf(acc.labels, l)] + 1;
      return acc;
    }, {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
      }]
    });
    _.map(rate.labels, (_l, i) => {
      rate.datasets[0].backgroundColor.push(colors[i])
    });
    return rate
  }

  render() {
    const {classes, firemen, loadingStats: loading, responseTime} = this.props;

    return (
      <div
        className={clsx(classes.dashboard, {
          [classes.contentShift]: this.props.menuOpen,
        })}
      >
        <Grid container justify="center" className={classes.root} spacing={1}>
          <Grid key={"fireman"} item md={3} xs={6}>
            <Stat loading={loading}>
              {
                firemen.length === 0 ?
                  [<Grid key={`graph-fireman`} item md={6} xs={12}>
                    <Avatar
                      className={classes.bigAvatar}
                      key={`no_fireman_avatar`}
                    />
                  </Grid>,
                    <Grid key={`name-fireman`} item md={6} xs={12}>
                      <Typography variant="h5" key={`no_fireman_name`} gutterBottom>
                        No fireman
                      </Typography>
                    </Grid>
                  ]
                  :
                  firemen.map(f => (
                    <Grid key={`grid-grid-fireman`} container direction="row" alignItems="center">
                      <Grid key={`graph-fireman`} item md={6} xs={12}>
                        <Avatar
                          className={classes.bigAvatar}
                          key={`${f.id}_avatar`}
                          src={f.profile.image_512}
                        />
                      </Grid>
                      <Grid key={`name-fireman`} item md={6} xs={12}>
                        <Typography variant="h5" key={`${f.id}_name`} gutterBottom>
                          {f.profile.real_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
              }
            </Stat>
          </Grid>
          <Donut
            loading={loading}
            data={this.state.fix_rate}
            legend={"Issue state"}
          />
          <Donut
            loading={loading}
            data={this.state.tool_rate}
            legend={"Tools"}
          />
          <Grid key={"response"} item md={3} xs={6}>
            <Stat loading={loading}>
              <Grid key={`response-grid`} container justify="center" direction="row" alignItems="center">
                <Grid key={`response-time-grid`} item md={5} xs={10}>
                  <Typography
                    key={"response_time"}
                    variant="h2"
                    className={classes.responseTime}
                  >
                    {responseTime ? responseTime : 0}
                    <Typography
                      key={"response_unit"}
                      variant="caption"
                      gutterBottom
                    >
                      min
                    </Typography>
                  </Typography>
                </Grid>
                <Grid key={`response-legend-grid`} item md={7} xs={12}>
                  < Typography
                    variant="h5"
                    key={"response_legend"}
                    gutterBottom
                  >
                    Response time
                  </Typography>
                </Grid>
              </Grid>
            </Stat>
          </Grid>
        </Grid>
        <div className={classes.table}>
          <MessagesTable messages={this.props.messages} loading={this.props.loadingStats}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
