import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import SalaryAdvanceHeader from './salaryAdvanceheader';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import SharedTable from 'app/shared/sharedTable';
import { useHistory } from 'react-router';
import SharedModal from 'app/shared/modal/SharedModal';
import getEmployeeName from 'utils/getEmployeeName';
import { formatToNaira } from 'utils/formatNumber';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import * as employeeActions from 'app/store/actions';
import LoanStatus from '../LoanStatus';
import moment from 'moment';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0',
		}
	}
});

const rows = [
	{
		id: 'amount',
		align: 'left',
		disablePadding: false,
		label: 'Amout requested',
    sort: true,
    field: 'amount'
  },
  {
		id: 'netSalary',
		align: 'left',
		disablePadding: false,
		label: 'Net salary',
    sort: true,
    field: 'netSalary'
  },
  {
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'status',
    sort: true,
    field: 'status'
  },
];

const handleDelete = () => {

};


function SalaryAdvanceTable() {
	const classes = useStyles();
  const dispatch = useDispatch();
	const salaryAdvanceLog = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvances);
	const employeeList = useSelector(({ employeeList }) => employeeList.employeeList);
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [loanDetails, setLoanDetails] = useState({});

  useEffect(() => {
		dispatch(Actions.getSalaryAdvance());
		dispatch(employeeActions.getAllEmployee());
  }, []);

  useEffect(() => {
    setData(salaryAdvanceLog.log)
	});

	const history = useHistory();
	
	const handleClick = n => {
		if(n.status === 'pending') {
			history.push(`/loan/request/salaryadvance_request/new/${n.id}`)
		} else {
			setLoanDetails(n);
			setOpen(true);
		}
	}

	const handleClose = () => setOpen(false);
  
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<SalaryAdvanceHeader />}
				content={<SharedTable data={data} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default'/>}
				innerScroll
			/>

			<SharedModal open={open} handleClose={handleClose} title={'Loan Details'}>
				<table className={clsx(classes.table, 'w-full text-justify')}>
					<tbody>
						<tr className="type">
							<th>Amount Requested</th>
							<td>{formatToNaira(loanDetails.amount)}</td>
						</tr>

						<tr className="size">
							<th>Net Salary</th>
							<td>{formatToNaira(loanDetails.netSalary)}</td>
						</tr>

						<tr className="created">
							<th>Date Requested</th>
							<td>{moment(loanDetails.createdAt).format('LLL')}</td>
						</tr>

						<tr className="created">
							<th>Director of support service</th>
							<td>{`${getEmployeeName(employeeList, loanDetails.supportDirector)} | (${(loanDetails.supportDirectorApprovalDate) ? moment(loanDetails.supportDirectorApprovalDate).format('LL') : 'Not approved yet' })`}</td>
						</tr>

						<tr className="created">
							<th>Finance Manager</th>
							<td>{`${getEmployeeName(employeeList, loanDetails.financeManager)} | (${(loanDetails.financeManagerApprovalDate) ? moment(loanDetails.financeManagerApprovalDate).format('LL') : 'Not approved yet' })`}</td>
						</tr>

						{loanDetails.status === 'rejected' ? 
						<tr className="created">
							<th>Comment</th>
							<td><div style={{
								wordWrap: "break-word",
								wordBreak: "break-all"
							}}>{loanDetails.comment}</div></td>
						</tr> : <></>}

						<tr className="created">
							<th>Status</th>
							<td><LoanStatus status={loanDetails.status}/></td>
						</tr>
					</tbody>
				</table>
			</SharedModal>
		</>
	);
}

export default withReducer('salaryAdvance', reducer)(SalaryAdvanceTable);
