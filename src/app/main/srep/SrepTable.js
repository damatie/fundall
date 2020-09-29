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
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import Moment from 'react-moment';
import RejectIcon from '@material-ui/icons/Cancel';
import ApproveIcon from '@material-ui/icons/Check';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const SrepTable = (props) =>{
    const dispatch = useDispatch();
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
    const [selected, setSelected] = useState('');

	const createSortHandler = property => event =>  {
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

    function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
    }

    function handleSearch(event){
        setSearch(event.target.value);
    }

    function handleFilter(event){
        console.log(event.target.value);
        setFilter(event.target.value);
    }

    function handleItemClick(event, item){
        props.props.history.push(`/srep/details/${item.id}`);
    }

    const handleDelete = (event, id) => {
        dispatch(Actions.deleteSrep(id, props.role, props.userId));
    }
    
    function CheckStatus(status){
        switch (status) {
            case "pending":
                return (
                    <Typography
                            className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "approved":
                return (
                    <Typography
                            className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "rejected":
                return (
                    <Typography
                            className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "reviewed":
                return (
                    <Typography
                            className={'bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "completed":
                return (
                    <Typography
                            className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;

            default:
                return (
                    <Typography>
                        {status}
                    </Typography>
                )
                break;
        }
    }

    const handleClose = () => {
        setOpen(false);
      };
    useEffect(() => {
		if (search.length >= 2) {
            setData(_.filter(props.rows, row => row.employee.firstName.toLowerCase().includes(search.toLowerCase()) 
            || row.employee.lastName.toLowerCase().includes(search.toLowerCase()) ));
			setPage(0);
		} else {
			setData(props.rows);
		}
    }, [props.rows, search]);
    
    useEffect(() => {
		if (filter !== '') {
            setData(_.filter(props.rows, row => row.status.toLowerCase() === filter.toLowerCase()));
			setPage(0);
		} else {
			setData(props.rows);
		}
	}, [props.rows, filter]);
    
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
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
								.map(n => {
								return (
									<TableRow
										key={n.id}
										hover
										// selected={n.id === selectedItemId}
                                        className="cursor-pointer"
                                        style ={{height: "200"}}
									>
										<TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n); setOpen(true) }}>
											{(n.employee) ? `${n.employee.firstName} ${n.employee.lastName}` : ''}
										</TableCell>
										<TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n); setOpen(true) }}>{n.identityType}</TableCell>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n); setOpen(true) }}>
                                        <Moment format="ddd Do MMM, YY | hh:mm:ss a">{n.createdAt}</Moment>
										</TableCell>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n); setOpen(true) }}>
                                            {CheckStatus(n.status)}   
                                        </TableCell>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}>
                                        <IconButton aria-label="delete" onClick={(event) => handleDelete(event, n.id)} disabled={parseInt(props.userId) !== n.employeeId || n.status !== 'pending'}>
                                            <DeleteIcon style={{color: (parseInt(props.userId) !== n.employeeId || n.status !== 'pending') ? 'grey' : 'red'}} />
                                        </IconButton> 
                                        </TableCell>
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
}

export default React.memo(SrepTable);
