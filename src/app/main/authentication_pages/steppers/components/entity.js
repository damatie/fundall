import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	container: {
		margin: '2rem 0',
		width: '100%',
		padding: '4rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		textAlign: 'left'
	},
	gridContainer: {
		width: '100%'
	},
	card: {
		marginTop: '2rem',
		padding: '2rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		position: 'relative'
	},
	floatingEditIcon: {
		position: 'absolute',
		top: '2rem',
		right: '2rem'
	}
}));

const UnsavedEntityDetails = ({ name, employeeCode, address, description, onClick }) => {
	const classes = useStyles();
	return (
		<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className={classes.card}>
			<Button onClick={onClick} variant="contained" color="secondary" size="small" className={classes.floatingEditIcon}>
				<EditIcon />
			</Button>
			<Grid item lg={4} md={4} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					Entity Name
				</Typography>
				<Typography variant="body1" color="initial">
					{name && name}
				</Typography>
			</Grid>

			<Grid item lg={7} md={7} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					Employee Code
				</Typography>
				<Typography variant="body1" color="initial">
					{employeeCode && employeeCode}
				</Typography>
			</Grid>

			<Grid item lg={4} md={4} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					Entity Address
				</Typography>
				<Typography variant="body1" color="initial">
					{address && address.join(', ')}
				</Typography>
			</Grid>

			<Grid item lg={7} md={7} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					Description
				</Typography>
				<Typography variant="body1" color="initial">
					{description && description}
				</Typography>
			</Grid>
		</Grid>
	);
};

const SavedEntityDetails = ({ name, employeeCode, address, description }) => (
	<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className="mt-6">
		<Grid item lg={4} md={4} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				Entity Name
			</Typography>
			<Typography variant="body1" color="initial">
				{name && name}
			</Typography>
		</Grid>

		<Grid item lg={7} md={7} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				Employee Code
			</Typography>
			<Typography variant="body1" color="initial">
				{employeeCode && employeeCode}
			</Typography>
		</Grid>

		<Grid item lg={4} md={4} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				Entity Address
			</Typography>
			<Typography variant="body1" color="initial">
				{address && address.join(', ')}
			</Typography>
		</Grid>

		<Grid item lg={7} md={7} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				Description
			</Typography>
			<Typography variant="body1" color="initial">
				{description && description}
			</Typography>
		</Grid>
	</Grid>
);

const UnsavedCard = ({ type, grade, department, gradeRange, departmentDescription, onClick }) => {
	const classes = useStyles();

	return (
		<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className={classes.card}>
			<Button onClick={onClick} variant="contained" color="secondary" size="small" className={classes.floatingEditIcon}>
				<EditIcon />
			</Button>
			<Grid item lg={4} md={4} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					{type === 'grade' ? 'Employee Grade' : 'Department Name'}
				</Typography>
				<Typography variant="body1" color="initial">
					{type === 'grade' ? <>{grade && grade}</> : <>{department && department}</>}
				</Typography>
			</Grid>

			<Grid item lg={7} md={7} sm={12} xs={12}>
				<Typography variant="h6" className="mb-6 font-bold">
					{type === 'grade' ? 'Range of Gross Annual Salary' : 'Description'}
				</Typography>
				<Typography variant="body1" color="initial">
					{type === 'grade' ? <>{gradeRange && gradeRange}</> : <>{departmentDescription && departmentDescription}</>}
				</Typography>
			</Grid>
		</Grid>
	);
};

const SavedCard = ({ type, grade, department, gradeRange, departmentDescription }) => (
	<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className="mt-6">
		<Grid item lg={4} md={4} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				{type === 'grade' ? 'Employee Grade' : 'Department Name'}
			</Typography>
			<Typography variant="body1" color="initial">
				{type === 'grade' ? <>{grade && grade}</> : <>{department && department}</>}
			</Typography>
		</Grid>

		<Grid item lg={7} md={7} sm={12} xs={12}>
			<Typography variant="h6" className="mb-6 font-bold">
				{type === 'grade' ? 'Range of Gross Annual Salary' : 'Description'}
			</Typography>
			<Typography variant="body1" color="initial">
				{type === 'grade' ? <>{gradeRange && gradeRange}</> : <>{departmentDescription && departmentDescription}</>}
			</Typography>
		</Grid>
	</Grid>
);

