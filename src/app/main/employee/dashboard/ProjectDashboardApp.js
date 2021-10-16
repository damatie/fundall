import React from 'react';
import { makeStyles } from '@material-ui/core';

// Components
import HRDashboard from './components/hr';
import EmployeeDashboard from './components/employee';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		padding: '4rem'
	}
}));

function ProjectDashboardApp(props) {
	const admin = true;
	const classes = useStyles();

	return <div className={classes.root}>{admin ? <HRDashboard /> : <EmployeeDashboard />}</div>;
}

export default ProjectDashboardApp;
