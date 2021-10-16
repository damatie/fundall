import React, { Fragment } from 'react';
import { Grid, Chip, Typography, Divider, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuVerticalIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

// Components
import Card from './card';

const useStyles = makeStyles(() => ({
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}));

const events = [
	{
		title: 'SERG Monthly Workshop',
		time: Date('13/09/2021'),
		heading: 'Sit id in exercitation facere.',
		body: 'Sit id in exceritation facere. Et modi necessitabus asperiam id qui doloribus',
		tag: 'workshop'
	},
	{
		title: 'SERG Monthly Workshop',
		time: Date('13/09/2021'),
		heading: 'Sit id in exercitation facere.',
		body: 'Sit id in exceritation facere. Et modi necessitabus asperiam id qui doloribus',
		tag: 'fun'
	},
	{
		title: 'SERG Monthly Workshop',
		time: Date('13/09/2021'),
		heading: 'Sit id in exercitation facere.',
		body: 'Sit id in exceritation facere. Et modi necessitabus asperiam id qui doloribus',
		tag: 'training'
	}
];

const Event = ({ title, time, heading, body, tag }) => {
	const getChipStyle = tag => {
		switch (tag) {
			case 'workshop':
				return {
					backgroundColor: '#FFE6E6',
					color: '#FF5B5B'
				};
			case 'fun':
				return {
					backgroundColor: '#F2E5FA',
					color: '#AB54DB'
				};
			case 'training':
				return {
					backgroundColor: '#E6F8FF',
					color: '#58CDFF'
				};
			default:
				return {
					backgroundColor: '#FFE6E6',
					color: '#FF5B5B'
				};
		}
	};

	return (
		<div style={{ padding: '2rem 1rem', width: '100%', display: 'grid' }}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ height: 50, width: 50, borderRadius: 20, backgroundColor: 'gray' }} className="mr-10" />

				<div style={{ flex: 1 }}>
					<Typography className="font-bold">{title}</Typography>
					<Typography variant="caption">{moment(time).fromNow()}</Typography>
				</div>

				<IconButton>
					<MenuVerticalIcon />
				</IconButton>
			</div>

			<div className="my-20">
				<Typography className="font-bold">{heading}</Typography>
				<Typography>{body}</Typography>
			</div>

			<div className="mt-10 font-bold" style={{ textTransform: 'capitalize' }}>
				<Chip label={tag} style={getChipStyle(tag)} />
			</div>
		</div>
	);
};

const UpcomingEvents = () => {
	const classes = useStyles();

	return (
		<Grid item lg={3} md={3} sm={12} xs={12}>
			<Card>
				<div className={classes.titleContainer}>
					<Typography variant="h5" className="font-bold">
						Upcoming Events
					</Typography>
					<IconButton>
						<AddIcon />
					</IconButton>
				</div>
				<Typography>Maiores dicta atque dolore</Typography>

				<div className="mt-20">
					{events.map(({ title, time, heading, body, tag }, index) => (
						<Fragment key={index}>
							<Event {...{ title, title, time, heading, body, tag }} />
							{index !== events.length - 1 && <Divider />}
						</Fragment>
					))}
				</div>
			</Card>
		</Grid>
	);
};

export default UpcomingEvents;
