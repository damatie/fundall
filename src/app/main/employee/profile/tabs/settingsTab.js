import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import RejectIcon from '@material-ui/icons/Cancel';
import ApproveIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import FormDialog from '../../../../shared/formDialog';
import StatusDialog from '../utils/dialog'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.transparent,
  },
}));

const subtitle = 'Please state your reason for quiting. We will get back to you as soon as possible.';
const title = 'Quit Job';

function SettingsTab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openStatusDialog, setOpenStatusDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleOpenStatusDialog = () => {
    setOpenStatusDialog(true);
  };

  // const handleQuitJobRequest = (value) => {
  //   dispatch(Actions.requestToQuitJob(value));
  // }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleOpenDialog}>
          <ListItemIcon>
            <WorkOffIcon color='error' />
          </ListItemIcon>
          <ListItemText className="text-red" primary="Apply to quit job" />
          <ListItemSecondaryAction>
          <Button
            className="bg-red text-white"
            style={{textTransform: 'none', fontSize: 12, padding: '.15rem .8rem'}}
            // startIcon={<RejectIcon />}
            onClick={handleOpenStatusDialog}
          >
            reject
          </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider />
      <FormDialog
        open={open}
        close={value => setOpen(value)}
        subtitle={subtitle}
        title={title}
        buttonValue='Quit'
        color='red'
        // requestQuit={value => handleQuitJobRequest(value)}  
      />
      <StatusDialog open={openStatusDialog} close={value => setOpenStatusDialog(value)} />
    </div>
  );
}

export default SettingsTab
