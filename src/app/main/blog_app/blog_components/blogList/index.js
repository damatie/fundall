import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BlogSideAtrraction from './aSide.blogList';
import Tabs from './tabs.blogList.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  aSide: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  }
}));

function BlogPostList() {
  const classes = useStyles();

  const tags = ['Games', 'Sports', 'JavaScript'];

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={8}>
        <Tabs tags={tags} />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.aSide}>
        <BlogSideAtrraction />
      </Grid>
    </Grid>
  )
}

export default BlogPostList;
