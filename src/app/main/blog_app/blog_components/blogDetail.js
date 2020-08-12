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
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BlogTags from './blogTags';
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook'
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter'
import { useDispatch, useSelector } from 'react-redux';
import 'react-sharingbuttons/dist/main.css'
import { desSort } from 'app/shared/sortData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
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
    }
  },
  img: {
    width: '100%',
    // height: '40vh',
  },
  paper: {
    padding: theme.spacing(3,4,4,4),
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
  title: {
    fontWeight: 'bold',
  },
  category: {
    margin: '16px 0',
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
  circular: {
    position: 'fixed',
    top: '50%',
    left: '40%',
    height: '100vh'
  },
}));

const user = {
  tags: ['sports', 'discuss', 'funny'],
};

function BlogDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [commentState, setCommentState] = useState([]);
  
  const blogPost = useSelector(state => state.blog.getOneBlogPost.data.postData);
  const author = useSelector(state => state.blog.getOneBlogPost.data.author);
  const comments = useSelector(state => state.blog.getAllCommentsForAPost.data);
  const userId = useSelector(state => state.auth.user.id);
  const loadingCommentToPost = useSelector(state => state.blog.commentToPost.loading);
  const showDialog = useSelector(state => state.blog.showEmployeeModal.show);

  const history = useHistory();

  const [isLikedPost, setIsLikedPost] = useState(false);
  const [content, setContent] = useState('');
  const [numberOflikedpost, setNumberOfLikedPost] = useState();

  const postId = match.params.post_id;
  const url = 'howmies.netlify.com';
  const shareText = 'Check out this post!';
  // 'window.location.href'

  const goToPreviousRoute = () => {
    history.push('/blog/list');
  }

  useEffect(() => {
    dispatch(blogActions.getOneBlogPost(postId));
    dispatch(blogActions.getAllCommentsForAPost(postId));
  }, []);

  useEffect(() => {
    setCommentState(desSort(comments));
  }, [comments])

  useEffect(() => {
    if (blogPost) {
      if(blogPost.employees.length > 0) {
        const isLiked = blogPost.employees.every(employee => employee.id !== userId);
        if (!isLiked) setIsLikedPost(!isLiked);
      } 
    }
  }, [blogPost]);

  useEffect(() => {
    if(blogPost) {
      setNumberOfLikedPost(blogPost.employees.length);
    }
  }, [blogPost])

  const handleInputChange = (value) => {
    setContent(value);
    dispatch(blogActions.showEmployeeDialog(value));
  }

  const handleLikes = () => {
    setIsLikedPost(prevState => prevState = !prevState);
    isLikedPost ? setNumberOfLikedPost(prev => prev - 1) : setNumberOfLikedPost(prev => prev + 1);
    dispatch(blogActions.likeAndUnlikeBlogPost({postId}));
  };

  const handleSubmit = () => {
    const model = {postId, content};
    dispatch(blogActions.submitBlogComment(model));
    setContent('');
  }

  const getColor = () => !isLikedPost ? '#4d5760' : '#F44336';

  const buttonContent = ['Edit comment', 'Delete comment'];

  return (
    <>
      {!blogPost ? (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={7}>
            <Skeleton variant="rect" animation="wave" height={250} style={{marginBottom: '16px' }} />
            <Skeleton variant="rect" height={300} style={{marginBottom: '16px' }} />
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      ) : <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={1}>
              <div className={classes.iconButton}>
                <div className={classes.previousBtn}>
                  <IconButton aria-label="go back" component="span" onClick={goToPreviousRoute}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" onClick={() => handleLikes()} style={{color: getColor()}} component="span">
                    {!isLikedPost ? <FavoriteBorder /> : <Favorite />}
                  </IconButton>
                  <Typography className={classes.iconValue}>{numberOflikedpost}</Typography>
                </div>
                <div className={classes.alignCenter}>
                  <IconButton aria-label="like" component="span">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <Typography className={classes.iconValue}>{comments.length}</Typography>
                </div>
                <div className={classes.alignCenter}>
							    <Facebook url={url} />
                </div>
                <div className={classes.alignCenter}>
                  <Twitter url={url} shareText={shareText} style={{bottomMargin: 16}} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper variant="outlined" className={classes.paper}>
                {blogPost.images.length > 0 && <img src={blogPost.images[0].url} alt="" className={classes.img}></img>}
                <ThemeProvider theme={theme}>
                  <Typography variant="h2" className={classes.title}>{blogPost && blogPost.title}</Typography>
                </ThemeProvider>
                <Typography variant="body1" className={classes.category}>Category: Business</Typography>
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
                <CommentInput
                  onClick={() => handleSubmit()}
                  value={content}
                  showDialog={showDialog}
                  onChange={value => handleInputChange(value)}
                />
                {(comments.length > 0) && commentState.map((comment, index) => {
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
              <div style={{display: `${loadingCommentToPost ? '' : 'none'}`}} >
                <CircularProgress color="primary" className={classes.circular} />
              </div>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.side}>
              <div style={{margin: '0 32px 0 0'}}>
                <Paper className={classes.sidePaper} variant="outlined">
                  <ThemeProvider theme={theme}>
                    <UserAvatar fullName={`${author.firstName} ${author.lastName}`} userName={author.email} src={author.profilePicture}/>
                  </ThemeProvider>
                  <div>
                  </div>
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
