import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    flexGrow: 1,
  },
}));

function BlogListHeader() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>Posts</Typography>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        classes={classes.tabs}
        scrollButtons="auto"
        classes={{ root: 'w-250 h-16' }}
      >
        <Tab className="h-16 normal-case" style={{minWidth: 64 }} label="Feed" />
        <Tab className="h-16 normal-case" style={{minWidth: 64 }} label="Week" />
        <Tab className="h-16 normal-case" style={{minWidth: 64 }} label="Month" />
        <Tab className="h-16 normal-case" style={{minWidth: 64 }} label="Year" />
        <Tab className="h-16 normal-case" style={{minWidth: 64 }} label="Latest" />
      </Tabs>
    </div>
  )
}

export default BlogListHeader;
