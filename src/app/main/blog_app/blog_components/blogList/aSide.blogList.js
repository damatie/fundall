import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '16px',
  },
  header: {
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 8,
    fontWeight: 500,
  }
}));

function BlogSideAttraction() {
  const classes = useStyles();
  // const blogList = useSelector(state => state.blog.getBlogs.data);

  // const getTrendingBlogs = blogList.map(blog => )

  const trending = [
    {title: 'The productive app that understands you', category: 'product'},
    {title: 'Some awesome title: Just a second title', category: 'awesome'},
  ]

  const trendingBlogs = trending.map(blog => {
    return (
      <>
        <div className={classes.section}>
          <Typography variant="body1" component="h3" className={classes.title} style={{fontSize: 16}}>{blog.title}</Typography>
          <Typography variant="body1" style={{color: 'grey'}}>{blog.category}</Typography>
        </div>
        <Divider />
      </>
    )
  })
  
  return (
    <>
      <Paper variant="outlined">
        <Typography variant="h6" component="h2" className={`${classes.header} ${classes.section}`}>Trending</Typography>
        <Divider />
        {trendingBlogs}
      </Paper>
    </>
  );
}

export default BlogSideAttraction;