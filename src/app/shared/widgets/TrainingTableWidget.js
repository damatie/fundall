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
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Moment from 'react-moment';
import RejectIcon from '@material-ui/icons/Cancel';
import ApproveIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
// import WidgetModal from './WidgetModal';
import { AppBar, Toolbar } from '@material-ui/core';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});

const TableWidget = props => {
	const [data, setData] = useState(props.rows);
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('');
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [selected, setSelected] = useState({});

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

	useEffect(() => {
		//reloading on data change
		console.log(props.isHR)
	}, [data, selected])

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	function handleFilter(event) {
		console.log(event.target.value);
		setFilter(event.target.value);
	}

	function handleItemClick(event, item) {
		console.log(item);
		setSelected(item);
		setOpen(true);
	}

	function CheckStatus(status) {
		if (!status) return <></>;
		switch (status.toLowerCase()) {
			case 'pending':
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

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (search.length >= 2) {
			setData(
				_.filter(
					props.rows,
					row =>
						row.employeeName.toLowerCase().includes(search.toLowerCase()) ||
						row.employeeName.toLowerCase().includes(search.toLowerCase())
				)
			);
			setPage(0);
		} else {
			setData(props.rows);
		}
	}, [props.rows, search]);

	useEffect(() => {
		if (filter !== '') {
			setData(_.filter(props.rows, row => row.status.toLowerCase() === filter.status.toLowerCase()));
			setPage(0);
		} else {
			setData(props.rows);
		}
	}, [props.rows, filter]);

	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<React.Fragment>
				<div>
					<Dialog
						open={open}
						onClose={handleClose}
						fullWidth={true}
						maxWidth={'sm'}
						aria-labelledby="form-dialog-title"
					>
						<AppBar position="static">
							<Toolbar className="flex w-full">
								<Typography variant="subtitle1" color="inherit">
									Training Request Details
								</Typography>
							</Toolbar>
						</AppBar>

						<DialogContent>
							<table className={clsx(classes.table, 'w-full text-justify')}>
								<tbody>
									<tr className="employee">
										<th>Employee Name</th>
										<td>
											{selected
												? selected.employeeName
												: ''}
										</td>
									</tr>

									<tr className="cost">
										<th>Cost</th>
										<td>{selected ? selected.cost : ''}</td>
									</tr>

									<tr className="location">
										<th>Location</th>
										<td>{selected ? selected.country : ''}</td>
									</tr>

									<tr className="cert">
										<th>Certification</th>
										<td>{(selected ? selected?.certification : '') ? 'Yes' : 'No'}</td>
									</tr>


									<tr className="catergory">
										<th>Category</th>
										<td>{selected ? selected.category : ''}</td>
									</tr>

									<tr className="dept">
										<th>Department</th>
										<td>{selected ? selected.department : ''}</td>
									</tr>

									<tr className="startDate">
										<th>Training Starts</th>
										<td>{selected ? selected.startDate : ''} </td>
									</tr>
									<tr className="endDate">
										<th>Training Ends</th>
										<td>{selected ? selected.endDate : ''}</td>
									</tr>

									<tr className="created">
										<th>Created</th>
										<td>
											{selected ? (
												<Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{selected?.createdAt}</Moment>
											) : (
													''
												)}{' '}
										</td>
									</tr>
									<tr className="updated">
										<th>Updated</th>
										<td>
											{selected ? (
												<Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{selected?.updatedAt}</Moment>
											) : (
													''
												)}
										</td>
									</tr>
								</tbody>
							</table>
							{
								!props.isHR && ((
									(selected
										? (selected?.status?.toLowerCase() === 'pending')
										: false) && props.allowAuth
								) ? (
										<Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
											<Button
												className="bg-red text-white"
												startIcon={<RejectIcon />}
												onClick={ev => {
													props.handleReject(ev, selected?.trainingCourseId);
													handleClose();
												}}
											>
												Reject
											</Button>
											&nbsp;
											<Button
												className="bg-green text-white"
												startIcon={<ApproveIcon />}
												onClick={ev => {
													props.handleApprove(ev, selected.trainingCourseId);
													handleClose();
												}}
											>
												Approve
									</Button>
										</Grid>
									) : (
										<Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
											{selected ? CheckStatus(selected?.status) : ''}
										</Grid>
									))
							}

							{
								props.fromTrainingMgt && (
									// props.isHR && (
									(
										// true
										selected
										// props.fromTrainingMgt
										// ? (selected?.status?.toLowerCase() === 'reviewed' || selected?.status?.toLowerCase() === 'pending')
										// : false) && props.isHR
									)
										?
										(
											<Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
												<Button
													className="bg-red text-white"
													startIcon={<RejectIcon />}
													onClick={ev => {
														props.handleReject(ev, selected?.trainingCourseId);
														handleClose();
													}}
												>
													Reject
												</Button>
												&nbsp;
												<Button
													className="bg-green text-white"
													startIcon={<ApproveIcon />}
													onClick={ev => {
														props.handleApprove(ev, selected?.trainingCourseId);
														handleClose();
													}}
												>
													Approve
												</Button>
											</Grid>
										)
										: (
											<Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
												{selected ? CheckStatus(selected?.status) : ''}
											</Grid>
										)

								)
								// )
							}
						</DialogContent>
						<DialogActions className="m-20">
							<Button onClick={handleClose} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</React.Fragment>
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
						<FormControl className="">
							<Select value={filter} onChange={ev => handleFilter(ev)} displayEmpty name="filter" className="">
								<MenuItem value="">
									<em>Filter by</em>
								</MenuItem>
								<MenuItem value="approved">Approved</MenuItem>
								<MenuItem value="rejected">Rejected</MenuItem>
								<MenuItem value="pending">Pending</MenuItem>
							</Select>
						</FormControl>
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
							.map((n, index) => {
								return (
									<TableRow
										key={index * Math.random()}
										hover
										onClick={event => {
											handleItemClick(event, n);
											setOpen(true);
										}}
										// selected={n.id === selectedItemId}
										className="cursor-pointer"
									>
										<TableCell className="text-center">
											{n?.employeeName}
										</TableCell>
										<TableCell>{n?.trainingName}</TableCell>
										<TableCell className="text-center">{n?.cost}</TableCell>
										<TableCell className="text-center">{n?.startDate}</TableCell>
										<TableCell className="text-center">{n?.startDate}</TableCell>
										<TableCell className="text-center">{CheckStatus(n?.status)}</TableCell>
									</TableRow>
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

export default React.memo(TableWidget);
