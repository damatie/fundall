import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BlogListContent from './content.blogList';
import * as blogActions from '../../store/actions';
import { useDispatch } from 'react-redux';

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
  content: {
    marginTop: 64,
    position: 'absolute',
    width: '100%',
  }
}));

function BlogListHeader(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, value) {
    setTabValue(value);
    if (tabValue === 4) dispatch(blogActions.getBlogPost());
  }

  // const week = props.post.filter(blog => {
  //   const weekAgo = new Date();
  //   weekAgo.setDate(weekAgo.getDate() - 7);
  //   new Date(blog.createdAt) >= weekAgo;
  // })

  // const month = props.post.filter(blog => {
  //   const monthAgo = new Date();
  //   monthAgo.setDate(monthAgo.getDate() - 30);
  //   new Date(blog.createdAt) >= monthAgo;
  // })

  // const year = props.post.filter(blog => {
  //   const yearAgo = new Date();
  //   yearAgo.setDate(yearAgo.getDate() - 365);
  //   new Date(blog.createdAt) >= yearAgo;
  // })

  const NoPost = () => {
    return (
      <>
        <h1>No Post to view here</h1>
      </>
    )
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
      {
        <div className={classes.content}>
          {tabValue === 0 && (
            props.posts ? <h1>loading...</h1> 
            : props.posts.map((blog, i) => <BlogListContent blog={blog} key={i} tags={props.tags} />)
          )}
					{tabValue === 1 && (
            week.length > 0 ? <NoPost /> 
            : week.map((blog, i) => <BlogListContent blog={blog} key={i} tags={props.tags} />)
          )}<h1>loading...</h1>
					{tabValue === 2 && (
            month.length > 0 ? <NoPost />
            : month.map((blog, i) => <BlogListContent blog={blog} key={i} tags={props.tags} />)
          )}
					{tabValue === 3 && (
            year.length > 0 ? <NoPost />
            : year.map((blog, i) => <BlogListContent blog={blog} key={i} tags={props.tags} />)
          )}
					{tabValue === 4 && (
            props.post > 0 ? <h1>loading...</h1>
            : props.post.map((blog, i) => <BlogListContent blog={blog} key={i} tags={props.tags} />)
          )}
        </div>
			}
    </div>
  )
}

export default BlogListHeader;
