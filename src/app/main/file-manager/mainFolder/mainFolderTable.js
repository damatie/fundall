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
import * as Actions from '../store/actions';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {capitalizeWords} from 'app/shared/capitalizeWords';
import clsx from 'clsx';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
    },
    typeIcon: {
		'&.folder:before': {
			content: "'folder'",
			color: '#FFB300'
		},
		'&.folder_shared:before': {
			content: "'folder_shared'",
			color: '#FFB300'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.pdf:before': {
			content: "'picture_as_pdf'",
			color: '#F40F02'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		},
		'&.image:before': {
			content: "'image'",
			color: '#4CAF50'
		},
		'&.audio:before': {
			content: "'music_note'",
			color: '#4CAF50'
		},
		'&.video:before': {
			content: "'ondemand_video'",
			color: '#4CAF50'
		}
	}
});
const MainFolderTable = (props) =>{
    const dispatch = useDispatch();
    const [data, setData] = useState(props.rows);
    const [filter, setFilter] = useState('');
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
    });

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
        props.props.history.push({
            pathname: `/library/folders/${convertText(item.name)}`, 
            state: {
                mainFolders: item
            }
        });
    }

    const handleDelete = (event, id) => {
        // dispatch(Actions.deleteSrep(id, props.role, props.userId));
    }

    const shortenText = (text, length=20) => {
        if (text.length > length) {
            var shortname = text.substring(0, length) + " ...";
            return shortname;
        }
        return text;
    }

    const convertText = (text) => {
        if(text){
            return text.replaceAll(' ', '_');
        }
        return text;
    }
    
    
    useEffect(() => {
		if (search.length >= 2) {
            setData(_.filter(props.rows, row => row.name.toLowerCase().includes(search.toLowerCase()) 
            || row.employee.firstName.toLowerCase().includes(search.toLowerCase()) 
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
                                        <TableCell className="max-w-64 w-64 p-0 text-center" onClick={event => {handleItemClick(event, n)}}>
                                            {(n)? <div className="mb-8 mt-8">
                                                    <Icon className={clsx(classes.typeIcon, (n.id === 1) ? 'folder_shared' : 'folder')} />
                                                </div> 
                                                : <div></div>
                                            }
                                        </TableCell>
										<TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n)}}>
											{(n) ? `${n.name}` : ''}
										</TableCell>
                                        <Tooltip
                                            title={n.description}
                                            enterDelay={300}
                                        >
                                            <TableCell className="text-center" style={{padding: '0 16px'}}
                                            onClick={event => {handleItemClick(event, n)}}>
                                                {(n) ? shortenText(n.description, 30) : ''}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n)}}>
                                            {(n) ? capitalizeWords(moment(n.createdAt).fromNow()) : ''}
										</TableCell>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}
										onClick={event => {handleItemClick(event, n) }}>
                                            {(n.employee) ? `${n.employee.firstName} ${n.employee.lastName}` : ''}
                                        </TableCell>
                                        <TableCell className="text-center" style={{padding: '0 16px'}}>
                                        {/* <IconButton aria-label="delete" onClick={(event) => handleDelete(event, n.id)} disabled={parseInt(props.userId) !== n.employeeId || n.status !== 'pending'}>
                                            <DeleteIcon style={{color: (parseInt(props.userId) !== n.employeeId || n.status !== 'pending') ? 'grey' : 'red'}} />
                                        </IconButton>  */}
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
                                count={(data) ? data.length : 0}
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

export default React.memo(MainFolderTable);
