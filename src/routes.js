import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from "react";
import Home from './components/pages/home';
import Dashboard from './containers/pages/dashboard';
import Performances from './components/pages/performances';
import Settings from './components/pages/settings';
import Layout from "./components/panels/layout";

const Routes = [
  {
    title: "Home",
    path: "/",
    exact: true,
    icon: <HomeIcon/>,
    layout: (props) => <Layout {...props}/>,
    main: (props) => <Home {...props}/>
  },
  {
    title: "Support Dashboard",
    path: "/support",
    icon: <DashboardIcon/>,
    layout: (props) => <Layout {...props}/>,
    main: (props) => <Dashboard {...props}/>
  },
  {
    title: "Performances",
    path: "/performances",
    icon: <TimelineIcon/>,
    layout: (props) => <Layout {...props}/>,
    main: (props) => <Performances {...props}/>
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon/>,
    layout: (props) => <Layout {...props}/>,
    main: (props) => <Settings {...props}/>
  }
];

export default Routes;
