import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DepartmentModal from './departmentModal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	},
	container: {
		margin: '2rem 0',
		width: '100%',
		padding: '4rem !important',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		textAlign: 'left'
	},
	gridContainer: {
		width: '100%'
	},
	card: {
		padding: '2rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		position: 'relative'
	}
}));

const EmptyCompensations = ({ entity, onClickHandler }) => (
	<Grid
		item
		lg={9}
		md={12}
		sm={12}
		xs={12}
		align="left"
		className="my-10 flex-row"
		style={{ borderRadius: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.10)', marginBottom: 20 }}
	>
		<Box p={2}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
				<Box flex={1} py={1} style={{ borderBottom: 'solid 1px #ccc', maxWidth: 400 }}>
					<Typography variant="h5" color="initial" className="my-10">
						<strong>Entity</strong>
					</Typography>
				</Box>
				<Button onClick={() => onClickHandler(entity)} variant="contained" color="secondary">
					<span style={{ marginRight: '5px' }}>
						<AddBoxOutlinedIcon />
					</span>{' '}
					Add Compensation Element
				</Button>
			</Box>
			<Box display="flex" alignItems={'center'}>
				<Box mr={3}>
					<Typography variant="h6" color="initial" className="my-10" style={{ fontWeight: 'bold' }}>
						Entity Name
					</Typography>
					<Typography color="initial" className="my-10">
						{entity?.entityName}
					</Typography>
				</Box>
				<Box>
					<Typography variant="h6" color="initial" className="my-10" style={{ fontWeight: 'bold' }}>
						Enitity Code
					</Typography>
					<Typography color="initial" className="my-10">
						{entity?.description}
					</Typography>
				</Box>
			</Box>
		</Box>
	</Grid>
);

const Compensations = ({ entity, onClickHandler }) => {
	const classes = useStyles();
	const compensations = entity?.compensations || {
		0: {
			id: 0,
			name: 'Health Package',
			percentage: 20
		},
		1: {
			id: 1,
			name: 'Leave Provision',
			percentage: 10
		},
		3: {
			id: 3,
			name: 'Vacation',
			percentage: 20
		},
		4: {
			id: 4,
			name: 'House Fees',
			percentage: 40
		},
		5: {
			id: 5,
			name: '13th Month',
			percentage: 10
		}
	};

	return (
		<Grid container item lg={12} md={12} sm={12} xs={12} className={classes.container}>
			<Grid container item lg={6} md={6} sm={9} xs={12} className={classes.card}>
				<Grid item lg={6} md={6} md={12} xs={12}>
					<Typography variant="h6" className="mb-6 font-bold">
						Entity Name
					</Typography>
					<Typography variant="body1" color="initial">
						{entity?.entityName && entity.entityName}
					</Typography>
				</Grid>

				<Grid item lg={6} md={6} md={12} xs={12}>
					<Typography variant="h6" className="mb-6 font-bold">
						Employee Code
					</Typography>
					<Typography variant="body1" color="initial">
						{entity?.employeeCode && entity.employeeCode}
					</Typography>
				</Grid>
			</Grid>

			<Grid
				item
				lg={12}
				md={12}
				sm={12}
				xs={12}
				className="mt-40 mb-10"
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<Typography variant="h5" className="mr-20">
					Compensation Details
				</Typography>
				<Button variant="contained" size="small" color="secondary" onClick={() => onClickHandler(entity)}>
					<EditIcon />
				</Button>
			</Grid>

			{Object.values(compensations).map(compensation => (
				<Grid key={compensation?.id} container item lg={9} md={9} sm={12} xs={12} className={`${classes.card} mt-20`}>
					<Grid item lg={4} md={4} md={12} xs={12}>
						<Typography variant="h6" className="mb-6 font-bold">
							Name
						</Typography>
						<Typography variant="body1" color="initial">
							{compensation?.name && compensation.name}
						</Typography>
					</Grid>

					<Grid item lg={7} md={7} md={12} xs={12}>
						<Typography variant="h6" className="mb-6 font-bold">
							Percentage
						</Typography>
						<Typography variant="body1" color="initial">
							{compensation?.percentage && `${compensation.percentage}%`}
						</Typography>
					</Grid>
				</Grid>
			))}

			<Grid item lg={12} md={12} sm={12} xs={12} className="mt-20">
				<Typography variant="h6" style={{ color: '#32CD32' }}>
					Total Percentage is 100% &#10003;
				</Typography>
			</Grid>
		</Grid>
	);
};

export default function CompensationCard({ entity, onClickHandler }) {
	const compensations = entity?.compensations || {};

	return (
		<Grid
			container
			spacing={3}
			direction="row"
			style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px' }}
		>
			{Object.values(compensations).length === 0 ? (
				<EmptyCompensations entity={entity} onClickHandler={onClickHandler} />
			) : (
				<Compensations entity={entity} onClickHandler={onClickHandler} />
			)}
		</Grid>
	);
}
