import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommentCard from './blogCommentCard';
import BlogCommentInput from './blogCommentInput';
import * as blogActions from '../../store/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
    margin: '16px 0',
  },
}))

function BlogComment(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  // const [comments, setComments] = useState(props.comments)

  const blogCommentCard = props.comments.map(comment => <CommentCard key={comment.id} comment={comment} />);

  const postId = props.postId;
  const handleSubmit = () => {
    const model = {postId, content};
    dispatch(blogActions.submitBlogComment(model));
  }

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography variant="h6" component='h2' style={{marginBottom: 12}}>
        Discussion
      </Typography>
      <BlogCommentInput onClick={() => handleSubmit()} onChange={value => setContent(value)} />
      {(props.comments.length > 0) && blogCommentCard}
    </Paper>
  )
}

export default BlogComment;
