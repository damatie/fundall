import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import EnhancedTablePaginationActions from './components/EnhancedTablePaginationActions';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	tableOuterDiv: {
		backgroundColor: '#F8F8F8 !important',
		padding: 30
	},
	tdCustom: {
		borderBottom: 'none'
	},
	bg: {
		background: '#fff'
	},
	title: {
		flex: '1 1 100%'
	},
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.6)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  }
}));
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest} />
		</>
	);
});

let globalArray = [];
const PromotionalKpoTable = ({ columns, data, onRowClick, checkbox, selectAll, toolBar, handleDelete, pagination }) => {
	const [selectedItems, setSelectedItems] = React.useState([]);
	// add or remove table row id to selectedItems state
	const handleCheckbox = id => {
		const newSelectedItems = selectedItems.length === 0 ? globalArray : selectedItems;
		const index = selectedItems.length === 0 ? globalArray.indexOf(id) : selectedItems.indexOf(id);
		index === -1 ? newSelectedItems.push(id) : newSelectedItems.splice(index, 1);
		setSelectedItems(newSelectedItems);
	};

	//add all table rows id to selectedItems state
	const handleCheckAll = items => {
		const arr = items.map(item => item.id);
		setSelectedItems(arr);
		globalArray = arr;
	};

	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns =>
				checkbox?.showCheckbox
					? [
							// Let's make a column for selection
							{
								id: checkbox?.accessor,
								sortable: false,
								accessor: checkbox?.accessor,
								// The header can use the table's getToggleAllRowsSelectedProps method
								// to render a checkbox.  Pagination is a problem since this will select all
								// rows even though not all rows are on the current page.  The solution should
								// be server side pagination.  For one, the clients should not download all
								// rows in most cases.  The client should only download data for the current page.
								// In that case, getToggleAllRowsSelectedProps works fine.
								Header: ({ getToggleAllRowsSelectedProps, rows }) => (
									<div>
										<IndeterminateCheckbox
											{...getToggleAllRowsSelectedProps()}
											onClick={e => {
												const result = rows.map(item => item.values);
												handleCheckAll(e.target.checked ? result : []);
												checkbox && selectAll(result);
											}}
										/>
									</div>
								),
								// The cell can use the individual row's getToggleRowSelectedProps method
								// to the render a checkbox
								Cell: ({ row }) => (
									<div>
										<IndeterminateCheckbox
											{...row.getToggleRowSelectedProps()}
											onClick={ev => {
												ev.stopPropagation();
												handleCheckbox(row.values.id);
												checkbox && checkbox.onClick(row.values);
											}}
										/>
									</div>
								)
							},
							..._columns
					  ]
					: [..._columns]
			);
		}
	);

	const handleChangePage = (event, newPage) => {
		pagination?.gotoPage(newPage) || gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		pagination?.setPageSize(Number(event.target.value)) || setPageSize(Number(event.target.value));
	};

	const DeleteRow = () => {
		handleDelete(selectedItems);
		setSelectedItems([]);
	};

	const classes = useStyles();

	// Render the UI for your table
	return (
		<TableContainer className={clsx('min-h-full sm:border-1 sm:rounded-8 rounded-8', classes.tableOuterDiv)}>
			{toolBar || selectedItems.length > 0 ? (
				<Toolbar
					className={clsx(classes.root, {
						[classes.highlight]: selectedItems.length > 0
					})}
				>
					{selectedItems.length > 0 ? (
						<>
							<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
								{selectedItems.length}
							</Typography>
							<IconButton
								onClick={() => {
									handleDelete && DeleteRow(selectedItems);
								}}
							>
								<Icon>delete</Icon>
							</IconButton>
						</>
					) : (
						toolBar
					)}
				</Toolbar>
			) : (
				<></>
			)}
			<MaUTable {...getTableProps()} className={` ${classes.table}`}>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell
									className={`whitespace-no-wrap p-12 ${classes.tdCustom}`}
									{...(!column.sortable
										? column.getHeaderProps()
										: column.getHeaderProps(column.getSortByToggleProps()))}
								>
									{column.render('Header')}
									{column.sortable ? (
										<TableSortLabel
											active={column.isSorted}
											// react-table has a unsorted state which is not treated here
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<>
								<TableRow
									{...row.getRowProps()}
									onClick={ev => onRowClick(ev, row)}
									onHover={() => console.log('hovered')}
									hover={true}
									className="truncate cursor-pointer"
									style={{ backgroundColor: '#ffffff' }}
								>
									{row.cells.map(cell => {
										return (
											<TableCell
												{...cell.getCellProps()}
												className={clsx(
													'p-12',
													cell.column.className,
													{
														[classes.highlight]: selectedItems.some(id => id === row.original.id)
													},
													classes.tdCustom
												)}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
								<br />
							</>
						);
					})}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							classes={{
								root: 'overflow-hidden',
								spacer: 'w-0 max-w-0'
							}}
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: pagination?.limit || data.length + 1 }]}
							colSpan={5}
							count={pagination?.count || data.length}
							rowsPerPage={pagination?.limit || pageSize}
							page={pagination?.offset || pageIndex}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: false
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={EnhancedTablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</MaUTable>
		</TableContainer>
	);
};

PromotionalKpoTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default PromotionalKpoTable;
