import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Moment from 'react-moment';
import RejectIcon from '@material-ui/icons/Cancel';
import ApproveIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import WidgetModal from './WidgetModal';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const TableWidget = (props) =>{
    const [open, setOpen] = useState(props.open);
    const classes = useStyles();
    const [selected, setSelected] = useState(props.selected);
    
    function CheckStatus(status){
        switch (status) {
            case "pending":
                return (
                    <Typography
                            className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "approved":
                return (
                    <Typography
                            className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "rejected":
                return (
                    <Typography
                            className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "reviewed":
                return (
                    <Typography
                            className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "completed":
                return (
                    <Typography
                            className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;

            default:
                return (
                    {status}
                )
                break;
        }
    }

    const handleClose = () => {
        setOpen(false);
      };
    
	return (
            <React.Fragment>
                <div>
                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Training Request Details</DialogTitle>
                    <DialogContent>
                    <table className={clsx(classes.table, 'w-full text-justify')}>
                        <tbody>
                            
                            <tr className="employee">
                                <th>Employee Name</th>
                                <td>{(selected.training) ? selected.training.employee.firstName+ ' '+selected.training.employee.lastName : ''}</td>
                            </tr>

                            <tr className="cost">
                                <th>Cost</th>
                                <td>{(selected.training) ? selected.training.trainingCourse.cost : ''}</td>
                            </tr>

                            <tr className="location">
                                <th>Location</th>
                                <td>{(selected.training) ? selected.training.trainingCourse.location : ''}</td>
                            </tr>

                            <tr className="cert">
                                <th>Certification</th>
                                <td>{((selected.training) ? selected.training.trainingCourse.certification : '') ? "Yes" : "No"}</td>
                            </tr>
                            
                            <tr className="duration">
                                <th>Duration</th>
                                <td>{(selected.training) ? selected.training.trainingCourse.duration : ''}</td>
                            </tr>

                            <tr className="catergory">
                                <th>Category</th>
                                <td>{(selected.training) ? selected.training.trainingCourse.category : ''}</td>
                            </tr>

                            <tr className="dept">
                                <th>Department</th>
                                <td>{(selected.training) ? selected.training.trainingCourse.department : ''}</td>
                            </tr>


                            <tr className="startDate">
                                <th>Training Starts</th>
                                <td>{ (selected.training) ? selected.training.startDate : '' } </td>
                            </tr>
                            <tr className="endDate">
                                <th>Training Ends</th>
                                <td>{(selected.training) ? selected.training.endDate : '' }</td>
                            </tr>

                            <tr className="created">
                                <th>Created</th>
                                <td>{ (selected.training) ? <Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{selected.training.createdAt}</Moment> : '' } </td>
                            </tr>
                            <tr className="updated">
                                <th>Updated</th>
                                <td>{(selected.training) ? <Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{selected.training.updatedAt}</Moment> : '' }</td>
                            </tr>
                        </tbody>
                    </table>
                        {((selected.training) ? (selected.training.status === 'pending' || selected.training.status === 'reviewed') : false && props.allowAuth) ? 
                            <Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
                                <Button className="bg-red text-white" 
                                startIcon={<RejectIcon />} onClick={ev => {props.handleReject(ev, selected.training.id); handleClose(); }} 
                                >
                                    Reject
                                </Button>
                                &nbsp;
                                <Button className="bg-green text-white" 
                                startIcon={<ApproveIcon />} onClick={ev => {props.handleApprove(ev, selected.training.id); handleClose(); }} 
                                >
                                    Approve
                                </Button>
                            </Grid>
                        : 
                            <Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
                                {(selected.training) ? CheckStatus(selected.training.status) : ''}
                            </Grid>
                    }
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

export default React.memo(TableWidget);