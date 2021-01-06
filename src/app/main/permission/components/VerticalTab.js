import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs({roles, handleChange, children, handleClick, index }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={index}
        onChange={handleClick}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
          roles.map((role, index) => (
            <Tab label={role.name} key={role.id} {...a11yProps(index)} onClick={handleChange(role)}/>
          ))
        }
      </Tabs>
      <section className='p-12'>
        { children }
      </section>
    </div>
  );
}
