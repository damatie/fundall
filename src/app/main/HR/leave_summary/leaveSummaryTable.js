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
import { withRouter } from 'react-router-dom';
import SharedTableHead from 'app/shared/sharedTableHead';
import * as Actions from './store/actions';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import LeaveDialog from './leaveDetails';

const rows = [
	{
		id: 'employee_name',
		align: 'left',
		disablePadding: false,
		label: 'Employee name',
		sort: true
	},
	// {
	// 	id: 'email',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'email',
	// 	sort: true
	// },
	{
		id: 'leave_type',
		align: 'left',
		disablePadding: false,
		label: 'Leave type',
		sort: true
	},
	{
		id: 'leave_days',
		align: 'left',
		disablePadding: false,
		label: 'Leave days',
		sort: true
	},
	{
		id: 'from_date',
		align: 'left',
		disablePadding: false,
		label: 'From date',
		sort: true
	},
	{
		id: 'to_date',
		align: 'right',
		disablePadding: false,
		label: 'To date',
		sort: true
	},
	{
		id: 'applied_on',
		align: 'right',
		disablePadding: false,
		label: 'Applied on',
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


function LeaveSummaryTable(props) {
	const dispatch = useDispatch();

	const leaveSummary = useSelector(({ leaveSummary }) => leaveSummary.leaveSummary)

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		setData(leaveSummary.data)
	}, [leaveSummary.data])

	useEffect(() => {
		dispatch(Actions.getLeaveSummary());
	}, [dispatch]);

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
		// props.history.push(`/hr/business_unit/details/${item.id}`);
		setOpen(true);
		dispatch(Actions.getOneLeaveSummary(item))
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

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<SharedTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
            rowCount={data.length}
            success={true}
            rows={rows}
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
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell className="w-64 text-center" padding="none" align="left">
											{/* <Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/> */}
										</TableCell>

										<TableCell component="th" scope="row" align="left">
                      {`${n.employee.firstName} ${n.employee.lastName}`}
										</TableCell>

										{/* <TableCell component="th" scope="row" align="left">
                      {`${n.employee.email}`}
										</TableCell> */}

										<TableCell component="th" scope="row" align="left">
											{n.leaveType}
										</TableCell>

										<TableCell component="th" scope="row" align="left">
											{`${n.days} days`}
										</TableCell>

										<TableCell className="truncate" component="th" scope="row" align="left">
											{moment(n.fromDate).format('LLL')}
										</TableCell>

										<TableCell component="th" scope="row" align="right">
											{moment(n.toDate).format('LLL')}
										</TableCell>

										<TableCell component="th" scope="row" align="right">
											{moment(n.createdAt).format('LLL')}
										</TableCell>

                    <TableCell component="th" scope="row" align="right">
											<Status status={n.status} />
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
			<LeaveDialog open={open} setOpen={setOpen} />
		</div>
	);
};


export const Status = ({status}) => {
  switch(status) {
    case 'in progress': {
      return <Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
    }
    case 'approved': {
      return <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
			{status}
		</Typography>
    }
    case 'cancelled': {
      return <Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
		}
		case 'reviewed': {
      return <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
			{status}
		</Typography>
    }
    default: {
      return null;
    }
  }

  return null;
}

export default withRouter(LeaveSummaryTable);
