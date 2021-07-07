import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import SharedTableHead from 'app/shared/sharedTableHead';

const rows = [
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Employee Name',
		sort: true
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'jobRole',
		align: 'left',
		disablePadding: false,
		label: 'Job Role',
		sort: true
	},
	{
		id: 'department',
		align: 'left',
		disablePadding: false,
		label: 'Department',
		sort: true
	},
	{
		id: 'entity',
		align: 'left',
		disablePadding: false,
		label: 'Entity',
		sort: true
	},
	{
		id: 'amountRequested',
		align: 'left',
		disablePadding: false,
		label: 'Amount Requested',
		sort: true
	},
	{
		id: 'duration',
		align: 'left',
		disablePadding: false,
		label: 'Loan Duration',
		sort: true
	}
	// {
	// 	id: 'deductableAmount',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Deductable Amount',
	// 	sort: true
	// },
	// {
	// 	id: 'amountApproved',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Amount Approved',
	// 	sort: true
	// },
	// {
	// 	id: 'dateRequested',
	// 	align: 'right',
	// 	disablePadding: false,
	// 	label: 'Date Requested',
	// 	sort: true
	// }
];

function LoanReqTab(props) {
	const dispatch = useDispatch();

	const [selected, setSelected] = useState(props.loans);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		setData(props.loans)
	}, [props.loans]);

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
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		// if(props.user.user === 'line_manager') {
		// 	props.history.push(`/line_manager/leave_review/employee/${item.id}`);
		// } else
		// if (props.user.user === 'Hr Manager') {
		// 	props.history.push(`/hr/leave_review/employee/${item.id}`);
		// 	return;
		// }

		// props.history.push(`/hr/leave_review/employee/${item.id}`);
		props.history.push({
			pathname: `/loan/review/list/details/${item.loan.id}`,
			state: item
		});
	}



	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);;
		// // console.log(selectedIndex)
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

	// check if input value is valid, if valid formate the value and return the value
	const compareInput = data => {
		if (data) {
			const x = Intl.NumberFormat().format(data);
			return x;
		} else {
			return '0.0'
		}
	};

	return (
		<div className="w-full flex flex-col">
			{/* <FuseScrollbars className="flex-grow overflow-x-auto"> */}
			<Table className="min-w-xl" aria-labelledby="tableTitle">
				<SharedTableHead
					numSelected={selected.length}
					order={order}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={data.length}
					rows={rows}
					handleDelete={handleDelete}
					success={true}
				/>
				<TableBody>
					{_.orderBy(
						data,
						[
							o => {
								switch (order.id) {
									case 'categories': {
										return o.categories[0];
									}
									default: {
										return o[order.id];
									}
								}
							}
						],
						[order.direction]
					)
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(n => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="h-64 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={Math.random()}
									selected={isSelected}
									onClick={event => handleClick(n)}
								>
									<TableCell component="th" scope="row" align='left'></TableCell>

									<TableCell component="th" scope="row" align='left'>
										{`${n.employee.firstName} ${n.employee.lastName}`}
									</TableCell>
									<TableCell component="th" scope="row" align='left'>
										{`${n.employee.email}`}
									</TableCell>
									<TableCell component="th" scope="row" align='left'>
										{n.loan.jobRole}
									</TableCell>
									<TableCell component="th" scope="row" align='left'>
										{n.loan.department}
									</TableCell>
									<TableCell component="th" scope="row" align='left'>
										{n.loan.entity}
									</TableCell>
									{/* <TableCell component="th" scope="row" align='left'>
											{n.loan.jobRole}
										</TableCell> */}
									<TableCell component="th" scope="row" align='left'>
										{`₦ ${compareInput(n.loan.amountRequested)}`}
									</TableCell>
									<TableCell component="th" scope="row" align='left'>
										{`${compareInput(n.loan.duration)} months`}
									</TableCell>

								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			{/* </FuseScrollbars> */}

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
		</div>
	);
};

export default withRouter(LoanReqTab);
