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
	}
}));

export default function CompensationCard({ entity, onClickHandler }) {
	const dispatch = useDispatch();
	const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);
	const classes = useStyles();

	const HandleAddDepartment = () => {
		setOpenDepartmentModal(true);
	};

	return (
		<Grid
			container
			spacing={3}
			direction="row"
			style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px' }}
		>
			<Grid
				item
				lg={9}
				md={9}
				sm={9}
				xs={9}
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
		</Grid>
	);
}
