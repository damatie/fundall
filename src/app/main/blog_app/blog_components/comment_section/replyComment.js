import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SingleComment from './singleComment';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '16px 8px 0 16px',
    marginLeft: '24px',
    marginBottom: '16px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '12px',
    },
  },
  text: {color: 'grey', margin: '16px 0',},
}));

function ReplyComment(props) {
  const classes = useStyles();

  return (
    <>
      { props.reply.length !== 0 &&
        <>
          <Typography variant="body1" className={classes.text}>View more 1 comment(s)</Typography>
          { props.reply.map((reply) => {
            return (
              <Paper variant="outlined" key={reply.id} className={classes.paper}>
                <SingleComment comment={reply} postId={props.postId} />
                {/* <ReplyComment /> */}
              </Paper>
            )
          })}
        </>
      }
    </>
  )
}

export default ReplyComment;
