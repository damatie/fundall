import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import * as blogActions from '../store/actions';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SingleComment from './comment_section/singleComment';
import CommentInput from './comment_section/commentInput';
import UserAvatar from '../userAvatar';
import ReplyComment from './comment_section/replyComment';
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
  replyComment: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    },
    marginTop: theme.spacing(4),
  },
  sidePaper: {
    padding: theme.spacing(2),
    marginBottom: '16px',
  },
  sidePaperPadding: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      marginTop: 16,
      // position: 'absolute'
    }
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
  tags: ['sports', 'discuss', 'funny'],
};

function BlogDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const blogPost = useSelector(state => state.blog.getOneBlogPost.data);
  const comments = useSelector(state => state.blog.getAllCommentsForAPost.data);

  const [likes, setLikes] = useState(0);
  const [clicked, setClicked] = React.useState(false);
  const [content, setContent] = useState('');

  const postId = match.params.post_id;

  useEffect(() => {
    dispatch(blogActions.getOneBlogPost(postId));
    dispatch(blogActions.getAllCommentsForAPost(postId));
  }, []);

  const handleLikes = () => {
    setClicked(prevState => prevState = !prevState);
    !clicked ? setLikes(prev => prev + 1) : setLikes(prev => prev - 1);
    dispatch(blogActions.likeAndUnlikeBlogPost(postId));
  };

  const handleSubmit = () => {
    const model = {postId, content};
    dispatch(blogActions.submitBlogComment(model));
    setContent('');
  }

  const getColor = () => !clicked ? '#4d5760' : '#F44336';

  return (
    <>
      {(blogPost.length === 0 || comments === 0)
        ? 'Loading...'
        : <Grid container spacing={1} style={{marginTop: 16}}>
            <Grid item xs={12} sm={1}>
              <div className={classes.iconButton}>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" onClick={handleLikes} style={{color: getColor()}} component="span">
                    {!clicked ? <FavoriteBorder /> : <Favorite />}
                  </IconButton>
                  <Typography style={{textAlign: 'center'}}>{likes}</Typography>
                </div>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" component="span">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <Typography style={{textAlign: 'center'}}>{comments.length}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.paper} variant="outlined">
                <ThemeProvider theme={theme}>
                  <Typography variant="h2" className={classes.title}>{blogPost.title}</Typography>
                </ThemeProvider>
                <BlogTags tags={user.tags} />
                <ThemeProvider theme={theme}>
                  <Typography variant="body1" component='p'>
                    { blogPost && blogPost.body }
                  </Typography>
                </ThemeProvider>
              </Paper>
              <Paper className={classes.paper} variant="outlined">
                <Typography variant="h6" component='h2' style={{marginBottom: 12}}>
                  Discussion
                </Typography>
                <CommentInput onClick={() => handleSubmit()} onChange={value => setContent(value)} />
                {(comments.length > 0) && comments.map((comment) => {
                  return (
                    <Paper variant="outlined" key={comment.id} className={classes.replyComment}>
                      <SingleComment comment={comment} postId={postId} />
                      <ReplyComment reply={comment.replyComment} postId={postId} />
                    </Paper>
                  )
                })}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div style={{margin: '0 32px 0 0'}}>
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
              </div>
            </Grid>
          </Grid>
      }
    </>
  )
}

export default BlogDetail;
