import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

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
    width: '20%'
  },
}));

export default function VerticalTabs({roles, handleChange, children, handleClick, index, loading }) {
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
          loading ? (
            <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
          ) :
          roles.map((role, index) => (
            <Tab label={role.name} key={role.id} {...a11yProps(index)} onClick={handleChange(role)}/>
          ))
        }
      </Tabs>
      <section className='p-12 w-full'>
        { children }
      </section>
    </div>
  );
}
