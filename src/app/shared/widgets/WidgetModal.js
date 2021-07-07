import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const WidgetModal = (props)  => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(props.open);
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // console.log(isOpen);
  };


  return (
    <React.Fragment>
        <div>
        <Dialog open={open} onClose={props.handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Document</DialogTitle>
            <DialogContent>
            <table className={clsx(classes.table, 'w-full text-justify')}>
                <tbody>
                    <tr className="type">
                        <th>Type</th>
                        <td>{props.item.docUrl}</td>
                    </tr>

                    <tr className="size">
                        <th>Size</th>
                        <td>{props.item.owner}</td>
                    </tr>

                    <tr className="location">
                        <th>Location</th>
                        <td><div style={{ 
                            wordWrap: "break-word",
                            wordBreak: "break-all" }}>{props.item.docUrl}</div></td>
                    </tr>

                    <tr className="owner">
                        <th>Owner</th>
                        <td>{props.item.uploaderName}</td>
                    </tr>

                    <tr className="modified">
                        <th>Modified</th>
                        <td>{props.item.dd}</td>
                    </tr>

                    <tr className="created">
                        <th>Created</th>
                        <td>{props.item.ood}</td>
                    </tr>
                </tbody>
            </table>
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

export default WidgetModal