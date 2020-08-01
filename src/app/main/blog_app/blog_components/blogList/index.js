import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as blogActions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const blogPost = useSelector(state => state.blog.getBlogs.data);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    dispatch(blogActions.getBlogPost());
  }, []);

  useEffect(() => {
    const dateBlogObj = {};
    if (blogPost.length > 0) {
      const blogPostCreatedAts = blogPost.map((e, i) => {
        const dateValue = new Date(e.createdAt).valueOf();
        dateBlogObj[dateValue] = i;
        return dateValue;
      }).sort().reverse();
      setSortedPosts(blogPostCreatedAts.map((e) => blogPost[dateBlogObj[e]]));
    }
  }, [blogPost])

  const tags = ['Games', 'Sports', 'JavaScript'];

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={8}>
        <Tabs posts={sortedPosts} tags={tags} />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.aSide}>
        <BlogSideAtrraction />
      </Grid>
    </Grid>
  )
}

export default BlogPostList;
