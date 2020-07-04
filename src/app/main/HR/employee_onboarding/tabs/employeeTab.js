import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import moment from 'moment'

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	mailItem: {
		borderBottom: `1px solid  ${theme.palette.divider}`,

		'&.unread': {
			background: 'rgba(0,0,0,0.03)'
		},
		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	avatar: {
		backgroundColor: theme.palette.primary[500]
	}
}));

const EmployeTab = props => {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const classes = useStyles(props);

	return (
		<ListItem
			dense
			button
			onClick={() =>
				props.history.push(
					`/hr/employee_onboarding_list/employee/${props.data.employeeId}`
				)
			}
			className={'py-16 px-8'}
		>
			<div className="flex flex-1 flex-col relative overflow-hidden">
				<div className="flex items-center justify-between px-16 pb-8">
					<div className="flex items-center">
						{props.index === 1 ?	<Avatar alt={'props.data.name'} src={'assets/images/avatars/vincent.jpg'} /> : <Avatar alt={'props.data.name'} src={'assets/images/avatars/andrew.jpg'} />}
						<Typography variant="subtitle1" className="mx-8">
							{props.index === 1 ? 'Dave' : 'David'}
						</Typography>
					</div>
					<MailChip color='gold' className='' title='pending'/>
					<Typography variant="subtitle1">{moment(props.data.createdAt).format("dddd, MMMM Do YYYY")}</Typography>
				</div>
			</div>
		</ListItem>
	);
};

const useStyles2 = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		height: 21,
		borderRadius: 2,
		padding: '0 6px',
		fontSize: 11,
		backgroundColor: 'rgba(0,0,0,.08);'
	},
	color: {
		width: 8,
		height: 8,
		marginRight: 4,
		borderRadius: '50%'
	}
}));

function MailChip(props) {
	const classes = useStyles2();

	return (
		<div className={clsx(classes.root, props.className)}>
			<div className={classes.color} style={{ backgroundColor: props.color }} />
			<div>{props.title}</div>
		</div>
	);
}


export default withRouter(EmployeTab);
