import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
// import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import * as TrainingListActions from '../../../personalTraining/store/actions';
import reducer from './store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import TrainingTableWidget from 'app/shared/widgets/TrainingTableWidget';
import CoursesTableWidget from 'app/shared/widgets/CoursesTableWidget';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useAuth } from 'app/hooks/useAuth';
import AddNewTrainingDialogue from 'app/main/personalTraining/components/addNewTraining';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import * as CoursesAction from '../../../personalTraining/store/actions';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	},
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

function TrainingManagement(props) {
	const dispatch = useDispatch();
	const history = useHistory();

	const approvedTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.approvedTrainings);
	const rejectedTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.rejectedTrainings);
	const reviewedTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.reviewedTrainings);

	let totalCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.totalCourses.rows);
	// const approvedCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.approvedCourses);
	// const rejectedCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.rejectedCourses);
	// const pendingCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.pendingCourses);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const [data, setData] = useState(null);

	const roles = useSelector(({ TrainingManagement }) => TrainingManagement.categories.roles);
	const entities = useSelector(({ TrainingManagement }) => TrainingManagement.categories.entities);
	const departments = useSelector(({ TrainingManagement }) => TrainingManagement.categories.departments);
	const categories = useSelector(({ TrainingManagement }) => TrainingManagement.categories.data.rows);

	const [addNew, setAddNew] = useState(false);

	//Appending All trainings into one array of object
	let totalTrainings = reviewedTrainings.concat(approvedTrainings).concat(rejectedTrainings);

	//Sorting the appended Trainings
	totalTrainings = totalTrainings.sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});

	//Appending All courses into one array of object
	// let totalCourses = approvedCourses.concat(rejectedCourses).concat(pendingCourses);

	//Sorting the appended courses
	totalCourses = totalCourses?.sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});

	useEffect(() => {
		// console.log(totalCourses, state);
	}, [addNew, data])

	const submitNewTraining = (value) => {
		console.log("i run submitting")
		dispatch(TrainingListActions.createTraining(value, history));
		// handleCloseNew();
	}

	const changeDepartment = (id) => {
		dispatch(TrainingListActions.getDepartments(id));
	}

	function handleCloseNew() {
		setData(null);
		setAddNew(false);
	}

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);

	const userData = useAuth().getUserData;

	useEffect(() => {
		dispatch(Actions.getReviewedTraining());
		dispatch(Actions.getApprovedTraining());
		dispatch(Actions.getRejectedTraining());

		dispatch(Actions.getAllCourses());

		dispatch(Actions.getRoles());
		dispatch(Actions.getCategories());
		dispatch(Actions.getEntities());
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function checkRole() {
		return userData.role.toLowerCase() === 'hr manager';
	}

	// function checkHODRole() {
	// 	return (userData.role.toUpperCase() === 'HEAD OF DEPARTMENT' || userData.role.toUpperCase() === 'LINE MANAGERS');
	// }

	function handleCourseReject(ev, id) {
		dispatch(Actions.rejectCourse(id));
	}

	function handleCourseDelete(id) {
		dispatch(Actions.deleteCourse(id));
	}

	function handleCourseApprove(ev, id) {
		dispatch(Actions.approveCourse(id));
	}

	function handleTrainingReject(ev, id) {
		dispatch(Actions.rejectTraining(id));
	}

	function handleTrainingApprove(ev, id) {
		dispatch(Actions.approveTraining(id));
	}

	function updateTraining(payload, id) {
		dispatch(CoursesAction.updateTraining(payload, id))
		handleCloseNew();
	}

	const columns = [
		{
			id: 'name',
			align: 'left',
			disablePadding: false,
			label: 'Employee Name',
			sort: true
		},
		{
			id: 'course_name',
			align: 'left',
			disablePadding: false,
			label: 'Training Name',
			sort: true
		},
		{
			id: 'cost',
			align: 'left',
			disablePadding: false,
			label: 'Cost',
			sort: true
		},
		{
			id: 'start_date',
			align: 'left',
			disablePadding: false,
			label: 'Start Date',
			sort: true
		},
		{
			id: 'end_date',
			align: 'left',
			disablePadding: false,
			label: 'End Date',
			sort: true
		},
		{
			id: 'status',
			align: 'left',
			disablePadding: false,
			label: 'Status',
			sort: true
		}
	];

	const coursesColumn = [
		{
			id: 'name',
			align: 'left',
			disablePadding: false,
			label: 'Course Name',
			sort: true
		},
		{
			id: 'description',
			align: 'left',
			disablePadding: false,
			label: 'Description',
			sort: true
		},
		{
			id: 'category',
			align: 'left',
			disablePadding: false,
			label: 'Category',
			sort: true
		},
		{
			id: 'entity',
			align: 'left',
			disablePadding: false,
			label: 'Entity',
			sort: true
		},
		{
			id: 'department',
			align: 'left',
			disablePadding: false,
			label: 'Department',
			sort: true
		},
		{
			id: 'location',
			align: 'left',
			disablePadding: false,
			label: 'Location',
			sort: true
		},
		{
			id: 'cost',
			align: 'left',
			disablePadding: false,
			label: 'Cost',
			sort: true
		},
		{
			id: 'created',
			align: 'left',
			disablePadding: false,
			label: 'Created',
			sort: true
		},
		// {
		// 	id: 'status',
		// 	align: 'center',
		// 	disablePadding: false,
		// 	label: 'Status',
		// 	sort: true
		// }
	];

	return (
		<ThemeProvider theme={mainTheme}>
			<FusePageSimple
				classes={{
					root: 'bg-red',
					header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					rightSidebar: 'w-320',
					toolbar: 'min-h-48 h-48',
					content: classes.content
				}}
				header={
					<ThemeProvider theme={mainTheme}>
						<div className="flex flex-col items-center justify-between flex-1 px-24 pt-24">
							<div className="flex items-center w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<Icon className="text-32">school</Icon>
								</FuseAnimate>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<span className="text-24 mx-16">Training Management</span>
								</FuseAnimate>
							</div>
							<div className="flex justify-end items-center w-full">
								<Button variant="contained" color="secondary" type="submit" className="m-12" onClick={() => setAddNew(true)}>
									Add New Training
								</Button>
							</div>
						</div>
					</ThemeProvider>
				}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="off"
						className="w-full border-b-1 px-24"
					>
						<Tab className="text-14 font-600 normal-case" label="Course Management" />
						<Tab className="text-14 font-600 normal-case" label="Training Management" />
					</Tabs>
				}
				content={
					<div className="p-12">
						{tabValue === 1 && (
							<FuseAnimateGroup
								className="flex flex-wrap"
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
							>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={totalTrainings.length} title={'Total'} color="black" />
								</div>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={reviewedTrainings.length} title={'Reviewed'} color="orange" />
								</div>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={approvedTrainings.length} title={'Approved'} color="green" />
								</div>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={rejectedTrainings.length} title={'Rejected'} color="red" />
								</div>
								<div className="widget flex w-full p-12">
									<TrainingTableWidget
										fromTrainingMgt
										title={'Training Requests'}
										type="default"
										columns={columns}
										rows={totalTrainings}
										allowAuth={!checkRole()}
										isHR={checkRole()}
										handleReject={handleTrainingReject}
										handleApprove={handleTrainingApprove}
									/>
								</div>
							</FuseAnimateGroup>
						)}
						{tabValue === 0 && (
							<FuseAnimateGroup
								className="flex flex-wrap"
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
							>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={totalCourses?.length ?? 0} title={'Total'} color="yellow" />
								</div>
								{/* <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={pendingCourses.length} title={'Pending'} color="blue" />
								</div>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={approvedCourses.length} title={'Approved'} color="green" />
								</div>
								<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
									<CardWidget count={rejectedCourses.length} title={'Rejected'} color="red" />
								</div> */}
								<div className="widget flex w-full p-12">
									<CoursesTableWidget
										title={'Course list'}
										allowClick={true}
										handleApprove={handleCourseApprove}
										handleReject={handleCourseReject}
										deleteCourse={handleCourseDelete}
										allowAuth={checkRole()}
										type="default"
										columns={coursesColumn}
										rows={totalCourses ? totalCourses : []}
										changeEdit={setAddNew}
										setData={setData}
									/>
								</div>
							</FuseAnimateGroup>
						)}
					</div>
				}
				ref={pageLayout}
			/>
			<AddNewTrainingDialogue
				open={addNew}
				handleClose={handleCloseNew}
				viewer={"Hr Manager"}
				categories={categories}
				entities={entities}
				departments={departments}
				roles={roles}
				submit={submitNewTraining}
				update={updateTraining}
				data={data}
				changeDepartment={changeDepartment}
			/>
		</ThemeProvider>
	);
}
export default withReducer('TrainingManagement', reducer)(TrainingManagement);