const renderUnsavedGrades = (grades, onClick) =>
	grades &&
	grades.map(grade => (
		<UnsavedCard key={grade?.id} type="grade" grade={grade?.name} gradeRange={grade?.range} onClick={onClick} />
	));

const renderSavedGrades = grades =>
	grades &&
	grades.map(grade => <SavedCard key={grade?.id} type="grade" grade={grade?.name} gradeRange={grade?.range} />);

const renderUnsavedDepartments = (departments, onClick) =>
	departments &&
	departments.map(department => (
		<UnsavedCard
			key={department?.id}
			type="department"
			department={department?.departmentName}
			departmentDescription={department?.description}
			onClick={onClick}
		/>
	));

const renderSavedDepartments = departments =>
	departments &&
	departments.map(department => (
		<SavedCard
			key={department?.id}
			type="department"
			department={department?.departmentName}
			departmentDescription={department?.description}
		/>
	));

export default function Entity({ item, handleAddEmployeeGrade, handleAddDepartment, handleAddEntity }) {
	const dispatch = useDispatch();
	const [saved, setSaved] = React.useState(false);
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{saved ? (
				<Grid container spacing={3} className={classes.gridContainer}>
					<Grid container item lg={12} md={12} sm={12} xs={12} className={classes.gridItem}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<Typography variant="h5" className="mb-6">
									Entity
								</Typography>

								<Button onClick={() => setSaved(false)} variant="contained" color="secondary" startIcon={<EditIcon />}>
									Edit
								</Button>
							</div>

							<Divider className="my-6" style={{ width: '75%' }} />
						</Grid>

						<SavedEntityDetails
							name={item?.entityName}
							employeeCode={item?.employeeCode}
							address={item?.address}
							description={item?.description}
						/>
					</Grid>

					<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Typography variant="h5" className="mb-6">
								Employee Grade
							</Typography>

							<Divider className="my-6" style={{ width: '75%' }} />
						</Grid>

						{renderSavedGrades(item?.grades || [])}
					</Grid>

					<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Typography variant="h5" className="mb-6">
								Department
							</Typography>

							<Divider className="my-6" style={{ width: '75%' }} />
						</Grid>

						{renderSavedDepartments(item?.department || [])}
					</Grid>
				</Grid>
			) : (
				<Grid container spacing={3} className={classes.gridContainer}>
					<Grid container item lg={12} md={12} sm={12} xs={12} className={classes.gridItem}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Typography variant="h5" className="mb-6">
								Entity
							</Typography>
						</Grid>
						<UnsavedEntityDetails
							name={item?.entityName}
							employeeCode={item?.employeeCode}
							address={item?.address}
							description={item?.description}
							onClick={handleAddEntity}
						/>
					</Grid>

					<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Button onClick={handleAddEmployeeGrade} variant="contained" color="secondary">
								<span style={{ marginRight: '5px' }}>
									<AddBoxOutlinedIcon />
								</span>{' '}
								Add Employee Grade
							</Button>
						</Grid>

						{renderUnsavedGrades(item?.grades || [], handleAddEmployeeGrade)}
					</Grid>

					<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Button onClick={handleAddDepartment} variant="contained" color="secondary">
								<span style={{ marginRight: '5px' }}>
									<AddBoxOutlinedIcon />
								</span>{' '}
								Add Department
							</Button>
						</Grid>

						{renderUnsavedDepartments(item?.department || [], handleAddDepartment)}
					</Grid>
				</Grid>
			)}

			{!saved && (
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
					<Button onClick={() => setSaved(true)} variant="contained" color="primary">
						Save
					</Button>
				</div>
			)}
		</div>
	);
}
