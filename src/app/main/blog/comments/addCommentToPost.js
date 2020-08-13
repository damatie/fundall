import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommentCard from './blogCommentCard';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
    margin: '16px 0',
  },
  textarea: {
    border: 'solid grey',
    minHeight: 150,
    padding: theme.spacing(1),
    width: '100%',
    fontSize: 16,
  }
}))

function AddPostComment(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  // const [comments, setComments] = useState(props.comments)

  const blogCommentCard = props.comments.map(comment => <CommentCard key={comment.id} comment={comment} />);

  const postId = props.postId;
  const handleSubmit = () => {
    const model = {postId, content};
    dispatch(Actions.createComment(model));
  }

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography variant="h6" component='h2' style={{marginBottom: 12}}>
        Discussion
      </Typography>
      <textarea
        placeholder="Add to the discussion"
        value={props.value}
        onChange={event => setContent(event.target.value)}
        className={classes.textarea}
      />
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        { props.cancel && 
          <Button onClick={() => setContent(true)}>
            {props.cancel}
          </Button>
        }
        <ProgressBtn content='Submit' disabled={!content} onClick={() => handleSubmit} />
      </div>
      {(props.comments.length > 0) && blogCommentCard}
    </Paper>
  )
}

export default AddPostComment;
