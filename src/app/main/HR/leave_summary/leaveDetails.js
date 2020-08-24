import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import swal from 'sweetalert2';
import Axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import MenuItem from '@material-ui/core/MenuItem';
import ProgressBtn from 'app/shared/progressBtn';
import { useState } from 'react';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Status } from './leaveSummaryTable';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});


function LeaveDialog(props) {
	const dispatch = useDispatch();
  const eventDialog = useSelector(({ leaveSummary }) => leaveSummary.leaveSummary.summary)


	function CheckStatus(status) {
		switch (status) {
			case 'in progress':
				return (
					<Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
				);
				break;

			case 'approved':
				return (
					<Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
						{status}
					</Typography>
				);
				break;

			case 'rejected':
				return (
					<Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
				);
				break;
			case 'reviewed':
				return (
					<Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
						{status}
					</Typography>
				);
				break;
			case 'completed':
				return (
					<Typography className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
						{status}
					</Typography>
				);
				break;

			default:
				return { status };
				break;
		}
	}

  const classes = useStyles();
  
  const closeComposeDialog = () => {
    props.setOpen(false);
  }

	return (
		<Dialog open={props.open} onClose={closeComposeDialog} fullWidth maxWidth="xs" component="form">
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Leave Details
					</Typography>
				</Toolbar>
			</AppBar>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
								<table className={clsx(classes.table, 'w-full text-justify')}>
									<tbody>
									<tr className="cost">
										<th>Leave type</th>
										<td>{eventDialog.leaveType}</td>
									</tr>
                  
									<tr className="cert">
										<th>Leave Days</th>
										<td>{`${eventDialog.days} days`}</td>
									</tr>

									<tr className="catergory">
										<th>Start Date</th>
										<td>{moment(eventDialog.fromDate).format('LLL')}</td>
									</tr>

									<tr className="dept">
										<th>Return Date</th>
										<td>{moment(eventDialog.toDate).format('LLL')}</td>
									</tr>

									<tr className="deptHead">
										<th>Leave Allowance</th>
										<td>{(eventDialog.allowance) ? 'Yes' : 'No'}</td>
									</tr>

									<tr className="hrManager">
										<th>Leave Reason</th>
										<td>{eventDialog.leaveReason}</td>
									</tr>
									<tr className="created">
										<th>Backup Employee</th>
										<td>{eventDialog.backUpEmployeeName}</td>
									</tr>
									<tr className="updated">
										<th>Line Manager</th>
										<td>{eventDialog.lineManagerName}</td>
									</tr>

									<tr className="updated">
										<th>Status</th>
										<td><Status status={eventDialog.status}/></td>
									</tr>
								</tbody>
								</table>
				</DialogContent>
		</Dialog>
	);
}

export default LeaveDialog;
