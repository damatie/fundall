import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BlogSideAtrraction from './blogSideAttraction';
import * as blogActions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BlogTags from './blogTags';
import { Link } from 'react-router-dom';
import SectionHeader from '../sectionHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  paper: {
    padding: theme.spacing(2)
  },
  bgColor: {
    background: 'rgb(18, 18, 18)',
  },
  blogInfo: {
    marginLeft: 12,
  },
  blogTitle: {
    margin: '16px 0',
  },
  dFlex: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
}));

function Blog(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [clicked, setClicked] = React.useState(false);

  const handleLike = (id) => {
    setClicked(prevState => prevState = !prevState);
    dispatch(blogActions.likeAndUnlikeBlogPost(id));
  }

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.paper} variant="outlined">
          <SectionHeader
            fullName={props.blog.employees[0].firstName}
            updatedAt={props.blog.updatedAt}
            id={props.blog.id}
            buttonContent={['Edit post']}
          />
          <Link to={`/blog/blog_detail/${props.blog.id}`} style={{color: 'black'}}>
            <Typography variant="h5" className={classes.blogTitle}>{props.blog.title}</Typography>
          </Link>
          <div className={classes.dFlex}>
            {props.blog.tags && <BlogTags tags={props.blog.tags} />}
          </div>
          <div className={classes.dFlex}>
            <Button
              color={clicked ? 'secondary' : 'primary'}
              className={classes.button}
              startIcon={clicked ? <Favorite /> : <FavoriteBorder />}
              onClick={() => handleLike(props.blog.id)}
            >
              Like
            </Button>
            <Button
              color={'primary'}
              className={classes.button}
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => handleLike(props.blog.id)}
            >
              Comment
            </Button>
          </div>
        </Paper>
      </Grid>
      <BlogSideAtrraction />
    </Grid>
  )
}

export default Blog;
