import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SingleComment from '../comments/singleComment';
import CommentInput from '../comments/commentInput';
import UserAvatar from './userAvatar';
import ReplyComment from '../comments/replyComment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook'
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter'
import { useDispatch, useSelector } from 'react-redux';
import 'react-sharingbuttons/dist/main.css'
import { desSort } from 'app/shared/sortData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { useAuth } from 'app/hooks/useAuth';
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
  root: {
    marginTop: 16,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 24,
    }
  },
  img: {
    width: '100%',
    // height: '40vh',
  },
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  replyComment: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    },
    marginTop: theme.spacing(4),
  },
  side: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  sidePaper: {
    padding: theme.spacing(2),
    marginBottom: '16px',
  },
  sidePaperPadding: {
    padding: 12,
  },
  category: {
    margin: '16px 0',
  },
  title: {
    fontWeight: 'bold',
  },
  iconButton: {
    display: 'flex',
    position: 'fixed',
    width: '8.3%',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      flexDirection: 'row',
      marginTop: 16,
      background: '#fff',
      zIndex: 100,
      width: '100vw',
      margin: 0,
      borderTop: '1px solid rgba(0,0,0,.15)'
    }
  },
  alignCenter: {
    alignSelf: 'center',
    marginBottom: 16,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      margin: 0,
      padding: theme.spacing(1,1),
    }
  },
  iconValue: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  dFlex: {
    display: 'flex',
  },
  previousBtn: {
    marginBottom: 24,
    alignSelf: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
}));

const user = {
  tags: ['sports', 'discuss', 'funny'],
};

function BlogPostDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useAuth().getId;
  
  const blogPost = useSelector(({BlogPostDetail}) => BlogPostDetail.posts.post.postData);
  const author = useSelector(({BlogPostDetail}) => BlogPostDetail.posts.post.author);
  const comments = useSelector(({BlogPostDetail}) => BlogPostDetail.comments.data);

  const history = useHistory();

  const [commentState, setCommentState] = useState([]);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [content, setContent] = useState('');
  const [numberOflikedpost, setNumberOfLikedPost] = useState(0);

  const postId = match.params.post_id;
  const url = 'howmies.netlify.com';
  const shareText = 'Check out this post!';
  // 'window.location.href'

  const goToPreviousRoute = () => {
    window.location = '/main/blogs';
  }

  useEffect(() => {
    dispatch(Actions.getPostById(postId));
    dispatch(Actions.getPostComments(postId));
  }, [dispatch]);

  useEffect(() => {
    if(comments) {
      let sortedComments = comments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setCommentState(sortedComments);
    }
  }, [comments])

  useEffect(() => {
    if (blogPost) {
      if(blogPost.employees.length > 0) {
        const isLiked = blogPost.employees.every(employee => employee.id !== userId);
        if (!isLiked) setIsLikedPost(!isLiked);
      } 
    }
  }, [blogPost]);

  // set number of like when ever there is a changes in the blogpost store
  useEffect(() => {
    if(blogPost) {
      setNumberOfLikedPost(blogPost.employees.length);
    }
  }, [blogPost])

  const handleLikes = () => {
    setIsLikedPost(prevState => prevState = !prevState);
    isLikedPost ? setNumberOfLikedPost(prev => prev - 1) : setNumberOfLikedPost(prev => prev + 1);
    dispatch(Actions.likeAndUnlike(postId, userId));
  };

  const handleSubmit = () => {
    const model = {postId, content};
    dispatch(Actions.createComment(model));
    setContent('');
  }

  const getColor = () => !isLikedPost ? '#4d5760' : '#F44336';

  const buttonContent = ['Edit comment', 'Delete comment'];

  return (
    <>
      {blogPost === ''
        ? 'Loading...'
        : <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={1}>
              <div className={classes.iconButton}>
                <div className={classes.previousBtn}>
                  <IconButton aria-label="go back" component="span" onClick={goToPreviousRoute}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" onClick={() => handleLikes(blogPost.id)} style={{color: getColor()}} component="span">
                    {!isLikedPost ? <FavoriteBorder /> : <Favorite />}
                  </IconButton>
                  <Typography className={classes.iconValue}>{numberOflikedpost}</Typography>
                </div>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" component="span">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <Typography className={classes.iconValue}>{(comments) ? comments.length : 0}</Typography>
                </div>
                <div className={classes.alignCenter}>
							    <Facebook url={url} />
                </div>
                <div className={classes.alignCenter}>
                  <Twitter url={url} shareText={shareText} style={{bottomMargin: 16}} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={7} className={classes.paper}>
              <Paper variant="outlined" style={{marginBottom: 16}}>
                {(blogPost && blogPost.images.length > 0) && <img src={blogPost.images[0].url} alt="" className={classes.img}></img>}
                <div className={classes.paper}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h2" className={classes.title}>{blogPost && blogPost.title}</Typography>
                  </ThemeProvider>
                  <Typography variant="body1" component='p' className={classes.category}>
                    {(blogPost && blogPost.category !== null) && `Category: ${blogPost.category.name}`}
                  </Typography>
                  <ThemeProvider theme={theme}>
                    <Typography variant="body1" component='p'>
                      { blogPost && blogPost.body }
                    </Typography>
                  </ThemeProvider>
                </div>
              </Paper>
              <Paper className={classes.paper} variant="outlined">
                <Typography variant="h6" component='h2' style={{marginBottom: 12}}>
                  Discussion
                </Typography>
                <CommentInput
                  onClick={() => handleSubmit()}
                  value={content}
                  onChange={value => setContent(value)}
                />
                {(comments) && commentState.map((comment, index) => {
                  return (
                    <Paper variant="outlined" key={index} className={classes.replyComment}>
                      <SingleComment
                        comment={comment}
                        postId={postId}
                        moreContent={buttonContent}
                        btnContent='Reply'
                        userId={userId}
                      />
                      {comment.replyComment.length > 0 
                        && <ReplyComment reply={comment.replyComment} commentId={comment.id} postId={postId} />
                      }
                    </Paper>
                  )
                })}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.side}>
              <div style={{margin: '0 32px 0 0'}}>
                {(author) ? 
                <Paper className={classes.sidePaper} variant="outlined">
                  <ThemeProvider theme={theme}>
                    <UserAvatar fullName={`${author.firstName} ${author.lastName}`} userName={author.email} src={author.profilePicture}/>
                  </ThemeProvider>
                  <div>
                  </div>
                </Paper>
                 : <Paper></Paper>}
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

export default withReducer('BlogPostDetail', reducer)(BlogPostDetail);
