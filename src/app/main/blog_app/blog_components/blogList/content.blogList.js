import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import * as blogActions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BlogTags from '../blogTags';
import { Link } from 'react-router-dom';
import SectionHeader from '../../sectionHeader';
const theme = createMuiTheme();

theme.typography.h4 = {
  fontSize: '2.3rem',
  '@media (min-width:600px)': {
    fontSize: '3.0rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.3rem',
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  blogInfo: {
    marginLeft: 44,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
    },
  },
  blogTitle: {
    margin: '0 0 16px 0',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.87)'
  },
  dFlex: {
    display: 'flex'
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(0),
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

  const handleDelete = () => {
    dispatch(blogActions.deleteOneBlogPost(props.blog.id));
  }

  const getColor = () => !clicked ? '#4d5760' : '#F44336';

  return (
    <Paper className={classes.paper} variant="outlined">
      <SectionHeader
        fullName={props.blog.employees[0].firstName}
        updatedAt={props.blog.updatedAt}
        id={props.blog.id}
        buttonContent={['Edit post', 'Delete post']}
        onClick={() => handleDelete()}
      />
      <div className={classes.blogInfo}>
        <ThemeProvider theme={theme}>
          <Link to={`/blog/blog_detail/${props.blog.id}`} style={{textDecoration: 'none'}}>
            <Typography variant="h4" className={classes.blogTitle}>{props.blog.title}</Typography>
          </Link>
        </ThemeProvider>
        <div className={classes.dFlex}>
          {props.blog.tags && <BlogTags tags={props.blog.tags} />}
        </div>
        <div className={classes.dFlex}>
          <Button
            style={{color: getColor()}}
            className={classes.button}
            startIcon={clicked ? <Favorite /> : <FavoriteBorder />}
            onClick={() => handleLike(props.blog.id)}
          >
            Like
          </Button>
          <Button
            style={{color: '#4d5760'}}
            className={classes.button}
            startIcon={<ChatBubbleOutlineIcon />}
            // onClick={() => handleLike(props.blog.id)}
          >
            Comment
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default Blog;
