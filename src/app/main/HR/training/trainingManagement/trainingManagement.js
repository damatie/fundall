import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import TableWidget from 'app/shared/widgets/TableWidget';
import CoursesTableWidget from 'app/shared/widgets/CoursesTableWidget';
import FuseAnimate from '@fuse/core/FuseAnimate';

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
          marginTop: theme.spacing(2),
        },
    }
}));

function TrainingManagement(props) {
	const dispatch = useDispatch();
	const approvedTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.approvedTrainings);
	const rejectedTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.rejectedTrainings);
	const pendingTrainings = useSelector(({ TrainingManagement }) => TrainingManagement.trainings.pendingTrainings);
	const approvedCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.approvedCourses);
	const rejectedCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.rejectedCourses);
	const pendingCourses = useSelector(({ TrainingManagement }) => TrainingManagement.courses.pendingCourses);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const totalTrainings = approvedTrainings.concat(rejectedTrainings).concat(pendingTrainings);
	const totalCourses = approvedCourses.concat(rejectedCourses).concat(pendingCourses);

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		dispatch(Actions.getApprovedTraining());
		dispatch(Actions.getRejectedTraining());
		dispatch(Actions.getPendingTraining());
		dispatch(Actions.getApprovedCourses());
		dispatch(Actions.getPendingCourses());
		dispatch(Actions.getRejectedCourses());
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

    function handleReject(event, id){
        dispatch(Actions.rejectCourse(id))
    }

    function handleApprove(event, id){
		dispatch(Actions.approveCourse(id))
	}

    const columns = [
        {
            id: 'name',
            align: 'center',
            disablePadding: false,
            label: 'Name',
            sort: true
        },
        {
            id: 'type',
            align: 'center',
            disablePadding: false,
            label: 'Type',
            sort: true
        },
        {
            id: 'owner',
            align: 'center',
            disablePadding: false,
            label: 'Owner',
            sort: true
        },
        {
            id: 'category',
            align: 'center',
            disablePadding: false,
            label: 'Category',
            sort: true
        },
        {
            id: 'modified',
            align: 'center',
            disablePadding: false,
            label: 'Modified',
            sort: true
        },
        {
            id: 'status',
            align: 'center',
            disablePadding: false,
            label: 'Status',
            sort: true
        }
	];
	const coursesColumn = [
        {
            id: 'name',
            align: 'center',
            disablePadding: false,
            label: 'Name',
            sort: true
        },
        {
            id: 'cost',
            align: 'center',
            disablePadding: false,
            label: 'Cost',
            sort: true
        },
        {
            id: 'duration',
            align: 'center',
            disablePadding: false,
            label: 'Duration',
            sort: true
        },
        {
            id: 'category',
            align: 'center',
            disablePadding: false,
            label: 'Category',
            sort: true
        },
        {
            id: 'created',
            align: 'center',
            disablePadding: false,
            label: 'Created',
            sort: true
        },
        {
            id: 'status',
            align: 'center',
            disablePadding: false,
            label: 'Status',
            sort: true
        }
    ];
    const rows = [
		{
		  "employeeId": 17,
		  "trainingCourseId": 1,
		  "departmentHead": 7,
		  "hrManager": null,
		  "status": "approved",
		  "startDate": "24-07-2020",
		  "endDate": "23-10-2020",
		  "createdAt": "2020-07-23T18:26:25.831Z",
		  "updatedAt": "2020-07-23T19:04:16.718Z",
		  "employee": {
			"firstName": "sidney",
			"lastName": "sid"
		  },
		  "trainingCourse": {
			"id": 1,
			"name": "system architecture",
			"certification": true,
			"cost": "$250",
			"location": "Online",
			"duration": " 3 months",
			"category": "external",
			"department": "IT",
			"hrManager": 4,
			"status": "approved",
			"createdAt": "2020-07-23T16:53:52.080Z",
			"updatedAt": "2020-07-23T16:55:47.428Z"
		  }
		},
		{
		  "employeeId": 17,
		  "trainingCourseId": 1,
		  "departmentHead": 7,
		  "hrManager": 4,
		  "status": "approved",
		  "startDate": "24-07-2020",
		  "endDate": "23-10-2020",
		  "createdAt": "2020-07-23T18:28:32.211Z",
		  "updatedAt": "2020-07-23T19:04:16.718Z",
		  "employee": {
			"firstName": "sidney",
			"lastName": "sid"
		  },
		  "trainingCourse": {
			"id": 1,
			"name": "system architecture",
			"certification": true,
			"cost": "$250",
			"location": "Online",
			"duration": " 3 months",
			"category": "external",
			"department": "IT",
			"hrManager": 4,
			"status": "approved",
			"createdAt": "2020-07-23T16:53:52.080Z",
			"updatedAt": "2020-07-23T16:55:47.428Z"
		  }
		}
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
							<CardWidget count={totalTrainings.length} title={"Total"} color="blue" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<CardWidget count={pendingTrainings.length} title={"Pending"} color="yellow" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<CardWidget count={approvedTrainings.length} title={"Approved"} color="green" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<CardWidget count={rejectedTrainings.length} title={"Rejected"} color="red" />
						</div>
						<div className="widget flex w-full p-12">
							<TableWidget title={"Training Requests"} type="default" columns={columns} rows={rows}/>
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
								<CardWidget count={totalCourses.length} title={"Total"} color="blue" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={pendingCourses.length} title={"Pending"} color="yellow" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={approvedCourses.length} title={"Approved"} color="green" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={rejectedCourses.length} title={"Rejected"} color="red" />
							</div>
                            <div className="widget flex w-full p-12">
								<CoursesTableWidget title={"Course list"} allowClick={true} 
								handleApprove={handleApprove} handleReject={handleReject} 
								type="default" columns={coursesColumn} rows={totalCourses}
								/>
							</div>
						</FuseAnimateGroup>
					)}
				</div>
			}
			ref={pageLayout}
		/>
        </ThemeProvider>
	);
}

export default withReducer('TrainingManagement', reducer)(TrainingManagement);
