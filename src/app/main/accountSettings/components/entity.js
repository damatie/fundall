import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
	},
	accordion: {
		margin: '1.5rem 0',
		width: '100%',
		padding: '2rem !important',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		textAlign: 'left'
	},
}));

const UnsavedEntityDetails = ({ item, name, employeeCode, address, description, onClick }) => {
	const classes = useStyles();
	return (
		<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className={classes.card}>
			<Button onClick={(ev) => onClick("EDIT", item)} variant="contained" color="secondary" size="small" className={classes.floatingEditIcon}>
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

const UnsavedCard = ({ type, entity, item, grade, department, gradeRange, departmentDescription, onClick }) => {
	const classes = useStyles();

	return (
		<Grid container item spacing={1} lg={8} md={12} sm={12} xs={12} className={classes.card}>
			<Button onClick={() => onClick('EDIT', entity, item)} variant="contained" color="secondary" size="small" className={classes.floatingEditIcon}>
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

const renderUnsavedGrades = (entity, grades, onClick) =>
	grades &&
	grades.map(grade => (
		<UnsavedCard 
			key={grade?.id} 
			entity={entity} 
			type="grade" 
			item = {grade}
			grade={grade?.gradeName} 
			gradeRange={`${grade?.minGross} - ${grade?.maxGross}`}  
			onClick={onClick} 
		/>
	));

const renderSavedGrades = grades =>
	grades &&
	grades.map(grade => (
		<SavedCard 
			key={grade?.id} 
			type="grade" 
			grade={grade?.gradeName} 
			gradeRange={`${grade?.minGross} - ${grade?.maxGross}`} 
		/>
	));

const renderUnsavedDepartments = (entity, departments, onClick) =>
	departments &&
	departments.map(department => (
		<UnsavedCard
			key={department?.id}
			entity={entity}
			type="department"
			item={department}
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
	const [saved, setSaved] = React.useState((item && item?.employeeGrades.length > 0 && item?.department.length > 0));
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	// console.log(item?.employeeGrades);
	return (
		<div>
			{saved ? (
			<Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion}>
				<AccordionSummary
					expandIcon={expanded !== 'panel1' ? <AddIcon /> : <RemoveIcon/>}
					aria-controls="panel1a-content"
					id={`SAVED-${item?.id}`}
				>
				<Typography variant="h6" className="mb-6 font-bold">{item?.entityName && item.entityName}</Typography>
			</AccordionSummary>
				<AccordionDetails>
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

							{renderSavedGrades(item?.employeeGrades || [])}
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
				</AccordionDetails>
			</Accordion>
			) : (
				<Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.accordion}>
					<AccordionSummary
						expandIcon={expanded !== 'panel2' ? <AddIcon /> : <RemoveIcon/>}
						aria-controls="panel1a-content"
						id={`UNSAVED-${item?.id}`}
					>
						<Typography variant="h6" className="mb-6 font-bold">{item?.entityName && item.entityName}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={3} className={classes.gridContainer}>
							<Grid container item lg={12} md={12} sm={12} xs={12} className={classes.gridItem}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									<Typography variant="h5" className="mb-6">
										Entity
									</Typography>
								</Grid>
								<UnsavedEntityDetails
									item={item}
									name={item?.entityName}
									employeeCode={item?.employeeCode}
									address={item?.address}
									description={item?.description}
									onClick={handleAddEntity}
								/>
							</Grid>

							<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									<Button onClick={() => handleAddEmployeeGrade("ADD", item, {})} variant="contained" color="secondary">
										<span style={{ marginRight: '5px' }}>
											<AddBoxOutlinedIcon />
										</span>{' '}
										Add Employee Grade
									</Button>
								</Grid>

								{renderUnsavedGrades(item, item?.employeeGrades || [], handleAddEmployeeGrade)}
							</Grid>

							<Grid container item lg={12} md={12} sm={12} xs={12} className={`${classes.gridItem} mt-20`}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									<Button onClick={() => handleAddDepartment("ADD", item, {})} variant="contained" color="secondary">
										<span style={{ marginRight: '5px' }}>
											<AddBoxOutlinedIcon />
										</span>{' '}
										Add Department
									</Button>
								</Grid>

								{renderUnsavedDepartments(item, item?.department || [], handleAddDepartment)}
							</Grid>
						</Grid>
					</AccordionDetails>
						{!saved && (
							<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
								<Button onClick={() => setSaved(true)} disabled={!(item && item?.department?.length > 0 && item?.employeeGrades?.length > 0)} variant="contained" color="primary">
									Save
								</Button>
							</div>
						)}
				</Accordion>
			)}

		</div>
	);
}
