import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import * as UtilActions from '../../store/actions';
import reducer from './store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import SrepTable from './SrepTable';
import { useAuth } from 'app/hooks/useAuth';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

const columns = [
	{
		id: 'employee_name',
		align: 'center',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'email',
		align: 'center',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'job_role',
		align: 'center',
		disablePadding: false,
		label: 'Job Role',
		sort: true
	},
	{
		id: 'dept',
		align: 'center',
		disablePadding: false,
		label: 'Dept',
		sort: true
	},
	{
		id: 'entity',
		align: 'center',
		disablePadding: false,
		label: 'Entity',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: true
	}
];

const userId = useAuth().getId;
const userData = useAuth().getUserData;

function Srep(props) {
	const dispatch = useDispatch();
	const srep = useSelector(({ srep }) => srep.srep.data);
	const roles = useSelector(({ roles }) => roles.roleList);
	const departments = useSelector(({ departments }) => departments.deparmentList);
	const entities = useSelector(({ entities }) => entities.entityList);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	useEffect(() => {
		dispatch(UtilActions.getRoles());
		dispatch(UtilActions.getEntities());
		dispatch(UtilActions.getDepartments());
		if(userData.role.toUpperCase() === 'EMPLOYEE'){
			dispatch(Actions.getSrepByEmployeeID(userId));
		}else{
			dispatch(Actions.getSrep());
		}
	}, [dispatch]);

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
									<span className="text-24 mx-16">SpringRock Education Program</span>
								</FuseAnimate>
							</div>
						</div>
					</ThemeProvider>
				}
				content={
					<div className="p-12">
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={(srep.length > 0) ? srep.length : 0} title={'Total'} color="yellow" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={(srep.length > 0) ? srep.filter(t => t.status === 'pending').length : 0} title={'Pending'} color="blue" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={(srep.length > 0) ? srep.filter(t => t.status === 'approved').length : 0} title={'Approved'} color="green" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={(srep.length > 0) ? srep.filter(t => t.status === 'rejected').length : 0} title={'Rejected'} color="red" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget
									count={(srep.length > 0) ? srep.filter(t => t.status === 'reviewed').length : 0}
									title={'Reviewed'}
									color="orange"
								/>
							</div>
							{/* <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
								<CardWidget
									count={(srep.length > 0) ? srep.filter(t => t.status === 'completed').length: 0}
									title={'Completed'}
									color="black"
								/>
							</div> */}
							<div className="widget flex w-full p-12">
								<SrepTable
									title={'SpringRock Education Program list'}
									allowClick={true}
									// allowAuth={checkRole()}
									type="default"
									columns={columns}
									rows={srep}
									props={props}
									role={userData.role.toUpperCase()}
									roles={roles}
									departments={departments}
									entities={entities}
									userId={userId}
								/>
							</div>
						</FuseAnimateGroup>
					</div>
				}
			/>
		</ThemeProvider>
	);
}

export default withReducer('srep', reducer)(Srep);
