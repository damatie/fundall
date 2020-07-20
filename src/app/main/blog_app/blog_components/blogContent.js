import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BlogSideAtrraction from './blogSideAttraction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  bgColor: {
    background: 'rgb(18, 18, 18)',
  },
  blogInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  blogTitle: {
    margin: '16px 0',
  },
}));

function Blog(props) {
  const classes = useStyles();

  const blogTags = () => {
    let tags = '';
    props.blog.tags.map((tag) => tags += ` #${tag}`);
    return tags;
  }

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.paper} variant="outlined">
          <Avatar className={classes.bgColor}>MN</Avatar>
          <div className={classes.blogInfo}>
            <Typography variant="caption" component="h3">{props.blog.fullName}</Typography>
            <Typography variant="caption">{props.blog.time}</Typography>
            <Typography variant="h5" className={classes.blogTitle}>{props.blog.title}</Typography>
            <Typography variant="overline">{blogTags()}</Typography>
            <div style={{display: 'flex'}}>
              <div style={{marginLeft: -16}}>
                <IconButton aria-label="like" component="span">
                  <FavoriteBorder fontSize="small" />
                </IconButton>
                <Typography variant="caption" style={{alignSelf: 'center'}}>Love</Typography>
              </div>
              <div style={{marginLeft: 16}}>
                <IconButton aria-label="like" component="span">
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" style={{alignSelf: 'center'}}>Comment</Typography>
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
      <BlogSideAtrraction />
    </Grid>
  )
}

export default Blog;
