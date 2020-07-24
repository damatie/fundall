import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import * as blogActions from '../store/actions';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AddCommentToPost from './comment_section/addCommentToPost';
import UserAvatar from '../userAvatar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BlogTags from './blogTags';
import { useDispatch, useSelector } from 'react-redux';
const theme = createMuiTheme();

theme.typography.h2 = {
  fontSize: '3.0rem',
  '@media (min-width:600px)': {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
};

theme.typography.body1 = {
  fontSize: '1.75rem',
  lineHeight: 2,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  sidePaper: {
    padding: theme.spacing(2),
    margin: '16px 0 16px 0',
  },
  sidePaperPadding: {
    padding: 12,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    justifyContent: 'center',
  },
  alignCenter: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  dFlex: {
    display: 'flex',
  },
}));

const user = {
  id: 1,
  fullName: 'Matthew Nte',
  time: 'Jul 16(19 hours ago)',
  title: '5 Tips for getting alert fatigue under control',
  tags: ['sports', 'discuss', 'funny'],
};

function BlogDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const blogPost = useSelector(state => state.blog.getBlogs.data);

  const [likes, setLikes] = useState(0);
  const [noOfComments] = useState(0);
  const id = +match.params.post_id;

  useEffect(() => {
    dispatch(blogActions.getOneBlogPost(id));
  }, []);

  const handleLikes = () => {
    setLikes(prevLike => prevLike + 1);
  };

  const currentBlogPost = blogPost.map((post) => {
    if (post.id === id) return post;
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={1}>
        <div className={classes.iconButton}>
          <div className={classes.alignCenter}>
            <IconButton aria-label="like" onClick={handleLikes} component="span">
              <FavoriteBorder />
            </IconButton>
            <Typography style={{textAlign: 'center'}}>{likes}</Typography>
          </div>
          <div className={classes.alignCenter}>
            <IconButton aria-label="like" component="span">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography style={{textAlign: 'center'}}>{noOfComments}</Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.paper} variant="outlined">
          <ThemeProvider theme={theme}>
            <Typography variant="h2">Creating a Reusable Grid System in React</Typography>
          </ThemeProvider>
          <BlogTags tags={user.tags} />
          <ThemeProvider theme={theme}>
            <Typography variant="body1" component='p'>
              { currentBlogPost[0].body }
            </Typography>
          </ThemeProvider>
        </Paper>
        <AddCommentToPost postId={match.params.post_id} comments={currentBlogPost[0].comment} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper className={classes.sidePaper} variant="outlined">
          <ThemeProvider theme={theme}>
            <UserAvatar fullName={user.fullName} />
          </ThemeProvider>
          <Typography varaint="body1" style={{lineHeight: 2}}>Front-end dev, loves learning things deeply, and eager about helping others</Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant='h6' className={classes.sidePaperPadding}>
            Related Posts
          </Typography>
          <Divider />
          <div className={classes.sidePaperPadding}>
            <UserAvatar
              title='The firebase tutorial of 2020: learn by example'
              tag={['firseTag', 'firestore', 'sometag']}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default BlogDetail;
