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
import * as Actions from '../store/actions';
import SharedTableHead from 'app/shared/sharedTableHead';

const rows = [
	{
		id: 'full_name',
		align: 'left',
		disablePadding: false,
		label: 'Full name',
		sort: true
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'email',
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
		align: 'right',
		disablePadding: false,
		label: 'Entity',
		sort: true
	},
	{
		id: 'mobile',
		align: 'right',
		disablePadding: false,
		label: 'Mobile number',
		sort: true
	},
	{
		id: 'onboarding_status',
		align: 'right',
		disablePadding: false,
		label: 'Onboarding status',
		sort: true
	}
];

function EmployeesTable(props) {
	const dispatch = useDispatch();
	const employees = useSelector(({ employees }) => employees.employees);
	const searchText = useSelector(({ employees }) => employees.employees.searchText);
	let success = false;

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(employees.data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		setSelected([])
		dispatch(Actions.getEmployees());
	}, [dispatch, employees.update]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(employees, item => item.firstName.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(employees.data);
		}
	}, [employees, searchText]);

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
		dispatch(Actions.getEmployeeInfo({
			...item
		}));
		dispatch(Actions.getEmployeeDetails(item.id));
		props.history.push(`/hr/employee_management/employee_details/${item.id}`);
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
		dispatch(Actions.deleteEmployee(selected[0]));
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
						success={success}
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
										<TableCell className="w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell component="th" scope="row">
                      {`${n.firstName} ${n.lastName}`}
										</TableCell>

										<TableCell component="th" scope="row">
											{n.email}
										</TableCell>

										<TableCell className="truncate" component="th" scope="row">
											{/* {!n.department.departmentName ? 'IT' : n.department.departmentName} */}
										</TableCell>

										<TableCell component="th" scope="row" align="right">
											{/* {!n.entity.entityName ? 'C-bit' : n.entity.entityName} */}
										</TableCell>

										<TableCell component="th" scope="row" align="right">
											{n.mobile}
										</TableCell>

										<TableCell component="th" scope="row" align="right">
											{/* {!n.role.name ? 'employee' : n.role.name} */}
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
}

export default withRouter(EmployeesTable);
