import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  btn: {
    background: red[500],
    margin: '0 1rem',
    color: '#fff',
  }
}));

const ProgressBtn = ({ success, loading, content, disable, onClick, color }, props) => {
  const classes = useStyles(props);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        style={{ padding: "1em" }}
        color={!color ? "primary" : color}
        className={color === 'red' ? `${classes.btn} w-full` : 'w-full'}
        disabled={loading || disable}
        onClick={onClick}
        type='submit'
      >
        {content}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

export default ProgressBtn;