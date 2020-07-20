import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BlogCommentInput from './blogCommentInput';
import UserAvatar from '../../userAvatar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

theme.typography.body1 = {
  fontSize: '1.75rem',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  dFlex: {
    display: 'flex',
  },
  spaceBtw: {
    justifyContent: 'space-between',
  },
  commentBody: {
    margin: '16px 0',
  }
}));

function BlogComment(props) {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(true);

  const showReplyInput = (e) => {
    e.preventDefault();
    setShowInput(false)
  };

  return (
    <Paper variant="outlined" className={classes.paper}>
      <ThemeProvider theme={theme}>
        <UserAvatar fullName={props.comment.name} />
        <Typography varaint="body1" className={classes.commentBody}>{props.comment.content}</Typography>
      </ThemeProvider>
      {showInput ? <div className={`${classes.dFlex} ${classes.spaceBtw}`}>
        <div>
          <IconButton aria-label="like" component="span" style={{marginLeft: '-16px'}}>
            <FavoriteBorder />
          </IconButton>
          <Typography varaint="body1" component="span" className={classes.userName}>{props.comment.likes}</Typography>
        </div>
        <Button onClick={showReplyInput}>Reply</Button>
      </div> : <BlogCommentInput cancel="Cancel" onChange={value => setShowInput(value)} /> }
    </Paper>
  )
}

export default BlogComment;
