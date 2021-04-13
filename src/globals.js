import * as _ from 'lodash';

const envMapping = {
  prd: {
    url: "https://analytics.example.com",
    dashboard: "https://es.example.com/_plugin/kibana/app/kibana#/dashboard/dashboard_id?embed=true&_g=",
    chan: "chan_id",
  },
  stg: {
    url: "https://analytics.stg.example.com",
    dashboard: "https://es.stg.example.com/_plugin/kibana/app/kibana#/dashboard/dashboard_id?embed=true&_g=",
    chan: "stg_chan_id",
  },
  local: {
    url: "http://localhost:8080",
    dashboard: "",
    chan: "test_chan_id",
  },
};

let env = process.env.REACT_APP_ENV || "local";

if (!_.has(envMapping, env)) {
  throw new Error(`Specified env is invalid : ${env} not in ${_.keys(envMapping)}`);
}

export const BaseSlackUrl = "https://slack.com/archives"
export const BaseApiUrl = envMapping[env].url;
export const DashboardUrl = envMapping[env].dashboard;
export const ChanId = envMapping[env].chan;
