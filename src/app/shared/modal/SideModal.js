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
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    left: '25%',
    top: 5
  },
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
  const classes = useStyles();
  const { open, handleClose, title, children, actionButton } = props;

  return (
    <div>
      <Dialog classes={{ paper: classes.dialog }} fullScreen style={{ width: "80%" }} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className="flex w-full" justify='space-between'>
              <Grid container spacing={3} justifyContent='space-between' style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <Grid item align='left'>
                  <Typography variant="h6" color="inherit">
                    {title}
                  </Typography>
                </Grid>
                <Grid item align='right'>
                  <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <DialogContent>
            { children }
          </DialogContent>
          <DialogActions justifyContent="center" align="center">
            {actionButton && <Button onClick={actionButton} color="primary">
              Close
            </Button>}
          </DialogActions>
      </Dialog>
    </div>
  );
}
export default SideModal;