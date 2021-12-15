import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import EnrollmentListTableHead from './EnrollmentListTableHead';
import SharedTableHead from 'app/shared/sharedTableHead';
import { useDispatch, useSelector } from 'react-redux';


function EnrollmentListTable(props) {
	const entities = useSelector(({ entities }) => entities.entityList) ?? [];
    const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [data, setData] = useState(null);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

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

	useEffect(() => {
		setData(props.data);
		// console.log(props.data)
	}, [props.data])


	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
                    <EnrollmentListTableHead
						numSelected={selected.length}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={(data) ? data.length : 0}
						rows={props.rows}
						success={true}
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
							.map((n, index) => {
                                const isSelected = selected.indexOf(n.id) !== -1;
								return (<TableRow className="h-64 cursor-pointer"
										hover
										aria-checked={isSelected}
										tabIndex={-1}
										key={index * Math.random()}
										selected={isSelected}
										onClick={event => props.handleClick(n)}><TableCells type={props.type} data={n} rows={props.rows}/></TableRow>);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="overflow-hidden"
				component="div"
				count={(data) ? data.length : 0}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{ 'aria-label': 'Previous Page' }}
				nextIconButtonProps={{ 'aria-label': 'Next Page' }}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

// Table Cells
const TableCells = (props) => {
	switch (props.type) {
		case 'default': {
			return  (<>{ props.rows.map((item, index) => (
                                <Fragment key={index}> { item.type === 'date'
                                    ? <TableCell component="th" scope="row" align={item.align} key={item.id}>{props.data[item.field]}</TableCell> : item.id === 'amount' 
                                    ? <TableCell component="th" scope="row" align={item.align} key={item.id}>{formatToNaira(props.data[item.field])}</TableCell> : item.id === 'status' 
                                    ? <TableCell component="th" scope="row" align={item.align} key={item.id}><LoanStatus status={props.data[item.field]}/></TableCell> : item.id === 'name' 
									? <TableCell className="whitespace-no-wrap" component="th" scope="row" align={item.align} key={item.id}>{props.data[item.field]}</TableCell>  
                                    : <TableCell component="th" scope="row" align={item.align} key={item.id}>{props.data[item.field]}</TableCell>
                                }</Fragment> ))
                        }
                    </>);
        }
		default: { break; }
	};
};

// : item.id === 'entity'? <TableCell className="whitespace-no-wrap" component="th" scope="row" align={item.align} key={item.id}>{props.data[item.newId]}</TableCell>

export default withRouter(EnrollmentListTable);