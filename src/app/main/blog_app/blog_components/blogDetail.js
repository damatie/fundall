import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BlogComment from './comment_section/blogComment';
import UserAvatar from '../userAvatar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
  tag: {
    padding: '2px 8px',
    borderRadius: 4,
    display: 'inline-block',
    margin: '16px 8px 24px 0'
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

let textColor = '';

const generateRandomColors = () => {
  const rgb = [];
  rgb[0] = Math.round(Math.random() * 255);
  rgb[1] = Math.round(Math.random() * 255);
  rgb[2] = Math.round(Math.random() * 255);
  const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                    (parseInt(rgb[1]) * 587) +
                    (parseInt(rgb[2]) * 114)) / 1000);
  (brightness > 125) ? textColor = 'black' : textColor = 'white';
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

function BlogDetail() {
  const classes = useStyles();

  const [likes, setLikes] = useState(0);
  const [noOfComments] = useState(0);

  const handleLikes = () => {
    setLikes(prevLike => prevLike + 1);
  };

  const scrollToCommentField = () => {};

  const blogTags = () => user.tags.map((tag, i) => {
    // generateRandomColors()
    return <Typography 
            key={i}
            variant="caption"
            className={classes.tag}
            style={{background: generateRandomColors(), color: textColor}}
          >
            {`#${tag}`}
          </Typography>
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
            <IconButton aria-label="like" onClick={scrollToCommentField} component="span">
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
          {blogTags()}
          <ThemeProvider theme={theme}>
            <Typography variant="body1" component='p'>
              The grid system is arguably the most valuable layout tool for building websites. 
              Without it, responsive layouts would be, well, NOT responsive.
              I use React a lot, so I decided to create a grid system that I could reuse in my React apps. 
              It started as a personal tool, but as I got more use out of it, 
              I decided to release it for other devs to use.
              So I did. It's called React Tiny Grid, and it's a 12-column grid system that's pretty handy. 
              You can find it here.
              But today, we're going to rebuild it step-by-step, so you can follow along and see how it's built.
            </Typography>
          </ThemeProvider>
        </Paper>
        <BlogComment />
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
