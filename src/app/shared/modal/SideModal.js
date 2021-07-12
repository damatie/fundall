import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function SideModal(props) {
  const { open, handleClose, title, children, actionButton } = props;

  return (
    <div>
      <Dialog fullScreen style={{ width: "80%" }} justify='left' open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="static">
            <Toolbar className="flex w-full">
              <Typography edge="start" variant="h6" color="inherit">
                {title}
              </Typography>
              <IconButton color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            { children }
          </DialogContent>
          <DialogActions justify="center" align="center">
            {actionButton && <Button onClick={actionButton} color="primary">
              Close
            </Button>}
          </DialogActions>
      </Dialog>
    </div>
  );
}
export default SideModal;