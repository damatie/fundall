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
		id: 'amount_requested',
		align: 'left',
		disablePadding: false,
		label: 'Amout requested',
		sort: true
  },
  {
		id: 'deductable_amount',
		align: 'left',
		disablePadding: false,
		label: 'Deductable amount',
		sort: true
  },
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

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		setData([])
	}, []);

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
		// if(props.user.user === 'employee') {
		// 	props.history.push(`/line_manager/leave_review/employee/${item.id}`);
		// } else if(props.user.user === 'hr') {
		// 	props.history.push(`/hr/leave_review/employee/${item.id}`);
		// }
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
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
                    <TableCell component="th" scope="row" align='left'>
                     
										</TableCell>

										<TableCell component="th" scope="row" align='left'>
                      {n.amountRequested}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.deductableAmount}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.duration}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.purpose}
										</TableCell>
                    <TableCell component="th" scope="row" align="right">
											{n.status === 'approved' ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
												<Icon className="text-red text-20">remove_circle</Icon>
											)}
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
		</div>
	);
};

export default withRouter(LoanReqTable);
