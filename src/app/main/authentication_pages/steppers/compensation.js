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
import Box from '@material-ui/core/Box';
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
import DepartmentCard from './components/departmentCard';
import DepartmentModal from './components/departmentModal';
import CompensationCard from './components/compensationCard';
import CompensationModal from './components/compensationModal';
import EmployeeGradeLevelModal from './components/employeeGradeLevel';
import { setStepper } from './components/setStepper';
import EmployeeGradeLevelCard from './components/employeeGradeLevelCard';
import * as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from 'app/store/withReducer';
import employeesReducer from 'app/main/employeeManagement/store/reducers/employees.reducer';
import departments from 'app/main/HR/business_unit/department/store/reducers/departments.reducer';

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

function Compensation({ handleNext }) {
	const { entities } = useSelector(state => state.employeeMgt);

	const dispatch = useDispatch();
	const [entityList, setEntityList] = React.useState([]);
	const [selectedEntity, setSelectedEntity] = React.useState({});
	const [accountSettingsData, setAccountSettingsData] = React.useState({});
	const [openCompensationModal, setOpenCompensationModal] = React.useState(false);
	const [hasntities, setHasEntities] = React.useState(false);
	let genericDept = [];
	const classes = useStyles();

	React.useEffect(() => {
		dispatch(Actions.getEntities());
		const dataResponse = localStorage.getItem('login_data');
		const localData = JSON.parse(dataResponse);
		if (localData?.company?.hasEntities === true) {
			setHasEntities(true);
		} else {
			setHasEntities(false);
		}
	}, []);

	React.useEffect(() => {
		dispatch(Actions.getEntities());
	}, [openCompensationModal]);

	React.useEffect(() => {
		setEntityList(entities);
	}, [entities]);

	// const HandleAddDepartment = () => {
	// 	setOpenDepartmentModal(true);
	// };

	// const handleAddEmployeeGrade = () => {
	// 	setOpenEmployeeGradeModal(true);
	// };

	// const handleAddEmployeeGradeLevel = () => {
	// 	setOpenEmployeeGradeLevelModal(true);
	// };

	const handleCompensationCardClicked = item => {
		setSelectedEntity(item);
		setOpenCompensationModal(true);
	};

	return (
		<div className={classes.root}>
			<Typography variant="h5" color="initial" className="my-10">
				<strong>Add Compensation Elements</strong>
			</Typography>

			<Box width="100%">
				{entityList.map((item, index) => (
					<CompensationCard key={index} entity={item} onClickHandler={handleCompensationCardClicked} />
				))}
			</Box>

			<CompensationModal
				open={openCompensationModal}
				selectedEntity={selectedEntity}
				setOpen={setOpenCompensationModal}
				data={{}}
				edit={false}
			/>
		</div>
	);
}

withReducer('employeeMgt', employeesReducer)(Compensation);
export default Compensation;
