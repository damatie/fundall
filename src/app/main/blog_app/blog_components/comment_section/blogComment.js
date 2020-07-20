import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommentCard from './blogCommentCard';
import BlogCommentInput from './blogCommentInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
    margin: '16px 0',
  },
}))

function BlogComment() {
  const classes = useStyles();
  const [commentLikes] = useState(6)

  const comments = [
    {
      id: 1,
      name: 'Aviy Hosny',
      content: "Wow! that's amazing Nagwan, thanks a lot I want to know more about npm,npx, yarn if you write about this it will be so nice",
      likes: commentLikes,
      commentReply: [
        { name: 'Replier Max', content: 'I just replier you' },
      ],
    }
  ];

  const blogCommentCard = comments.map(comment => <CommentCard key={comment.id} comment={comment} />);

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography variant="h6" component='h2' style={{marginBottom: 12}}>
        Discussion
      </Typography>
      <BlogCommentInput />
      {(comments.length > 0) && blogCommentCard}
    </Paper>
  )
}

export default BlogComment;
