import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import clsx from 'clsx';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import * as mime from 'react-native-mime-types';
import * as remote from 'remote-file-size';
import Moment from 'react-moment';
import FileTableHead from './FileTableHead';

const useStyles = makeStyles({
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
	

function FileList(props) {
	const dispatch = useDispatch();
	const files = useSelector(({ fileManagerApp }) =>  fileManagerApp.files.data );
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const classes = useStyles();
	const [data, setData] = useState(files);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	useEffect(() => {
		dispatch(Actions.getFiles());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length >= 2) {
			setData(_.filter(files, item => item.docName.toLowerCase().includes(searchText.toLowerCase()) || item.uploaderName.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(files);
		}
	}, [files, searchText]);
	


	const getExt = (filename) =>{
		if(filename){
			let ext = filename.split('.').pop();
			if(ext.toUpperCase() === 'PDF'){
				return 'pdf';
			}else if (ext.toUpperCase() === 'DOC' || ext.toUpperCase() === 'DOCX'){
				return 'document';
			}else if (ext.toUpperCase() === 'JPG' || ext.toUpperCase() === 'PNG' || ext.toUpperCase() === 'SVG' || ext.toUpperCase() === 'JPEG'){
				return 'image';
			}else if (ext.toUpperCase() === 'MP3' || ext.toUpperCase() === 'WAV'){
				return 'audio';
			}else if (ext.toUpperCase() === 'MP4' || ext.toUpperCase() === 'OGG' || ext.toUpperCase() === '3GP'){
				return 'video';
			}else if (ext.toUpperCase() === 'XLSX' || ext.toUpperCase() === 'XLS' || ext.toUpperCase() === '3GP'){
				return 'spreadsheet';
			}
		}
	}
	function handleChangePage(event, value) {
		setPage(value);
	}
	
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}
	
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
		
			return (
				<FuseAnimate animation="transition.slideUpIn" delay={300}>
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table>
						<FileTableHead 
						// numSelected={selected.length}
						order={order}
						// onSelectAllClick={handleSelectAllClick}
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
								return (
									<TableRow
										key={n.id}
										hover
										onClick={event => props.pageLayout.current.toggleRightSidebar(dispatch(Actions.setSelectedItem(n.id)))}
										selected={n.id === selectedItemId}
										className="cursor-pointer"
									>
										<TableCell className="max-w-64 w-64 p-0 text-center">
											<Icon className={clsx(classes.typeIcon, getExt(n.docUrl))} />
										</TableCell>
										<TableCell>{n.docName}</TableCell>
										<TableCell className="hidden sm:table-cell">{getExt(n.docUrl)}</TableCell>
										<TableCell className="hidden sm:table-cell">{n.uploaderName}</TableCell>
										<TableCell className="text-center hidden sm:table-cell">
											{n.category}
										</TableCell>
										<TableCell className="hidden sm:table-cell"><Moment format="ddd MMM, YY | hh:mm:ss a">{n.updatedAt}</Moment></TableCell>
										<Hidden lgUp>
											<TableCell>
												<IconButton
													onClick={ev => props.pageLayout.current.toggleRightSidebar(dispatch(Actions.setSelectedItem(n.id)))}
													aria-label="open right sidebar"
												>
													<Icon>info</Icon>
												</IconButton>
											</TableCell>
										</Hidden>
									</TableRow>
								);
							})}
						</TableBody>
				<TableFooter>
				<TableRow>
					<TablePagination
						className="overflow-hidden"
						// component="div"
						colSpan={7}
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
					</TableRow>
					</TableFooter>
					</Table>
					</FuseScrollbars>
				</FuseAnimate>
			);
	}
	
	export default FileList;
	