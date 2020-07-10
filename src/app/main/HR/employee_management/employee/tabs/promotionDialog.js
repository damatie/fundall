import React from 'react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

export default function FormDialog(props) {

  const handleClose = () => {
    // setOpen(false);
  };

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Promote Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <Formsy
            className="flex flex-col justify-center w-full"
          >
            <TextFieldFormsy
              className="mb-16"
              type="date"
              name="date"
              label="Date"
              value={currentDate()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      date
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              className="mb-16"
              type="text"
              name="position"
              label="Position"
              validations="isEmail"
              validationErrors={{
                isEmail: 'Please enter a valid email'
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              className="mb-16"
              type="lineManager"
              name="text"
              label="Line Manager"
              validations="isEmail"
              validationErrors={{
                isEmail: 'Please enter a valid email'
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          </Formsy>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Promote this employee
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
