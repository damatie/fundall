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
import * as Actions from './store/actions';
import Moment from 'react-moment';
import FileTableHead from './CategoryTableHead';

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

function CategoryList(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ filesByCategories }) => filesByCategories.categories.categories);
	const selectedItemId = useSelector(({ filesByCategories }) => filesByCategories.selectedItemId.id);
	const selectedItem = useSelector(({ filesByCategories }) => filesByCategories.selectedItemId.selectedItem);
	const searchText = useSelector(({ filesByCategories }) => filesByCategories.files.searchText);
	const classes = useStyles();
	const [data, setData] = useState(sortArray(categories));
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(Actions.getCategories());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length >= 2) {
			setData(
				categories.filter(item => {
					return item.categoryName.toLowerCase().includes(searchText.toLowerCase());
				})
			);
			setPage(0);
		} else {
			setData(sortArray(categories));
		}
	}, [categories, searchText]);

	function sortArray(array = []) {
		return array.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
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

	function handleClick(item) {
		props.props.history.push(`/library/document/${item.id}`);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table>
					<FileTableHead order={order} onRequestSort={handleRequestSort} rowCount={data.length} />

					<TableBody>
						{(data.length > 0) ? (_.orderBy(
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
										onClick={event => handleClick(n)}
										selected={n.id === selectedItemId}
										className="cursor-pointer"
									>
										<TableCell className="text-center hidden sm:table-cell">{n.categoryName}</TableCell>
										<TableCell className="text-center hidden sm:table-cell">
											<Moment format="ddd do MMM, YY | hh:mm:ss a">{n.createdAt}</Moment>
										</TableCell>
										<TableCell className="text-center hidden sm:table-cell">
											<Moment format="ddd do MMM, YY | hh:mm:ss a">{n.updatedAt}</Moment>
										</TableCell>
									</TableRow>
								);
							}))
						: 
						(
							<TableBody>
								<TableCell className="text-center hidden sm:table-cell" colSpan={3}>{"No Categories found"}</TableCell>
							</TableBody>
						)}
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

export default CategoryList;
