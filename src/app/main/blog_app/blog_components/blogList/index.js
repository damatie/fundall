import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as blogActions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BlogListContent from './content.blogList';
import BlogSideAtrraction from './aSide.blogList';
import BlogListHeader from './header.blogList.js';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

function BlogPostList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const blogPost = useSelector(state => state.blog.getBlogs.data);

  useEffect(() => {
    dispatch(blogActions.getBlogPost());
  }, []);

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sm={9}>
        <BlogListHeader />
        { !blogPost ? 'loading...' : blogPost.map(blog => <BlogListContent blog={blog} key={blog.id} />) }
      </Grid>
      <Grid item xs={12} sm={3}>
        <BlogSideAtrraction />
      </Grid>
    </Grid>
  )
}

export default BlogPostList;
