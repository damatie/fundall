import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
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
import AddCourseModal from './addCourseModal';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
    root: {
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
}));

function DeptTraining(props) {
	const dispatch = useDispatch();
	const approvedTrainings = useSelector(({ DeptTraining }) => DeptTraining.trainings.approvedTrainings);
	const rejectedTrainings = useSelector(({ DeptTraining }) => DeptTraining.trainings.rejectedTrainings);
	const pendingTrainings = useSelector(({ DeptTraining }) => DeptTraining.trainings.pendingTrainings);
	const approvedCourses = useSelector(({ DeptTraining }) => DeptTraining.courses.approvedCourses);
	const rejectedCourses = useSelector(({ DeptTraining }) => DeptTraining.courses.rejectedCourses);
	const pendingCourses = useSelector(({ DeptTraining }) => DeptTraining.courses.pendingCourses);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const totalTrainings = approvedTrainings.concat(rejectedTrainings).concat(pendingTrainings);
	const totalCourses = approvedCourses.concat(rejectedCourses).concat(pendingCourses);

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);
	const [selectedProject, setSelectedProject] = useState({
		id: 1,
		menuEl: null
	});

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
            id: 1,
            name: "mike",
            type: "ghdhhbs",
            owner: "jsdbjcbkdsvnknkf",
            category: "skejdckjds",
            modified: "jhgfdf",
            status: "pending"
        },
        {
            id: 2,
            name: "test ttge",
            type: "ghdhhbs",
            owner: "jsdbjcbkdsvnknkf",
            category: "skejdckjds",
            modified: "jhgfdf",
            status: "approved"
        },
        {
            id: 3,
            name: "test ttge",
            type: "ghdhhbs",
            owner: "jsdbjcbkdsvnknkf",
            category: "skejdckjds",
            modified: "jhgfdf",
            status: "rejected"
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
                                <span className="text-24 mx-16">Department Training Management</span>
                            </FuseAnimate>
						<div className="flex flex-1 items-center justify-between px-12">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<AddCourseModal />
							</FuseAnimate>
						</div>
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
					<Tab className="text-14 font-600 normal-case" label="Department Training" />
					<Tab className="text-14 font-600 normal-case" label="Course Management" />
				</Tabs>
			}
			content={
				<div className="p-12">
					{tabValue === 0 && (
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
								<TableWidget title={"Department Training Requests"} type="default" columns={columns} rows={rows}/>
							</div>
						</FuseAnimateGroup>
					)}
						{tabValue === 1 && (
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
								<CoursesTableWidget title={"Department Course Management"} allowClick={false}  type="default" columns={coursesColumn} rows={totalCourses}/>
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

export default withReducer('DeptTraining', reducer)(DeptTraining);
