import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import IconButton from '@material-ui/core/IconButton';
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
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const CheckListTable = props => {
	const dispatch = useDispatch();
	const [data, setData] = useState(props.rows);
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [selected, setSelected] = useState({});
	let j = 0;

	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	};

	function handleChangePage(event, value) {
		setPage(value);
    }
    

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	function handleItemClick(event, item) {
		props.props.history.push(`/training/checklist/questions/${item.type}/${item.id}`);
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (model, id) => {
		let payload = {};
		payload.type = model.type;
		dispatch(Actions.updateCheckList(payload, id));
	};

	const handleDelete = id => {
		dispatch(Actions.deleteCheckList(id));
	};

	useEffect(() => {
		if (search.length >= 2) {
			setData(_.filter(props.rows, row => row.type.toLowerCase().includes(search.toLowerCase())));
			setPage(0);
		} else {
			setData(props.rows);
		}
	}, [props.rows, search]);

	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			{/* <EditDisciplinaryCaseModal open={open} handleClose={handleClose} selectedItem={selected}/> */}
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-16">{props.title}</Typography>
				<div className="flex items-center">
					<Paper className="flex items-center w-full px-8 py-4 rounded-8">
						<Icon color="action">search</Icon>
						<Input
							placeholder="Search"
							className="flex flex-1 mx-8"
							disableUnderline
							fullWidth
							value={search}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => handleSearch(ev)}
						/>
					</Paper>
				</div>
				<div className="flex">
					<div className="flex flex-2 items-center">
						{/* <FormControl className="">
                            <Select value={filter} onChange={ev => handleFilter(ev)} displayEmpty name="filter" className="">
                                <MenuItem value="">
                                    <em>Filter by</em>
                                </MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                            </Select>
                        </FormControl> */}
					</div>
				</div>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow className="h-64">
							{props.columns.map(column => {
								return (
									<TableCell
										key={column.id}
										align={column.align}
										padding={column.disablePadding ? 'none' : 'default'}
										sortDirection={order.id === column.id ? order.direction : false}
									>
										{column.sort && (
											<Tooltip
												title="Sort"
												placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
												enterDelay={300}
											>
												<TableSortLabel
													active={order.id === column.id}
													direction={order.direction}
													onClick={createSortHandler(column.id)}
												>
													{column.label}
												</TableSortLabel>
											</Tooltip>
										)}
									</TableCell>
								);
							}, this)}
						</TableRow>
					</TableHead>
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
								j++;
								return (
									<Tooltip title="Click to view avaliable questions" placement={'center'} enterDelay={300}>
										<TableRow
											key={n.id}
											hover
											// selected={n.id === selectedItemId}
											className="cursor-pointer"
										>
											<TableCell
												className="text-left"
												onClick={event => {
													handleItemClick(event, n);
													setOpen(true);
												}}
											>
												{j}
											</TableCell>
											<TableCell
												className="text-left"
												onClick={event => {
													handleItemClick(event, n);
													setOpen(true);
												}}
											>
												{n.type}
											</TableCell>
											<TableCell
												className="text-left"
												onClick={event => {
													handleItemClick(event, n);
													setOpen(true);
												}}
											>
												<Moment format="ddd Do MMM, YY | hh:mm:ss a">{n.createdAt}</Moment>
											</TableCell>
											<TableCell
												className="text-left"
												onClick={event => {
													handleItemClick(event, n);
													setOpen(true);
												}}
											>
												<Moment format="ddd Do MMM, YY | hh:mm:ss a">{n.updatedAt}</Moment>
											</TableCell>
											<TableCell className="text-left">
												<IconButton onClick={ev => handleEdit(n, n.id)}>
													<Icon>edit</Icon>
												</IconButton>

												<IconButton onClick={ev => handleDelete(n.id)}>
													<Icon>delete</Icon>
												</IconButton>
											</TableCell>
										</TableRow>
									</Tooltip>
								);
							})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								className="overflow-hidden"
								// component="div"
								count={data.length}
								colSpan={props.columns.length}
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
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</Paper>
	);
};

export default React.memo(CheckListTable);
