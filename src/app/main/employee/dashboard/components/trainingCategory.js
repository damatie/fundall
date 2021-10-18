import React from 'react';
import { Typography, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MoreHoriz';

// Components
import Card from './card';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	sectionBar: {
		width: '100%',
		height: '1rem',
		overflow: 'hidden',
		borderRadius: 10,
		display: 'flex'
	},
	category: {
		height: 10,
		width: 10,
		borderRadius: '50%',
		marginRight: '1rem'
	}
}));

const colors = ['#5351FB', '#00CD98', '#F6B900', '#FF6C40', '#A58382', '#58CDFF', '#C4C4C4', '#BD78E3', '#FF7E7E'];

const categories = [
	{
		name: 'Soft Skills',
		percentage: 22.72
	},
	{
		name: 'Technical',
		percentage: 11.28
	},
	{
		name: 'Certification',
		percentage: 10.94
	},
	{
		name: 'Safety Training',
		percentage: 9.76
	},
	{
		name: 'Professional & Legal',
		percentage: 20
	},
	{
		name: 'Team Training',
		percentage: 5.6
	},
	{
		name: 'Manegerial Training',
		percentage: 12
	},
	{
		name: 'Quality',
		percentage: 7.7
	}
];

const TrainingCategory = () => {
	const classes = useStyles();

	return (
		<Card>
			<div className={classes.root}>
				<Typography>Training Category</Typography>
				<IconButton>
					<MenuIcon />
				</IconButton>
			</div>

			<Typography component="span">
				<Typography variant="h4" className="mr-10 font-bold" component="span">
					12
				</Typography>
				<Typography component="span" className="font-bold">
					Training Categories
				</Typography>
			</Typography>

			<div className={`${classes.sectionBar} my-20`}>
				{categories.map(({ percentage }, index) => (
					<div style={{ background: colors[index], height: '100%', flex: percentage / 100 }} />
				))}
			</div>

			<div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
				{categories.map(({ name, percentage }, index) => (
					<div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
						<div
							className={classes.category}
							style={{
								backgroundColor: colors[index]
							}}
						/>
						<Typography style={{ flex: 1 }}>{name}</Typography>
						<Typography className="font-bold">{`${percentage}%`}</Typography>
					</div>
				))}
			</div>
		</Card>
	);
};

export default TrainingCategory;
