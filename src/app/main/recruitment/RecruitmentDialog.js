import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

function RecruitmentDialog(props) {

  const handleClose = () => {
    props.onClose(false);
  };

  const handleOpenUpdateDialog = () => {
    props.onUpdate(true);
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={props.transition && props.transition}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>{props.title}</span>
          {props.update &&
            <Button
            variant='contained'
            color="primary"
            className='rounded-6 text-11'
            style={{textTransform: 'none'}}
            startIcon={<EditIcon />}
            disableElevation
            onClick={handleOpenUpdateDialog}
          >
            {props.update}
          </Button>
          }
        </div>
      </DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default RecruitmentDialog
