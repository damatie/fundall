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
import CompensationCard from '../components/compensationCard';
import CompensationModal from '../components/compensationModal';
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
	const [type, setType] = React.useState("");
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

	
	const HandleSubmit = async () => {
		// if (grades.length > 0 && gradeLevels.length > 0) {
		// 	try {
		// 		loading('processing...');
		// 		await setStepper(genericDept, 3);
		// 		const dataResponse = localStorage.getItem('login_data');
		// 		const localData = JSON.parse(dataResponse);
		// 		localData.company.regStep = 3;
		// 		localStorage.setItem('login_data', JSON.stringify(localData));
		// 		swal.fire({
		// 			text: 'Step Completed',
		// 			icon: 'success'
		// 		});
		// 		handleNext();
		// 	} catch (e) {
		// 		swal.fire({
		// 			text: e?.message || 'Something went wrong',
		// 			icon: 'error'
		// 		});
		// 	}
		// } else {
		// 	swal.fire({
		// 		text: 'Kindly Complete Setup Before Proceeding',
		// 		icon: 'info'
		// 	});
		// }
		window.location = '/employee/dashboard';
	};

	const handleCompensationCardClicked = (entity, action) => {
		console.log(action);
		setType(action);
		setSelectedEntity(entity);
		dispatch(Actions.getEntities());
		setOpenCompensationModal(true);
	};

	return (
		<div className={classes.root}>
			<Typography variant="h5" color="initial" className="my-10" style={{marginBottom: "2em"}}>
				<strong>Add Compensation Elements</strong>
			</Typography>

			<Box width="100%" className="mt-6" style={{marginTop: "2em"}}>
				{entityList.map((item, index) => (
					<CompensationCard key={index} entity={item} onClickHandler={handleCompensationCardClicked} />
				))}
			</Box>

			<CompensationModal
				open={openCompensationModal}
				selectedEntity={selectedEntity}
				setOpen={setOpenCompensationModal} 
				type={type}
				setType={setType}
				data={{}}
				edit={false}
			/>
			<Box mt={5} width="100%" display="flex" justifyContent="center" alignItems="center">
				<Button variant="contained" color="primary" onClick={() => HandleSubmit()}>
					Save
				</Button>
			</Box>
		</div>
	);
}

withReducer('employeeMgt', employeesReducer)(Compensation);
export default Compensation;
