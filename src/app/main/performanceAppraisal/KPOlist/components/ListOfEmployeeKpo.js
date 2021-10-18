import EnhancedTable from 'app/shared/table/EnhancedTable';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';
import KpoStatus from './KpoStatus';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategory } from '../../KPOcategoryList/store/actions';
// import withReducer from 'app/store/withReducer';
// import kpoCategoryReducer from '../../KPOcategoryList/store/reducers/categoryList.reducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	employeeNameDiv: {
		// display: "flex",

		'& span': {
			display: 'block'
		}
	},
	requestModification: {
		backgroundColor: '#49CDCD',
		marginTop: '3%',
		borderRadius: 10,
		color: '#ffffff',
		fontSize: 11,
		padding: '3px 7px 3px 7px',
		width: 'fit-content'
	}
}));

const ListOfEmployeeKpo = ({ customHook, isAssigned, value, request, type, filterState }) => {
	const classes = useStyles();
	// const dispatch = useDispatch();
	// const entireState = useSelector(state => state);
	// const { data: kpoCategory } = useSelector(state => state.kpoCategory);

	// useEffect(() => {
	// 	dispatch(getAllCategory());
	// }, []);

	// useEffect(() => console.log(entireState, 'entireState'), [entireState]);

	function parseISOString(s) {
		let b = s.split(/\D+/);
		let date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
		//zero-pad a single zero if needed
		let zp = function (val) {
			return val <= 9 ? '0' + val : '' + val;
		};

		//zero-pad up to two zeroes if needed
		let zp2 = function (val) {
			return val <= 99 ? (val <= 9 ? '00' + val : '0' + val) : '' + val;
		};

		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		return '' + zp(d) + '-' + zp(m) + '-' + y;
	}

	const {
		// deptKpo,
		loading,
		handleDelete,
		push,
		assignedKpo,
		handleFilter,
		entities,
		role,
		kpoRequest,
		handleOpen,
		getKpos
	} = customHook;

	const columns = React.useMemo(() => [
		{
			Header: 'Employee Name',
			accessor: 'employeeName',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { employee }
				}
			}) => {
				return (
					<div className={` ${classes.employeeNameDiv}`}>
						<span>{`${employee?.firstName} ${employee?.lastName}`}</span>
						{employee.requestModification && (
							<span className={` ${classes.requestModification}`}>Request Modification</span>
						)}
					</div>
				);
			}
		},
		{
			Header: 'Email',
			accessor: 'email',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { employee }
				}
			}) => {
				return <>{employee?.email}</>;
			}
		},
		{
			Header: 'Job Title',
			accessor: 'jobTitleId',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { jobTitle }
				}
			}) => {
				return <>{jobTitle?.name}</>;
			}
		},
		{
			Header: 'Date Submitted',
			accessor: 'createdAt',
			Cell: ({
				row: {
					original: { createdAt }
				}
			}) => {
				return <>{parseISOString(createdAt)}</>;
			}
		},
		{
			Header: 'Line Manager',
			accessor: 'lineManager',
			sortable: true,
			Cell: ({
				row: {
					original: { lineManager }
				}
			}) => {
				return <>{`${lineManager?.firstName} ${lineManager?.lastName}`}</>;
			}
		},
		{
			Header: 'Reviewing Manager',
			accessor: 'reviewingManager',
			sortable: true,
			Cell: ({
				row: {
					original: { reviewingManager }
				}
			}) => {
				return <>{`${reviewingManager?.firstName} ${reviewingManager?.lastName}`}</>;
			}
		},
		{
			Header: 'Status',
			accessor: 'status',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row: { original } }) => {
				return <KpoStatus status={original?.status} />;
			}
		}
	]);

	const temporaryKpoList = [
		// REMOVE this temporaryKpoList
		{
			id: 1,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'First Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'pending',
			reviewingManager: {
				firstName: 'John',
				lastName: 'Travolta'
			},
			lineManager: {
				firstName: 'Boss',
				lastName: 'Manager'
			},
			employee: {
				email: 'jt@gmail.com',
				firstName: 'Naruto',
				lastName: 'Uzumaki',
				requestModification: true
			},
			jobTitle: {
				name: 'Software Dev'
			},
			createdAt: '2021-07-27T12:29:23.000Z'
		},
		{
			id: 2,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'Second Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'created',
			reviewingManager: {
				firstName: 'Damon',
				lastName: 'Salvatore'
			},
			lineManager: {
				firstName: 'Boss',
				lastName: 'Manager'
			},
			employee: {
				email: 'ds@gmail.com',
				firstName: 'Emiya',
				lastName: 'Shirou',
				requestModification: true
			},
			jobTitle: {
				name: 'Software Tester'
			},
			createdAt: '2021-07-27T11:29:23.000Z'
		},
		{
			id: 3,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'Second Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'completed',
			reviewingManager: {
				firstName: 'Stefan',
				lastName: 'Salvatore'
			},
			lineManager: {
				firstName: 'Zack',
				lastName: 'Salvatore'
			},
			employee: {
				email: 'sts@gmail.com',
				firstName: 'Sakura',
				lastName: 'Haruno',
				requestModification: false
			},
			jobTitle: {
				name: 'Software Developer'
			},
			createdAt: '2021-07-27T11:28:23.000Z'
		}
	];

	const [kposToDisplay, setKposToDisplay] = useState([]);
	useEffect(() => {
		// setKposToDisplay(getKpos(type));
		setKposToDisplay(temporaryKpoList);
	}, [type]);

	useEffect(() => console.log(kposToDisplay, 'kpo showing '), [kposToDisplay]);

	function filterByKpoCategory(kpoItem, kpoCategoryFilterId) {
		let answer;
		let filtered;

		if (kpoItem.kpoContent.length > 0) {
			filtered = kpoItem.kpoContent.filter(kpoContentItem => kpoContentItem.kpoCategoryId === kpoCategoryFilterId);
			if (filtered.length > 0) {
				answer = true;
			} else {
				answer = false;
			}
		} else {
			answer = false;
		}

		if (answer) {
			console.log(kpoItem);
			return kpoItem;
		}
	}

	useEffect(() => {
		const filteredKpoByCategory = [];
		if (filterState?.kpoCategoryFilter !== '') {
			kposToDisplay.map(dataToShow => {
				let value = filterByKpoCategory(dataToShow, filterState?.kpoCategoryFilter);
				if (value) {
					filteredKpoByCategory.push(value);
				}
			});
			console.log(filteredKpoByCategory);
			// setKposToDisplay([...filteredKpoByCategory]);
			setKposToDisplay(temporaryKpoList);
		} else if (filterState?.kpoCategoryFilter === '') {
			// setKposToDisplay(getKpos(type));
			setKposToDisplay(temporaryKpoList);
		}
	}, [filterState?.kpoCategoryFilter]);

	return (
		<>
			{loading ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<EnhancedTable
					columns={columns}
					data={
						isAssigned
							? assignedKpo
							: request
							? kpoRequest
							: filterState?.departmentFilter !== ''
							? kposToDisplay.filter(dataToShow => dataToShow.departmentId === filterState?.departmentFilter)
							: kposToDisplay
					}
					onRowClick={(ev, row) => {
						if (row && !request) {
							push(`/performance_appraisal/kpo/review/details/${row.original.id}`);
						} else {
							handleOpen(row.original);
						}
					}}
					checkbox={{
						showCheckbox: true,
						onClick: value => console.log(value),
						accessor: 'id'
					}}
					selectAll={value => console.log(value)}
					handleDelete={handleDelete}
					toolBar={
						!isAssigned &&
						role === 'hrmanager' && <Toolbar entities={entities} handleFilter={handleFilter} value={value} />
					}
				/>
			)}
		</>
	);
};

const Toolbar = ({ entities, handleFilter, value }) => {
	return (
		<Grid container spacing={1} className="w-2/5">
			<Grid item lg={5} md={4} sm={4} xs={4}>
				<SelectTextField label="Entities" className="mr-10" size="small" onChange={handleFilter} defaultValue={value}>
					{entities.map(({ entityName, id }) => (
						<MenuItem value={id} key={id}>
							{entityName}
						</MenuItem>
					))}
				</SelectTextField>
			</Grid>
		</Grid>
	);
};

// withReducer('kpoCategory', kpoCategoryReducer)(ListOfEmployeeKpo);
export default ListOfEmployeeKpo;
