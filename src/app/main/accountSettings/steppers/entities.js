import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '@material-ui/pickers';
import Input from 'app/shared/TextInput/Input';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
// import catchErrorMsg from 'utils/catchErrorMsg';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from 'material-ui-chip-input';
import timeZone from 'app/shared/timezoneList';
import currencyList from 'app/shared/currencies';
import dateFormatList from 'app/shared/dateformat';
import { FormHelperText } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EntityModal from '../components/entityModal';
import Entity from '../components/entity';
import EntityCard from '../components/entityCard';
import EmployeeGradeCard from '../components/employeeGradeCard';
import EmployeeGradeModal from '../components/employeeGrade';
import EmployeeGradeLevelModal from '../components/employeeGradeLevel';
import DepartmentModal from '../components/departmentModal';
import { setStepper } from '../components/setStepper';
import EmployeeGradeLevelCard from '../components/employeeGradeLevelCard';
import DepartmentCard from '../components/departmentCard';
import * as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from 'app/store/withReducer';
import employeesReducer from 'app/main/employeeManagement/store/reducers/employees.reducer';

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
		padding: '4rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		textAlign: 'left'
	},
}));

function Entities({ handleNext }) {
	const { entities, grades, gradeLevels, accountSettings, departmentList, compensationData } = useSelector(
		state => state.employeeMgt
	);
	// console.log('entities: ', entities);
	// console.log('grades: ', grades);

	const dispatch = useDispatch();
	// setEntityList setGradeList setAccountSettingsData
	const [entityList, setEntityList] = React.useState([]);
	const [gradeList, setGradeList] = React.useState([]);
	const [departments, setDepartments] = React.useState([]);
	const [gradeLevelList, setGradeLevelList] = React.useState([]);
	const [accountSettingsData, setAccountSettingsData] = React.useState({});
	const [openEntityModal, setOpenEntityModal] = React.useState(false);
	const [openEmployeeGradeModal, setOpenEmployeeGradeModal] = React.useState(false);
	const [openEmployeeGradeLevelModal, setOpenEmployeeGradeLevelModal] = React.useState(false);
	const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);

	const [humanResource, setHumanResource] = React.useState(true);
	const [finance, setFinance] = React.useState(true);
	const [sales, setSales] = React.useState(true);
	const [type, setType] = React.useState({
		option: "",
		component: "",
	});
	const [item, setItem] = React.useState({});
	const [selectedGrade, setSelectedGrade] = React.useState({});
	const [selectedDept, setSelectedDept] = React.useState({});
	const [informationTechnology, setInformationTechnology] = React.useState(false);
	const [canSubmit, setCanSubmit] = React.useState(false);
	let genericDept = [];
	const classes = useStyles();

	React.useEffect(() => {
		dispatch(Actions.getEntities());
		dispatch(Actions.getAccountSettings());
		dispatch(Actions.getCompensations());
		dispatch(Actions.getGrades());
		dispatch(Actions.getGradeLevels());
	}, []);

	React.useEffect(() => {
		dispatch(Actions.getEntities());
		dispatch(Actions.getAccountSettings());
		dispatch(Actions.getCompensations());
		dispatch(Actions.getGrades());
		dispatch(Actions.getGradeLevels());
	}, [openEntityModal, openEmployeeGradeModal, openEmployeeGradeLevelModal]);

	React.useEffect(() => {
		if (departmentList.length > 0 && gradeLevels.length > 0) {
			setCanSubmit(true);
		}
	}, [grades, gradeLevels]);

	React.useEffect(() => {
		setEntityList(entities);
		setGradeList(grades);
		setDepartments(departmentList);
		setGradeLevelList(gradeLevels);
		setAccountSettingsData(accountSettings);
	}, [grades, entities, gradeLevels, accountSettings]);

	const handleHumanResourceChange = event => {
		setHumanResource(event.target.checked);
		let data = {};
		data.name = 'Human Resource';
		if (humanResource === true) {
			!genericDept.includes(data) ? genericDept.push(data) : '';
		} else {
			genericDept.filter(e => e !== data);
		}
	};
	const handleFinanceChange = event => {
		setFinance(event.target.checked);
		let data = {};
		data.name = 'Finance';
		if (finance === true) {
			!genericDept.includes(data) ? genericDept.push(data) : '';
		} else {
			genericDept.filter(e => e !== data);
		}
	};
	const handleSalesChange = event => {
		setSales(event.target.checked);
		let data = {};
		data.name = 'Sales';
		if (sales === true) {
			!genericDept.includes(data) ? genericDept.push(data) : '';
		} else {
			genericDept.filter(e => e !== data);
		}
	};
	const handleInformationTechnologyChange = event => {
		setInformationTechnology(event.target.checked);
		let data = {};
		data.name = 'Information Technology';
		if (finance === true) {
			!genericDept.includes(data) ? genericDept.push(data) : '';
		} else {
			genericDept.filter(e => e !== data);
		}
	};

	const HandleAddEntity = (option, entity) => {
		setType({
			option,
			component: "ENTITY",
		});
		setItem(entity);
		setOpenEntityModal(true);
	};

	const handleAddEmployeeGrade = (option, entity, grade) => {
		setType({
			option,
			component: "EMPLOYEEGRADE",
		});
		setItem(entity);
		setSelectedGrade(grade);
		setOpenEmployeeGradeModal(true);
	};

	const handleAddEmployeeGradeLevel = () => {
		setOpenEmployeeGradeLevelModal(true);
	};

	const handleAddDepartment = (option, entity, dept) => {
		setType({
			option,
			component: "DEPARTMENT",
		});
		setItem(entity);
		setSelectedDept(dept)
		setOpenDepartmentModal(true);
	};

	const HandleSubmit = async () => {
		if (gradeLevels.length > 0 && departmentList.length > 0) {
			try {
				loading('processing...');
				await setStepper(genericDept, 3);
				const dataResponse = localStorage.getItem('login_data');
				const localData = JSON.parse(dataResponse);
				localData.company.regStep = 3;
				localStorage.setItem('login_data', JSON.stringify(localData));
				swal.fire({
					text: 'Step Completed',
					icon: 'success'
				});
				handleNext();
			} catch (e) {
				swal.fire({
					text: e?.message || 'Something went wrong',
					icon: 'error'
				});
			}
		} else {
			swal.fire({
				text: 'Kindly Complete Setup Before Proceeding',
				icon: 'info'
			});
		}
	};

	return (
		<div className={classes.root}>
			<div>
				<Typography variant="h5" color="initial" className="my-10">
					<strong>Entities</strong>
				</Typography>
				<Typography variant="body1" color="initial" className="my-10">
					<strong>Please select departments that will be general for all entities</strong>
				</Typography>
				<Grid container spacing={3} justify="space-between" align="center" style={{ marginBottom: '3rem' }}>
					<Grid item lg={3} md={3} sm={6} xs={6} align="left" style={{ marginBottom: '-15px' }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={humanResource}
									onChange={handleHumanResourceChange}
									name="humanResource"
									color="primary"
								/>
							}
							label="Human Resource"
						/>
					</Grid>
					<Grid item lg={3} md={3} sm={6} xs={6} align="left" style={{ marginBottom: '-15px', marginTop: '-15px' }}>
						<FormControlLabel
							control={<Checkbox checked={finance} onChange={handleFinanceChange} name="finance" color="primary" />}
							label="Finance"
						/>
					</Grid>
					<Grid item lg={3} md={3} sm={6} xs={6} align="left" style={{ marginTop: '-15px' }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={informationTechnology}
									onChange={handleInformationTechnologyChange}
									name="informationTechnology"
									color="primary"
								/>
							}
							label="Information Technology"
						/>
					</Grid>
					<Grid item lg={3} md={3} sm={6} xs={6} align="left" style={{ marginBottom: '-15px', marginTop: '-15px' }}>
						<FormControlLabel
							control={<Checkbox checked={sales} onChange={handleSalesChange} name="sales" color="primary" />}
							label="Sales"
						/>
					</Grid>

					{entityList.length > 0 && (
						<div className={classes.container}>
							{entityList.map(item => (
								<Entity
									key={item.id}
									item={item}
									handleAddEmployeeGrade={handleAddEmployeeGrade}
									handleAddDepartment={handleAddDepartment}
									handleAddEntity={HandleAddEntity}
								/>
							))}

						<Grid item lg={12} md={12} sm={12} xs={12} align="left" className="mt-10">
							<Button onClick={() => HandleAddEntity("ADD")} variant="contained" color="secondary">
								<span style={{ marginRight: '5px' }}>
									<AddBoxOutlinedIcon />
								</span>{' '}
								Add Entity
							</Button>
						</Grid>
						</div>
					)}
				</Grid>

				<Grid container spacing={3} justify="center" align="center" className="my-10">
					<Button variant="contained" onClick={HandleSubmit} color="primary">
						Submit
					</Button>
				</Grid>
			</div>
			<EntityModal open={openEntityModal} item={item} type={type} setOpen={setOpenEntityModal} edit={false} data={{}} />
			<EmployeeGradeModal
				open={openEmployeeGradeModal}
				item={selectedGrade} 
				entity={item}
				type={type}
				employeeGrades={accountSettingsData?.employeeGrade || []}
				entities={entityList}
				setOpen={setOpenEmployeeGradeModal}
				data={{}}
				edit={false}
			/>
			<DepartmentModal
				open={openDepartmentModal}
				entities={entityList}
				item={selectedDept}
				entity={item} 
				type={type}
				setOpen={setOpenDepartmentModal}
				data={{}}
				edit={false}
			/>
		</div>
	);
}

withReducer('employeeMgt', employeesReducer)(Entities);
export default Entities;
