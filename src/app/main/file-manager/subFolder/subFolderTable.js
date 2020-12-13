import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
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
import EditIcon from '@material-ui/icons/Edit';
import ActionMenu from './components/actionMenu';
import MenuIcon from '@material-ui/icons/MoreVert';
import Cancel from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {capitalizeWords} from 'app/shared/capitalizeWords';
import clsx from 'clsx';
import FolderDetails from './components/folderDetails';
import RenameFolder from './components/renameFolder';
import InputAdornment from '@material-ui/core/InputAdornment';
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
const SubFolderTable = (props) =>{
    const dispatch = useDispatch();
    const [data, setData] = useState(props.rows);
    const [open, setOpen] = useState(false);
    const [rename, setRename] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
    });
    const [selected, setSelected] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelected(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    function handleItemClick(event, item){
        if(rename !== item.id){
            props.props.history.push({
                pathname:`/library/folders/${convertText(props.mainFolder.name)}/${convertText(item.name)}`,
                state:{
                    mainFolders: props.mainFolder,
                    subFolders: item
                }
            });
        }
    }

    const handleDelete = () => {
        dispatch(Actions.deleteSubFolder(props.mainFolder.id, selected.id, selected.name));
        handleClose();
    }

    const shortenText = (text, length=20) => {
        if (text.length > length) {
            var shortname = text.substring(0, length) + " ...";
            return shortname;
        }
        return text;
    }

    const grantAccess = (roleId) => {
        dispatch(Actions.grantSubFolderAccess(selected.folderId, selected.id, selected.name, roleId));
        handleClose();
    }

    const handleOpenRename = () => {
        setRename(selected.id);
        setName(selected.name);
        setDescription(selected.description);
        handleClose();
    }

    const handleCloseRename = () =>{
        setRename(0);
        const payload = {
            name,
            description
        }
        dispatch(Actions.updateSubFolder(selected.folderId, selected.id, payload));
    }

    const viewDetails = () => {
        setOpen(true);
        handleClose();
    }

    function handleCloseModal(){
        setOpen(false);
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
										selected={n.id === selected.id}
                                        className="cursor-pointer"
                                        style ={{height: "200"}}
									>
                                        <TableCell className="max-w-64 w-64 p-0 text-center" onClick={event => {handleItemClick(event, n)}}>
                                            <Icon className={clsx(classes.typeIcon, (n.folderId === 1) ? 'folder_shared' : 'folder')} />
                                        </TableCell>
										<TableCell className="text-center" style={{padding: '0 16px'}}
                                            onClick={event => { handleItemClick(event, n)}}>
                                            {(n) ? 
                                                    (rename === n.id) ?
                                                        <RenameFolder
                                                            name='name'
                                                            label='Name'
                                                            className='my-16'
                                                            value={name}
                                                            onChange={ev => setName(ev.target.value)}
                                                            onClick={handleCloseRename}
                                                        /> 
                                                    :
                                                        n.name
                                                : '' 
                                            }
										</TableCell>
                                        <TableCell className="text-justify">
											{(n) ? <div>
                                                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={ev => {handleClick(ev, n)}}>
                                                        <MenuIcon />
                                                    </Button>
                                                    <ActionMenu 
                                                        viewDetails={viewDetails} 
                                                        handleClose={handleClose} 
                                                        grantAccess={grantAccess}
                                                        handleRename={handleOpenRename}
                                                        handleDelete={handleDelete}
                                                        anchorEl={anchorEl}
                                                        folderId={selected && selected.folderId}
                                                        roles={(selected) ? props.roles.filter(role => !selected.access.includes(role.id.toString())) : []}
                                                    />
                                                    <FolderDetails 
                                                        title={selected && selected.name}
                                                        folder={selected}
                                                        open={open}
                                                        handleCloseModal={handleCloseModal}
                                                        roles={props.roles}
                                                    />
                                                    </div> 
                                                : <div></div>
                                            }
										</TableCell>
                                        <Tooltip
                                            title={n.description}
                                            enterDelay={300}
                                        >
                                            <TableCell className="text-center" style={{padding: '0 16px'}}
                                            onClick={event => {handleItemClick(event, n)}}>
                                                {(n) ? 
                                                    (rename === n.id) ?
                                                        <RenameFolder
                                                            name='description'
                                                            label='Description'
                                                            className='my-16'
                                                            value={description}
                                                            onChange={ev => setDescription(ev.target.value)}
                                                            multiline
                                                            onClick={handleCloseRename}
                                                        /> 
                                                    :
                                                        shortenText(n.description, 30) 
                                                    : ''
                                                }
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
                                        <IconButton aria-label="edit" onClick={(event) => {setSelected(n); handleOpenRename() }} disabled={parseInt(props.userId) !== n.createdBy}>
                                            <EditIcon style={{color: (parseInt(props.userId) !== n.createdBy) ? 'grey' : 'skyblue'}} />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={(event) => {setSelected(n); handleDelete()}} disabled={parseInt(props.userId) !== n.createdBy}>
                                            <DeleteIcon style={{color: (parseInt(props.userId) !== n.createdBy) ? 'grey' : 'red'}} />
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
                                count={data && data.length}
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

export default React.memo(SubFolderTable);
