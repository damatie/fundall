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
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import {capitalizeWords} from 'app/shared/capitalizeWords';
import clsx from 'clsx';
import UpdateDocument from './components/updateDocument';
import FileDetails from './components/fileDetails';
import DownloadIcon from '@material-ui/icons/CloudDownload';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
    },
    typeIcon: {
		'&.folder:before': {
			content: "'folder'",
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
const FolderFilesTable = (props) =>{
    const dispatch = useDispatch();
    const [data, setData] = useState(props.rows);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(false);
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

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
	}
	
    const handleCloseDetailsModal = () => {
        setDetails(false);
    }

    function handleItemClick(event, item){
		console.log(item)
		setSelected(item);
		setDetails(true);
    }

    const handleDelete = (event, item) => {
        dispatch(Actions.deleteDocument(item.documentMainFolder.id, item.folderId, item.id, (item) ? `${item.name}.${item.url.split('.').pop()}` : ''));
	}
	
	const handleUpload = (model) => {
        dispatch(Actions.updateDocument(selected.documentMainFolder.id, selected.folderId, selected.id, model));
        handleCloseModal();
    }

    const shortenText = (text, length=20) => {
        if (text.length > length) {
            var shortname = text.substring(0, length) + " ...";
            return shortname;
        }
        return text;
    }

    function formatBytes(a, b = 2) {
		if (0 === a) return '0 Bytes';
		const c = 0 > b ? 0 : b,
			d = Math.floor(Math.log(a) / Math.log(1024));
		return (
			parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
			' ' +
			['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
		);
	}
    
    const getExt = filename => {
		if (filename) {
			let ext = filename.split('.').pop();
			if (ext.toUpperCase() === 'PDF') {
				return 'pdf';
			} else if (ext.toUpperCase() === 'DOC' || ext.toUpperCase() === 'DOCX') {
				return 'document';
			} else if (
				ext.toUpperCase() === 'JPG' ||
				ext.toUpperCase() === 'PNG' ||
				ext.toUpperCase() === 'SVG' ||
				ext.toUpperCase() === 'JPEG'
			) {
				return 'image';
			} else if (ext.toUpperCase() === 'MP3' || ext.toUpperCase() === 'WAV') {
				return 'audio';
			} else if (ext.toUpperCase() === 'MP4' || ext.toUpperCase() === 'OGG' || ext.toUpperCase() === '3GP') {
				return 'video';
			} else if (ext.toUpperCase() === 'XLSX' || ext.toUpperCase() === 'XLS' || ext.toUpperCase() === '3GP') {
				return 'spreadsheet';
			}
		}
	};

	const downloadFile = (url) => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
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
										// selected={n.id === selectedItemId}
                                        className="cursor-pointer"
                                        style ={{height: "200"}}
									>
                                        <TableCell className="max-w-64 w-64 p-0 text-center" onClick={event => {handleItemClick(event, n)}}>
                                            <Icon className={clsx(classes.typeIcon, getExt(n.url))} />
                                        </TableCell>
                                        <Tooltip
                                            title={`File size: ${formatBytes(parseInt(n.size))}`}
                                            enterDelay={300}
                                        >
                                            <TableCell className="text-center" style={{padding: '0 16px'}} onClick={event => {handleItemClick(event, n)}}>
                                                {(n) ? `${n.name}.${n.url.split('.').pop()}` : '' }
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
                                        <IconButton aria-label="edit" onClick={(event) => { setSelected(n); handleOpenModal();}} disabled={parseInt(props.userId) !== n.modifiedBy}>
                                            <EditIcon style={{color: (parseInt(props.userId) !== n.modifiedBy) ? 'grey' : 'skyblue'}} />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={(event) => handleDelete(event, n)} disabled={parseInt(props.userId) !== n.modifiedBy}>
                                            <DeleteIcon style={{color: (parseInt(props.userId) !== n.modifiedBy) ? 'grey' : 'red'}} />
                                        </IconButton> 
                                        <IconButton aria-label="download" onClick={(event) => { downloadFile(n.url)}} >
                                            <DownloadIcon style={{color: "green" }}/>
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
			<UpdateDocument 
				open={open}
				handleCloseModal={handleCloseModal} 
				handleCreate={handleUpload}
				title={selected && `${selected.name}.${selected.url.split('.').pop()}`}
				name={selected && selected.name}
				url={selected && selected.url}
				ext={selected && getExt(selected.url)}
				classes={classes}
			/>
			<FileDetails 
				open={details}
				handleCloseModal={handleCloseDetailsModal}
				title={selected && `${selected.name}.${selected.url.split('.').pop()}`}
				formatBytes={formatBytes}
				getExt={getExt}
				classes={classes}
				file={selected}
				roles={props.roles}
			/>
		</Paper>
	);
}

export default React.memo(FolderFilesTable);