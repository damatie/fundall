import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

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
			// onClick={() =>
			// 	props.history.push(
			// 		toPath({
			// 			...routeParams,
			// 			mailId: props.mail.id
			// 		})
			// 	)
			// }
			className={'py-16 px-8'}
		>
			<div className="flex flex-1 flex-col relative overflow-hidden">
				<div className="flex items-center justify-between px-16 pb-8">
					<div className="flex items-center">
						{props.data.avatar ? (
							<Avatar alt={props.data.name} src={props.data.avatar} />
						) : (
							<Avatar className={classes.avatar}>{props.data.name}</Avatar>
						)}
						<Typography variant="subtitle1" className="mx-8">
							{props.data.name}
						</Typography>
					</div>
					<Typography variant="subtitle1">{props.data.time}</Typography>
				</div>

				<div className="flex flex-col px-16 py-0">
					<Typography className="truncate">{props.data.subject}</Typography>
				</div>
			</div>
		</ListItem>
	);
};

export default withRouter(EmployeTab);
