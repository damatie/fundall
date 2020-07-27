import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BlogCommentInput from './blogCommentInput';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SectionHeader from '../../sectionHeader';
import * as blogActions from '../../store/actions';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(true);
  const [content, setContent] = useState('');

  const showReplyInput = (e) => {
    e.preventDefault();
    setShowInput(false)
  };

  const handleChange = (value) => {
    if(value === true) {
      setShowInput(value)
    } else {
      setContent(value);
    }
  }

  const handleSubmitReply = () => {
    const model = {commentId: props.comment.id, content};
    dispatch(blogActions.submitBlogCommentReply(model));
  }

  const handleCommentDelete = () => {
    dispatch(blogActions.deleteComment(props.comment.id));
  }

  const buttonContent = ['Edit comment', 'Delete commemt'];

  return (
    <Paper variant="outlined" className={classes.paper}>
      <ThemeProvider theme={theme}>
        <SectionHeader fullName='Aviy Hosny' buttonContent={buttonContent} onClick={() => handleCommentDelete()} />
        <Typography varaint="body1" className={classes.commentBody}>{props.comment.content}</Typography>
      </ThemeProvider>
      {showInput
        ? <div className={`${classes.dFlex} ${classes.spaceBtw}`}>
            <div>
              <IconButton aria-label="like" component="span" style={{marginLeft: '-16px'}}>
                <FavoriteBorder />
              </IconButton>
              <Typography varaint="body1" component="span" className={classes.userName}>{props.comment.likes}</Typography>
            </div>
            <Button onClick={showReplyInput}>Reply</Button>
          </div> 
        : <BlogCommentInput
            cancel="Cancel"
            onClick={() => handleSubmitReply()}
            onChange={value => handleChange(value)}
          />
      }
    </Paper>
  )
}

export default BlogComment;
