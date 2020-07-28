import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions/index';
import reducer from './store/reducers';
import Notifications from 'app/main/notifications/notification';
import notificationReducer from 'app/main/notifications/store/reducers';
import * as notificationActions from 'app/main/notifications/store/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
	root: {
		width: 300
	},
	grid: {
		padding: '.7rem',
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	const notifications = useSelector(({ notifications }) => notifications.notifications);

	const classes = useStyles();

	useEffect(() => {
		dispatch(notificationActions.getNotifications());
	}, [])

	return (
		<Drawer
			classes={{ paper: classes.root }}
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleQuickPanel())}
			color='primary'
		>
			<Grid container spacing={1} alignItems='center' className={classes.grid}>
				<Grid item lg={6} sm={6} md={6}>
					<Typography variant="h6" color="initial">Notifications</Typography>
				</Grid>
				<Grid item lg={6} sm={6} md={6}>
					<Button variant="text" color="default" size='small' style={{float: 'right'}}>
						Mark as Read
					</Button>
				</Grid>
			</Grid>
			<FuseScrollbars>
				{
					notifications.data.map(item => (<Notifications data={item} />))
				}
			</FuseScrollbars>
		</Drawer>
	);
}

withReducer('notifications', notificationReducer)(QuickPanel);
export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
