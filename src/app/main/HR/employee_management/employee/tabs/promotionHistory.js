import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
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
// import * as Actions from './store/actions';
import DepartmentTableHead from './promotionHistoryTableHead';
import PromotionDialog from './promotionDialog';
import swal from 'sweetalert2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const PromotionHistory = (props) => {
	return (
		<Card className="w-full mb-16">
			<AppBar position="static" elevation={0}>
				<Toolbar className="px-8">
					<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
						Employee promotion history
					</Typography>
				</Toolbar>
			</AppBar>
			<CardContent>
				<DepartmentTable />
			</CardContent>
		</Card>
	)
};

function DepartmentTable(props) {
	const dispatch = useDispatch();
	// const departments = useSelector(({ departments }) => departments.departments.data);
	// const searchText = useSelector(({ departments }) => departments.departments.searchText);

	const params = useParams();

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([
    {date: '04/12/2014', position: 'Junior Developer', lineManager: 'David chinweike'},
    {date: '04/04/2016', position: 'Intermediate Developer', lineManager: 'Maxwell Adams'},
    {date: '04/06/2018', position: 'Senior Developer', lineManager: 'Matthew Okey'},
  ]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
  });
  const [open, setOpen] = React.useState(false);

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
		// props.history.push(`/hr/business_unit/department/details/${item.id}`);
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

  const handleClickOpen = () => {
    setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	}

	const handleSave = () => {
		setOpen(false);
		setTimeout(() => {
			swal.fire({
				title: 'Promotion history',
				text: 'employee promotion history added',
				icon: 'success',
				timer: 3000,
			})
		}, 1500)
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
        <Button variant="contained" className="mb-16" color="primary" onClick={handleClickOpen} disableElevation>
          add Promotion history
        </Button>
        <PromotionDialog open={open} handleClose={handleClose}/>
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<DepartmentTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
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
										<TableCell component="th" scope="row">
                      {n.date}
										</TableCell>

										<TableCell component="th" scope="row">
											{n.position}
										</TableCell>

                    <TableCell className="truncate" component="th" scope="row">
											{n.lineManager}
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

export default withRouter(PromotionHistory);
