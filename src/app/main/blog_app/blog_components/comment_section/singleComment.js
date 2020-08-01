import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentInput from './commentInput';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SectionHeader from '../../sectionHeader';
import * as blogActions from '../../store/actions';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const theme = createMuiTheme();

theme.typography.body1 = {
  fontSize: '1.75rem',
};

const useStyles = makeStyles((theme) => ({
  dFlex: {
    display: 'flex',
  },
  spaceBtw: {
    justifyContent: 'space-between',
  },
  commentBody: {
    margin: '12px 0',
  }
}));

function BlogComment(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(true);
  const [content, setContent] = useState(props.comment.content);
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(props.comment.commentLike);
  const [value, setValue] = useState('');

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
    setShowInput(true);
    const model = {commentId: props.comment.id, content};
    dispatch(blogActions.submitBlogCommentReply(model));
  }

  const handleCommentEdit = () => {
    const model = {id: props.comment.id, content};
    dispatch(blogActions.updateAComment(model));
    setOpen(false);
  }

  const handleEditReply = () => {
    const model = {id: props.comment.id, commentId: props.commentId, content};
    dispatch(blogActions.updateACommentReply(model));
    setOpen(false);
  }

  const checkForMethodToCall = () => {
    if (value === 'Edit comment') handleCommentEdit();
    else handleEditReply();
  }

  const handleCommentDelete = () => {
    dispatch(blogActions.deleteComment(props.comment.id));
  }

  const handleDeleteReply = () => {
    console.log(props.comment.id);
    dispatch(blogActions.deleteCommentReply(props.comment.id));
  }

  const selectClickedButton = (value) => {
    switch(value) {
      case 'Delete comment':
        handleCommentDelete();
        break;
      case 'Delete reply':
        handleDeleteReply();
        break;
      default:
        setValue(value);
        setOpen(true);
    }
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleLikes = () => {
    props.onClick(!props.isLiked);
    props.isLiked ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1);
    dispatch(blogActions.likeAComment(props.comment.id));
  };

  const getColor = () => !props.isLiked ? '#4d5760' : '#F44336';

  return (
    <>
      <ThemeProvider theme={theme}>
        <SectionHeader
          fullName={!props.comment.employee ? 'George Ole' : `${props.comment.employee.lastName} ${props.comment.employee.firstName}`}
          buttonContent={props.moreContent}
          onClick={(value) => selectClickedButton(value)}
        />
        <Typography varaint="body1" className={classes.commentBody}>{props.comment && props.comment.content}</Typography>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Update comment"
            value={content}
            type="text"
            fullWidth
            onChange={event => setContent(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={checkForMethodToCall} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {showInput
        ? <div className={`${classes.dFlex} ${classes.spaceBtw}`}>
            <div>
              <IconButton aria-label="like" onClick={handleLikes} style={{color: getColor()}} component="span">
                {props.isliked && (!props.isliked ? <FavoriteBorder /> : <Favorite />)}
              </IconButton>
              <Typography varaint="body1" component="span" className={classes.userName}>
                {props.comment.commentLike && likes.length}
              </Typography>
            </div>
            <Button onClick={showReplyInput}>Reply</Button>
          </div> 
        : <CommentInput
            cancel="Cancel"
            onClick={() => handleSubmitReply()}
            onChange={value => handleChange(value)}
          />
      }
    </>
  )
}

export default BlogComment;
