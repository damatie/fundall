import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
// import Checkbox from '@material-ui/core/Checkbox';
// import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import SharedTableHead from 'app/shared/sharedTableHead';
import * as Actions from '../store/actions';
import LoanStatus from '../LoanStatus';
import SharedModal from 'app/shared/modal/SharedModal';
import { makeStyles } from '@material-ui/core/styles';
import * as employeeActions from 'app/store/actions';
import getEmployeeName from 'utils/getEmployeeName';
import { formatToNaira } from 'utils/formatNumber';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import moment from 'moment';
import { confirmDisbursement } from '../store/actions';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0',
		}
	}
});

const rows = [
	{
		id: 'amount_requested',
		align: 'left',
		disablePadding: false,
		label: 'Amout requested',
		sort: true
	},
	// {
	// 	id: 'deductable_amount',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Deductable amount',
	// 	sort: true
	// },
	{
		id: 'duration',
		align: 'left',
		disablePadding: false,
		label: 'Duration',
		sort: true
	},
	{
		id: 'purpose',
		align: 'left',
		disablePadding: false,
		label: 'Purpose',
		sort: true
	},
	{
		id: 'status',
		align: 'right',
		disablePadding: false,
		label: 'Status',
		sort: true
	}
];

function LoanReqTable(props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const loanHistory = useSelector(({ loan }) => loan.loans);
	const employeeList = useSelector(({ employeeList }) => employeeList.employeeList);

	const history = useHistory();

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const [loanDetails, setLoanDetails] = useState({});
	const [open, setOpen] = useState(false);

	useEffect(() => {
		dispatch(Actions.getEmployeeLoanDusbursed());
		dispatch(Actions.getEmployeeLoanPending());
		dispatch(Actions.getEmployeeLoanClosed());
		dispatch(Actions.getEmployeeLoanCorrected());
		dispatch(Actions.getEmployeeLoanApproved());
		dispatch(Actions.getEmployeeLoanRejected());
		dispatch(Actions.getEmployeeLoanReviewed());

		dispatch(employeeActions.getAllEmployee());
	}, []);

	useEffect(() => {
		if (Object.entries(loanHistory).length > 0) {
			setData(loanHistory.pendingLoanHistory.concat(loanHistory.reviewedLoanHistory).concat(loanHistory.rejectedLoanHistory).concat(loanHistory.correctedLoanHistory).concat(loanHistory.disbursedLoanHistory).concat(loanHistory.approvedLoanHistory).concat(loanHistory.closedLoanHistory))
			console.log(loanHistory, data);
		}
	}, [loanHistory])

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data?.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		if (item.status === 'pending') {
			history.push(`/loan/request/new/${item.id}`)
		} else {
			setOpen(true);
			setLoanDetails(item);
		}
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	const handleDelete = () => {
		// dispatch(Actions.deleteRoles(selected));
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = id => {
		handleClose();
		dispatch(Actions.confrimLoan(id));
	};

	const confirmDisbursement = id => {
		handleClose();
		dispatch(Actions.confirmDisbursement({ id, history }));
	};

	const handleCancel = id => {
		handleClose();
		dispatch(Actions.cancelLoan(id, history));
	}

	if (!employeeList) {
		return <>Loading...</>
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<SharedTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data?.length}
						rows={rows}
						handleDelete={handleDelete}
						success={true}
					/>
					<TableBody>
						{
							_.orderBy(
								data,
								[
									o => {
										switch (order.id) {
											case 'categories': {
												return o?.categories[0];
											}
											default: {
												return o[order?.id];
											}
										}
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									const isSelected = selected.indexOf(n?.id) !== -1;
									return (
										<TableRow
											className="h-64 cursor-pointer"
											hover
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={n?.id}
											selected={isSelected}
											onClick={event => handleClick(n)}
										>
											<TableCell component="th" scope="row" align='left'>

											</TableCell>

											<TableCell component="th" scope="row" align='left'>
												{formatToNaira(n?.amountRequested)}
											</TableCell>
											{/* <TableCell component="th" scope="row" align='left'>
												{formatToNaira(n?.deductableAmount)}
											</TableCell> */}
											<TableCell component="th" scope="row" align='left'>
												{`${n?.duration} Months`}
											</TableCell>
											<TableCell component="th" scope="row" align='left'>
												{n?.purpose}
											</TableCell>
											<TableCell component="th" scope="row" align="right">
												<LoanStatus status={n?.status} />
											</TableCell>

										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="overflow-hidden"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>

			<SharedModal open={open} handleClose={handleClose} title={'Loan Details'}>
				{
					(employeeList ? <table className={clsx(classes.table, 'w-full text-justify')}>
						<tbody>
							<tr className="type">
								<th>Amount Requested</th>
								<td>{formatToNaira(loanDetails.amountRequested)}</td>
							</tr>

							<tr className="size">
								<th>Annual Pay</th>
								<td>{formatToNaira(loanDetails.annualPay)}</td>
							</tr>

							<tr className="location">
								<th>Amount Approved</th>
								<td><div style={{
									wordWrap: "break-word",
									wordBreak: "break-all"
								}}>{(loanDetails.amountApproved) ? formatToNaira(loanDetails.amountApproved) : 'Not Approved Yet'}</div></td>
							</tr>

							<tr className="owner">
								<th>Deductable Amount</th>
								<td>{(loanDetails.deductableAmount) ? formatToNaira(loanDetails.deductableAmount) : 'Not Approved Yet'}</td>
							</tr>

							<tr className="modified">
								<th>Payment Mode</th>
								<td>{loanDetails.paymentMode}</td>
							</tr>

							<tr className="created">
								<th>Date Requested</th>
								<td>{moment(loanDetails.dateRequested).format('LL')}</td>
							</tr>

							<tr className="created">
								<th>Duration</th>
								<td>{`${loanDetails.duration} Months`}</td>
							</tr>

							{/* <tr className="created">
								<th>Line manager</th>
								<td>{`${getEmployeeName(employeeList, loanDetails.departmentHead)} | (${returnResult(loanDetails.departmentHeadApprovalDate)})`}</td>
							</tr> */}

							{/* <tr className="created">
								<th>Director of support service</th>
								<td>{`${getEmployeeName(employeeList, loanDetails.supportDirector)} | (${returnResult(loanDetails.supportDirectorApprovalDate)})`}</td>
							</tr> */}

							<tr className="created">
								<th>Finance Manager</th>
								<td>{`${getEmployeeName(employeeList, loanDetails.financeManager)} | (${returnResult(loanDetails.financeManagerApprovalDate)})`}</td>
							</tr>

							<tr className="created">
								<th>Purpose</th>
								<td><div style={{
									wordWrap: "break-word",
									wordBreak: "break-all"
								}}>{loanDetails.purpose}</div></td>
							</tr>

							{
								loanDetails.status?.toLowerCase() === 'rejected' ?
									<tr className="created">
										<th>Comment</th>
										<td><div style={{
											wordWrap: "break-word",
											wordBreak: "break-all"
										}}>{loanDetails.comment}</div></td>
									</tr> : <></>
							}

							<tr className="created">
								<th>Status</th>
								<td><LoanStatus status={loanDetails.status?.toLowerCase()} /></td>
							</tr>
						</tbody>
					</table> :
						<></>
					)
				}

				{
					loanDetails?.status?.toLowerCase() === 'corrected' ?
						<div className='flex justify-center w-full my-16 mx-auto'>
							<CustomIconButton onClick={e => handleAccept(loanDetails.id)} icon='check_circle_outline' className={'bg-green hover:bg-green-A700 text-white w-1/3 mx-16'}>
								Accept
							</CustomIconButton>
							<CustomIconButton onClick={e => handleCancel(loanDetails.id)} icon='cancel' className={'bg-red hover:bg-red-A700 text-white w-1/3 mx-16'}>
								Reject
							</CustomIconButton>
						</div> :

						loanDetails.status?.toLowerCase() === 'pending' ?
							<div className='flex justify-center w-full my-16 mx-auto'>
								<CustomIconButton onClick={e => history.replace({ pathname: '/loan/request/new/' + loanDetails.id, state: loanDetails })} icon='check_circle_outline' className={'bg-green hover:bg-green-A700 text-white w-1/3 mx-16'}>
									Edit Request
								</CustomIconButton>
								<CustomIconButton onClick={e => handleCancel(loanDetails.id)} icon='cancel' className={'bg-red hover:bg-red-A700 text-white w-1/3 mx-16'}>
									Cancel Request
								</CustomIconButton>
							</div>
							:
							loanDetails.status?.toLowerCase() === 'approved' ?
								<div className='flex justify-center w-full my-16 mx-auto'>
									<CustomIconButton onClick={e => confirmDisbursement(loanDetails.id)} icon='check_circle_outline' className={'bg-green hover:bg-green-A700 text-white w-1/2 mx-16'}>
										Confirm Loan Disbursement
									</CustomIconButton>
									<CustomIconButton onClick={e => handleCancel(loanDetails.id)} icon='cancel' className={'bg-red hover:bg-red-A700 text-white w-1/2 mx-16'}>
										Cancel Request
									</CustomIconButton>
								</div>
								:
								<></>
				}
			</SharedModal>
		</div>
	);
};

const returnResult = data => {
	if (data) {
		return moment(data).format('LL');
	} else {
		return 'Not Approved yet';
	}
}

export default withRouter(LoanReqTable);
