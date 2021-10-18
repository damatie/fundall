import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import ListOfEmployeeKpo from './components/ListOfEmployeeKpo';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useKpoReview from './hooks/useKpoReview';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getKpoByDept,
	getAssignedKpo,
	getKpoByEntity,
	getEntities,
	getKpoByStatus,
	getAllKposByLineManager
} from './store/actions';
import userRole from 'utils/userRole';
import KpoRequestModal from './components/KpoRequestModal';
import { Controller } from 'react-hook-form';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import { Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getAllCategory } from '../KPOcategoryList/store/actions';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import departmentsReducer from 'app/main/HR/business_unit/department/store/reducers/departments.reducer';
import { getDepartments } from 'app/main/HR/business_unit/department/store/actions';
import CenterModal from 'app/shared/modal/CenterModal';
import PromotionalKpoRequesterProfile from './components/PromotionalKpoRequesterProfile';

const useStyles = makeStyles(theme => ({
	toolBarDiv: {
		width: '90%',
		margin: 'auto',
		display: 'flex',
		justifyContent: 'space-between',

		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
			height: '100%'
		}
	},
	tabsDiv: {
		width: '45%',
		border: '1px solid #f4f4f4',
		backgroundColor: '#f4f4f4',

		[theme.breakpoints.down('sm')]: {
			width: '70%'
		},

		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	},
	tabItself: {
		fontWeight: '600 !important'
	},
	filterSelectDiv: {
		width: '45%',
		display: 'flex',
		justifyContent: 'space-between',

		[theme.breakpoints.down('sm')]: {
			width: '70%'
		},

		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	},
	singleFilterSelect: {
		width: '45% !important'
	},
	modificationRequest: {
		marginTop: '-9%'
	},
	modificationRequestIcon: {
		backgroundColor: 'red',
		color: '#ffffff',
		position: 'absolute',
		right: '1%',
		borderRadius: '50%',
		padding: '3px 5px 3px 5px',
		fontSize: 10,
		fontWeight: 800,
		top: '3%'
	}
}));

