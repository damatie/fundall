import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '8px 16px'
  },
}));

function BlogSideAttraction() {
  const classes = useStyles();
  
  return (
    <>
      <Paper variant="outlined">
        <Typography variant="h6" className={classes.paper}>Aside</Typography>
        <Divider />
        <div className={classes.paper}>
          <Typography variant="h6">Aside</Typography>
          <Typography variant="h6">Aside</Typography>
          <Typography variant="h6">Aside</Typography>
        </div>
      </Paper>
    </>
  );
}

export default BlogSideAttraction;