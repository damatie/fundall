import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ProgressBtn from '../../../../shared/progressBtn';

const useStyles = makeStyles((theme) => ({
  textarea: {
      border: 'solid grey',
      minHeight: 150,
      padding: theme.spacing(1),
      width: '100%',
      fontSize: 16,
  },
}));

function BlogCommentInput(props) {
  const classes = useStyles();

  return (
    <>
      <textarea placeholder="Add to the discussion" className={classes.textarea} />
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        { props.cancel && 
          <Button onClick={() => props.onChange(true)}>
            {props.cancel}
          </Button>
        }
        <ProgressBtn content='Submit' />
      </div>
    </>
  )
}

export default BlogCommentInput;
