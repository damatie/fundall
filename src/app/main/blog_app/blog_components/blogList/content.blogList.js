import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import * as blogActions from '../../store/actions';
import { useDispatch } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SectionHeader from '../../sectionHeader';
import { fetchHeaders } from 'app/shared/fetchHeaders';
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
    borderRadius: theme.spacing(.5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
    }
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
  tag: {
    display: 'inline-block',
    margin: '8px 8px 24px 0'
  },
}));

function Blog(props) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [clicked, setClicked] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const header = fetchHeaders();

  React.useEffect(() => {
    const isLiked = props.blog.employees.every(employee => employee.id !== props.userId);
    if (!isLiked) setClicked(!isLiked);
  }, [])

  React.useEffect(() => {
    fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/${props.userId}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
      user => {
				if(user.success === true) {
          setUserData(user.data);
				} else {
					console.log(user)
				}
			}
		)
		.catch(error => {
			console.log(error);
		});
	
  })

  const handleLike = (id) => {
    setClicked(prevState => prevState = !prevState);
    dispatch(blogActions.likeAndUnlikeBlogPost({id, employeeId: props.userId}));
  }

  const handleDelete = (value) => {
    if (value === 'Delete post') {
      dispatch(blogActions.deleteOneBlogPost(props.blog.id));
    }
  }

  const blogTags = () => props.tags.map((tag, i) => {
    return <Typography 
            key={i}
            variant="caption"
            className={classes.tag}
          >
            {`#${tag}`}
          </Typography>
  });

  const getColor = () => !clicked ? '#4d5760' : '#F44336';

  return (
    <Paper className={classes.paper} variant="outlined">
      <SectionHeader
        fullName={userData && `${userData.firstName} ${userData.lastName}`}
        updatedAt={props.blog.updatedAt}
        id={props.blog.id}
        buttonContent={['Edit post', 'Delete post']}
        onClick={(value) => handleDelete(value)}
        profilePicture={userData.profilePicture}
      />
      <div className={classes.blogInfo}>
        <ThemeProvider theme={theme}>
          <Link to={`/blog/blog_detail/${props.blog.id}`} style={{textDecoration: 'none'}}>
            <Typography variant="h4" className={classes.blogTitle}>{props.blog.title}</Typography>
          </Link>
        </ThemeProvider>
        <div className={classes.dFlex}>
          {blogTags()}
        </div>
        <div className={classes.dFlex}>
          <Button
            style={{color: getColor()}}
            className={classes.button}
            startIcon={!clicked && (props.blog) ? <FavoriteBorder /> : <Favorite />}
            onClick={() => handleLike(props.blog.id)}
          >
            {props.blog.employees && props.blog.employees.length}
          </Button>
          <Button
            style={{color: '#4d5760'}}
            className={classes.button}
            startIcon={<ChatBubbleOutlineIcon />}
          >
            { props.blog.comment && props.blog.comment.length }
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default Blog;
