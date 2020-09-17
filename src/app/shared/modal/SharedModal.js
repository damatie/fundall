import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const SharedModal = (props)  => {

  const { open, handleClose, title, children } = props;

  return (
    <React.Fragment>
      <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
        <AppBar position="static">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {title}
            </Typography>
          </Toolbar>
			  </AppBar>
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </React.Fragment>
  );
}

export default SharedModal