const EmployeeKpoReview = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);
	const kpoList = useSelector(state => state.kpo.kpoReview);
	const userInfo = useSelector(state => state.profile?.data);
	const dispatch = useDispatch();
	const { push } = useHistory();

	const { data: kpoCategory } = useSelector(state => state.kpoCategory);
	const departmentsToUseToFilter = useSelector(state => state.kpo.departments.data);
	const { entityId, departmentId } = useSelector(state => state.profile.data);

	React.useEffect(() => {
		dispatch(getAllCategory());
	}, []);
	React.useEffect(() => {
		console.log(entityId, 'entityId');
		dispatch(getDepartments(entityId));
	}, [entityId]);

	React.useEffect(() => console.log(kpoCategory, 'kpoCategory'), [kpoCategory]);
	React.useEffect(() => console.log(departmentsToUseToFilter, 'departments'), [departmentsToUseToFilter]);

	React.useEffect(() => {
		if (userRole(userInfo.role?.name) === 'linemanager') {
			dispatch(getKpoByDept(userInfo.departmentId));
		}
		dispatch(getAssignedKpo());
	}, [userInfo]);

	React.useEffect(() => {
		if (userRole(userInfo.role?.name) === 'hrmanager') {
			dispatch(getEntities(userInfo.entityId));
			dispatch(getKpoByStatus({ status: 'requested', requested: true }));
		}
	}, [userInfo]);

	React.useEffect(() => {
		dispatch(getAllKposByLineManager());
	}, []);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	const value = useKpoReview({
		dispatch,
		push,
		kpoList,
		userInfo
	});

	const [selectFilterState, setSelectFilterState] = React.useState({
		kpoCategoryFilter: '',
		departmentFilter: ''
	});

	const handleSelectFilterChange = e => {
		const { name, value } = e.target;

		setSelectFilterState({
			...selectFilterState,
			[name]: value
		});
	};

	React.useEffect(() => console.log(selectFilterState, 'selectFilterState'), [selectFilterState]);
	React.useEffect(() => console.log(tabValue, 'tabValue'), [tabValue]);

	const [togglePromotionalKpoRequest, setTogglePromotionalKpoRequest] = React.useState(true);
	const kpoRequester = {
		image: `${process.env.PUBLIC_URL}/assets/images/avatars/Velazquez.jpg`,
		firstName: 'Naruto',
		lastName: 'Uzumaki',
		jobTitle: 'Recruitment Officer',
		email: 'naruto@email.com',
		entity: 'Cbit Industries',
		department: 'Dev Ops',
		lineManager: 'Tommy Shelby',
		reviewingManager: 'Jane Doe',
		staffId: 'SRG001'
	};

	return (
		<PageLayout
			header={{
				icon: '',
				title: 'KPO List',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			customToolBarClass={true}
			button={{
				showButton: false
			}}
			contentToolbar={
				<div className={classes.toolBarDiv}>
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: ' h-64' }} /* w-full */
						className={classes.tabsDiv}
					>
						<Tab className={` h-64 normal-case ${classes.tabItself}`} label="Pending KPO" />
						<Tab className={` h-64 normal-case ${classes.tabItself}`} label="Active KPO" />
						{userRole(userInfo.role?.name) === 'hrmanager' && (
							<Tab className={` h-64 normal-case ${classes.tabItself}`} label="KPO Creation Request" />
						)}
						<Tab className={` h-64 normal-case ${classes.tabItself}`} label="Completed KPO" />
						<Tab className={` h-64 normal-case ${classes.tabItself}`} label="Promotional KPO" />
						<Tab
							className={` h-64 normal-case ${classes.tabItself}`}
							label={<span className={` ${classes.modificationRequest}`}>Modification Request</span>}
							icon={<span className={` ${classes.modificationRequestIcon}`}>24</span>}
						/>
					</Tabs>
					<div className={classes.filterSelectDiv}>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="kpoCategoryFilter"
								label="KPO Category"
								onChange={handleSelectFilterChange}
								value={selectFilterState.kpoCategoryFilter}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{kpoCategory?.length > 0 &&
									[{ name: 'Default Selection', id: '' }, ...kpoCategory].map(({ name, id }) => (
										<MenuItem value={id} key={id}>
											{name}
										</MenuItem>
									))}
							</SelectTextField>
						</div>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="departmentFilter"
								label="Department"
								value={selectFilterState.departmentFilter}
								onChange={handleSelectFilterChange}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{departmentsToUseToFilter?.length > 0 &&
									[{ departmentName: 'Default Selection', id: '' }, ...departmentsToUseToFilter].map(
										({ departmentName, id }) => (
											<MenuItem value={id} key={id}>
												{departmentName}
											</MenuItem>
										)
									)}
							</SelectTextField>
						</div>
					</div>
				</div>
			}
			content={
				<div className="p-24">
					{tabValue === 0 && (
						<ListOfEmployeeKpo
							customHook={value}
							value={userInfo.entityId}
							type="pending"
							filterState={selectFilterState}
						/>
					)}
					{tabValue === 1 && <ListOfEmployeeKpo customHook={value} type="active" filterState={selectFilterState} />}
					{(userRole(userInfo.role?.name) === 'hrmanager' ? tabValue === 2 : tabValue === 3) && (
						<>
							<ListOfEmployeeKpo customHook={value} request filterState={selectFilterState} />
							<KpoRequestModal customHook={value} />
						</>
					)}
					{(userRole(userInfo.role?.name) === 'hrmanager' ? tabValue === 3 : tabValue === 2) && (
						<ListOfEmployeeKpo
							customHook={value}
							value={userInfo.entityId}
							type="completed"
							filterState={selectFilterState}
						/>
					)}
					{tabValue === 3 && (
						<div>
							<Button variant="contained" color="primary" onClick={() => setTogglePromotionalKpoRequest(true)}>
								SHOW THE MODAL AGAIN
							</Button>
							<CenterModal
								open={togglePromotionalKpoRequest}
								handleClose={() => setTogglePromotionalKpoRequest(false)}
								title="Promotional KPO"
							>
								<PromotionalKpoRequesterProfile userData={kpoRequester} />
							</CenterModal>
						</div>
					)}
					{tabValue === 4 && (
						<ListOfEmployeeKpo
							customHook={value}
							value={userInfo.entityId}
							type="pending"
							filterState={selectFilterState}
						/>
					)}
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoReview);
withReducer('departments', departmentsReducer)(EmployeeKpoReview);
export default withReducer('kpo', reducer)(EmployeeKpoReview);
