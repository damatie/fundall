import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BlogListContent from './content.blogList';
import * as blogActions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

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

function BlogListHeader(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const blogPost = useSelector(state => state.blog.getBlogs.data);
  const userId = useSelector(state => state.auth.user.id);
  
  const [tabValue, setTabValue] = useState(0);
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

  function handleChangeTab(event, value) {
    setTabValue(value);
    if (tabValue === 4) dispatch(blogActions.getBlogPost());
  }

  const week = sortedPosts.filter(blog => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(blog.createdAt) >= weekAgo;
  })

  const month = sortedPosts.filter(blog => {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    return new Date(blog.createdAt) >= monthAgo;
  })

  const year = sortedPosts.filter(blog => {
    const yearAgo = new Date();
    yearAgo.setDate(yearAgo.getDate() - 365);
    return new Date(blog.createdAt) >= yearAgo;
  });

  const NoPost = () => {
    return (
      <>
        <h1>No Post to view here</h1>
      </>
    )
  }
  
  return (
    <>
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
      {
        <div className={classes.content}>
          {tabValue === 0 && (
            blogPost.map((blog, i) => <BlogListContent blog={blog} userId={userId} key={i} tags={props.tags} />)
          )}
          {tabValue === 1 && (
            blogPost.map((blog, i) => <BlogListContent blog={blog} userId={userId} key={i} tags={props.tags} />)
          )}
          {tabValue === 2 && (
            blogPost.map((blog, i) => <BlogListContent blog={blog} userId={userId} key={i} tags={props.tags} />)
          )}
          {tabValue === 3 && (
            blogPost.map((blog, i) => <BlogListContent blog={blog} userId={userId} key={i} tags={props.tags} />)
          )}
          {tabValue === 4 && (
            blogPost.map((blog, i) => <BlogListContent blog={blog} userId={userId} key={i} tags={props.tags} />)
          )}
        </div>
      }
    </>
  )
}

export default BlogListHeader;
