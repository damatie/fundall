import React, { useState } from 'react';
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
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
	tableOuterDiv: {
		backgroundColor: '#F8F8F8 !important',
		padding: 30
	},
	tdCustom: {
		borderBottom: 'none'
	},
	thCustomImage: {
		visibility: 'hidden'
	},
	tdCustomImage: {
		width: '5%'
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
			  },
	customTableBody: {
		position: 'relative'
	},
	customTableRow: {
		backgroundColor: '#ffffff',
		position: 'relative',

		'&:hover': {
			backgroundColor: '#f8f8f8'
		}
	},
	hoverCardDiv: {
		position: 'absolute',
		width: 400,
		padding: 30,
		backgroundColor: '#ffffff',
		borderRadius: 20,
		boxShadow: '0 5px 10px rgb(154 160 185 / 5%), 0 15px 40px rgb(166 173 201 / 20%)'
	},
	hoverCardDivHeaderImage: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	imageDiv: {
		width: '20%'
	},
	image: {
		width: '100%',
		borderRadius: 10
	},
	role: {
		backgroundColor: '#effbff',
		height: 'fit-content',
		padding: '8px 30px',
		borderRadius: 5,
		color: '#98e7fc',
		fontWeight: 600
	},
	nameDiv: {
		marginTop: '7%'
	},
	name: {
		color: '#2d3037',
		fontSize: 22,
		fontWeight: 700
	},
	jobTitle: {
		fontWeight: 700,
		color: '#98e7fc',
		marginTop: '1%'
	},
	emailDiv: {
		marginTop: '10%',
		backgroundColor: '#ff5ba0',
		padding: 5,
		borderRadius: 8,
		paddingLeft: 15,
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center'
	},
	email: {
		marginLeft: '5%',
		fontSize: 18
	},
	inputBoxDiv: {
		backgroundColor: '#f3f3f3',
		width: 'fit-content',
		padding: '2px 13px',
		borderRadius: 8
	},
	inputBoxTitle: {
		color: '#cecece',
		fontSize: 10,
		fontWeight: 700
	},
	inputBoxText: {
		fontSize: 14,
		color: '#2d3037',
		fontWeight: 700
	},
	inputBoxDivMain: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: '5%'
	},
	firstInputBox: {
		marginTop: '4%'
	},
	secondInputBox: {
		// marginTop: '14%',
	},
	thirdInputBox: {
		// marginTop: '18%',
	},
	departmentInputBox: {
		maxWidth: '60%'
	},
	staffIdInputBox: {
		maxWidth: '30%',
		marginLeft: '5%'
	},
	staffIdInputBoxSpec: {
		display: 'flex'
	},
	phoneNumberInputBox: {
		maxWidth: '48%'
	},
	genderInputBox: {
		maxWidth: '20%'
	},
	gradeLevelInputBox: {
		maxWidth: '25%'
	},
	addressInputBox: {
		maxWidth: '70%'
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

const InputBoxes = ({ title, text, type }) => {
	const classes = useStyles();

	return (
		<div
			className={` ${classes.inputBoxDiv} ${
				type === 'dept'
					? classes.departmentInputBox
					: type === 'staffId'
					? classes.staffIdInputBox
					: type === 'phoneNo'
					? classes.phoneNumberInputBox
					: type === 'gender'
					? classes.genderInputBox
					: type === 'gradeLvl'
					? classes.gradeLevelInputBox
					: type === 'address' && classes.addressInputBox
			}`}
		>
			<span className={` ${classes.inputBoxTitle}`}>{title}</span>
			<p className={` ${classes.inputBoxText}`}>{text}</p>
		</div>
	);
};

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

	const [hoverCardProps, setHoverCardProps] = useState(null);
	const [hoverCardPosition, setHoverCardPosition] = useState({
		x: 0,
		y: 0
	});

	React.useEffect(() => console.log(hoverCardProps, 'hoverCardProps'), [hoverCardProps]);

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
							{headerGroup.headers.map((column, index) => (
								<TableCell
									className={`whitespace-no-wrap p-12 ${classes.tdCustom} ${index === 1 && classes.thCustomImage}`}
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
				<TableBody className={` ${classes.customTableBody}`}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<>
								<TableRow
									{...row.getRowProps()}
									onClick={ev => onRowClick(ev, row)}
									hover={true}
									onMouseOver={e => {
										// setHoverCardPosition({
										// 	x: Math.sign(calcXAxis) === 1 ? calcXAxis : 0,
										// 	y: /* Math.sign(calcXAxis) === 1 ? 30 : 80 */ /* window.innerHeight -  */ -17 /* e.clientY */
										// });
										if (!hoverCardProps) {
											if (row?.original?.id !== hoverCardProps?.id) {
												setHoverCardProps(row.original);
											}
										}
									}}
									onMouseOut={() => {
										setHoverCardProps(null);
									}}
									className={`truncate cursor-pointer ${classes.customTableRow}`}
								>
									{row.cells.map((cell, index) => {
										return (
											<TableCell
												{...cell.getCellProps()}
												className={clsx(
													'p-12',
													cell.column.className,
													{
														[classes.highlight]: selectedItems.some(id => id === row.original.id)
													},
													classes.tdCustom,
													index === 1 && classes.tdCustomImage
												)}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
									{hoverCardProps && hoverCardProps?.id === row.original.id && (
										<div style={{ position: 'fixed', zIndex: 1300, inset: 0, width: 400, height: 466, padding: 0 }}>
											<div
												aria-hidden={true}
												style={{
													zIndex: -1,
													position: 'fixed',
													inset: 0,
													backgroundColor: 'transparent',
													color: 'transparent',
													width: 400,
													height: 466,
													padding: 0
												}}
											></div>
											<div style={{ opacity: 1 }}>
												<div
													className={` ${classes.hoverCardDiv}`}
													style={{ left: /* hoverCardPosition.x */ 600, top: /* hoverCardPosition.y */ 200 }}
												>
													<div className={` ${classes.hoverCardDivHeaderImage}`}>
														<div className={` ${classes.imageDiv}`}>
															<img src={hoverCardProps.image} className={` ${classes.image}`} alt="employee" />
														</div>
														<p className={` ${classes.role}`}>{hoverCardProps.role}</p>
													</div>
													<div className={` ${classes.nameDiv}`}>
														<p className={` ${classes.name}`}>{hoverCardProps.employeeName}</p>
														<p className={` ${classes.jobTitle}`}>{hoverCardProps.jobTitle}</p>
													</div>
													<div className={` ${classes.emailDiv}`}>
														<MailIcon />
														<span className={` ${classes.email}`}>{hoverCardProps.employeeEmail}</span>
													</div>
													<div className={` ${classes.firstInputBox} ${classes.staffIdInputBoxSpec}`}>
														<InputBoxes title="Department" text={hoverCardProps.department} type="dept" />
														<InputBoxes title="Staff ID" text={hoverCardProps.staffId} type="staffId" />
													</div>
													<div className={` ${classes.secondInputBox} ${classes.inputBoxDivMain}`}>
														<InputBoxes title="Phone Number" text={hoverCardProps.contactNumber} type="phoneNo" />
														<InputBoxes title="Gender" text={hoverCardProps.gender} type="gender" />
														<InputBoxes title="Grade Level" text={hoverCardProps.gradeLevel} type="gradeLvl" />
													</div>
													<div className={` ${classes.thirdInputBox} ${classes.inputBoxDivMain}`}>
														<InputBoxes title="Address" text={hoverCardProps.address} type="address" />
													</div>
												</div>
											</div>
										</div>
									)}
									{/* {console.log(row.original)} */}
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
