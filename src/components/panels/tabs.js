import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BuildIcon from '@material-ui/icons/Build';
import LabelsIcon from '@material-ui/icons/LocalOffer';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TeamTab from "../../containers/panels/settings_tabs/team_tab";
import ToolsTab from "../../containers/panels/settings_tabs/tools_tab";
import LabelsTab from "../../containers/panels/settings_tabs/labels_tab";
import AnswersTab from "../../containers/panels/settings_tabs/answers_tab";
import MainTab from "../elements/settings_tabs/tab";


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  addButton: {
    position: 'relative',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  listSpacing: {
    margin: "20px 25% 80px",
    width: "60%"
  }
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Tools" icon={<BuildIcon/>} {...a11yProps(0)} />
          <Tab label="Labels" icon={<LabelsIcon/>} {...a11yProps(1)} />
          <Tab label="Answers" icon={<HelpIcon/>} {...a11yProps(2)} />
          <Tab label="Team members" icon={<PersonPinIcon/>} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel key="0" value={value} index={0}>
        <MainTab
          title={"Tools"}
          subtitle={"Add, edit or remove tools regexes"}
        >
          <ToolsTab/>
        </MainTab>
      </TabPanel>
      <TabPanel key="1" value={value} index={1}>
        <MainTab
          title={"Labels"}
          subtitle={"Add, edit or remove labels regexes"}
        >
          <LabelsTab/>
        </MainTab>
      </TabPanel>
      <TabPanel key="2" value={value} index={2}>
        <MainTab
          title={"Answers"}
          subtitle={"Manage answers to common questions or redirects to documentation"}
        >
          <AnswersTab/>
        </MainTab>
      </TabPanel>
      <TabPanel key="3" value={value} index={3}>
        <MainTab
          title={"Team members"}
          subtitle={"Add, edit or remove team members"}
        >
          <TeamTab/>
        </MainTab>
      </TabPanel>
    </div>
  );
}