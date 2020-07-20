import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: theme.spacing(2)
  },
}));

function BlogSideAttraction() {
  const classes = useStyles();
  
  return (
    <>
      <Grid item xs={12} sm={3}>
        <Paper className={classes.paper}>Side attraction</Paper>
      </Grid>
    </>
  );
}

export default BlogSideAttraction;