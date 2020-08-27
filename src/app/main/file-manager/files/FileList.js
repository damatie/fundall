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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
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
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files.data);
	const categories = useSelector(({ fileManagerApp }) => fileManagerApp.categories.categories);
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId.id);
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId.selectedItem);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const classes = useStyles();
	const [data, setData] = useState(sortArray(files));
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const categoryID = parseInt(props.props.match.params.id);
	const category = categories.find(c => {
		return c.id === parseInt(categoryID);
	});

	useEffect(() => {
		dispatch(Actions.getCategories());
		dispatch(Actions.getFileByCategoryId(categoryID));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length >= 2) {
			setData(
				files.filter(item => {
					return item.docName.toLowerCase().includes(searchText.toLowerCase());
				})
			);
			setPage(0);
		} else {
			setData(sortArray(files));
		}
	}, [files, searchText]);

	function sortArray(array = []) {
		return array.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
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

	function handleOpenSideBar(event, payload) {
		dispatch(Actions.setSelectedItem(payload.id, payload));
		props.pageLayout.current.toggleRightSidebar();
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table>
					<FileTableHead order={order} onRequestSort={handleRequestSort} rowCount={data.length} />

					<TableBody>
						{data.length > 0 ? (
							_.orderBy(
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
											onClick={event => handleOpenSideBar(event, n)}
											selected={n.id === selectedItemId}
											className="cursor-pointer"
										>
											<TableCell className="max-w-64 w-64 p-0 text-center">
												<Icon className={clsx(classes.typeIcon, getExt(n.docUrl))} />
											</TableCell>
											<TableCell>{n.docName}</TableCell>
											<TableCell className="text-left hidden sm:table-cell">{getExt(n.docUrl)}</TableCell>
											<TableCell className="max-w-64 w-64 p-0 text-center">
												{formatBytes(n.size) === '' || !formatBytes(n.size) ? '-' : formatBytes(n.size)}
											</TableCell>
											<TableCell className="text-left hidden sm:table-cell">
												{n.employee ? n.employee.firstName + ' ' + n.employee.lastName : ''}
											</TableCell>
											<TableCell className="text-left hidden sm:table-cell">
												{category ? category.categoryName : ''}
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Moment format="ddd do MMM, YY | hh:mm:ss a">{n.updatedAt}</Moment>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												
											</TableCell>
										</TableRow>
									);
								})
						) : (
							<TableRow>
								<TableCell className="text-center hidden sm:table-cell" colSpan={8}>
									{category ? 'No Documents found for ' + category.categoryName : 'No Documents found'}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								className="overflow-hidden"
								// component="div"
								colSpan={8}
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
