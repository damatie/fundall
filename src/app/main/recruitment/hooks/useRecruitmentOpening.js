import React from 'react';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../utils/errorMsg';
// import { getAllCategory } from '../../KPOcategoryList/store/actions';
import userRole from 'utils/userRole';
import { getCountries, getStates } from 'app/services/utils/index';

const schema = yup.object().shape({
      entityId: yup.number(
        errorMsg({
          name: 'Entity Id',
          type: 'number'
        })
      ).required(
        errorMsg({
          name: 'Entity Id',
          type: 'required'
        })
      ),
      employeeGrade: yup.string(
        errorMsg({
          name: 'Employee Grade',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Employee Grade',
          type: 'required'
        })
      ),
      departmentId: yup.number(
        errorMsg({
          name: 'Department Id',
          type: 'number'
        })
      ).required(
        errorMsg({
          name: 'Department Id',
          type: 'required'
        })
      ),
      jobRoleId: yup.number(
        errorMsg({
          name: 'Job Role',
          type: 'number'
        })
      ).required(
        errorMsg({
          name: 'Job Role',
          type: 'required'
        })
      ),
      jobDescription: yup.string(
        errorMsg({
          name: 'Job Description',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Job Description',
          type: 'required'
        })
      ),
      openingType: yup.string(
        errorMsg({
          name: 'Opening Type',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Opening Type',
          type: 'required'
        })
      ),
      employeeToReplace: yup.string(
        errorMsg({
          name: 'Employee to Replace',
          type: 'string'
        })
      ),
      duration: yup.string(
        errorMsg({
          name: 'Duration',
          type: 'string'
        })
      ),
      positionType: yup.string(
        errorMsg({
          name: 'Position Type',
          type: 'string'
        })
      ),
      startDate: yup.string(
        errorMsg({
          name: 'Start Date',
          type: 'string'
        })
      ),
      endDate: yup.string(
        errorMsg({
          name: 'End Date',
          type: 'string'
        })
      ),
      hireDate: yup.date(
        errorMsg({
          name: 'Hire Date',
          type: 'date'
        })
      ).required(
        errorMsg({
          name: 'Hire Date',
          type: 'required'
        })
      ),
      urgency: yup.string(
        errorMsg({
          name: 'Urgency',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Urgency',
          type: 'required'
        })
      ),
      country: yup.string(
        errorMsg({
          name: 'Country',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Country',
          type: 'required'
        })
      ),
      state: yup.string(
        errorMsg({
          name: 'State',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'State',
          type: 'required'
        })
      ),
    });

const useRecruitmentOpening = ({ state, dispatch, kpoCategory, userInfo }) => {
	const { open, data, loading} = state.recruitment;
	const employeeInfo = state.employeeInformation;

	const { register, handleSubmit, errors, control, getValues , reset} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

  console.log(employeeInfo);
  console.log(state);

  // const { 
  //   entities,
  //   departments,
  //   jobTitle,
  //   employeeGrade,
  //   roles, 
  // } = employeeInformation;

	const [shouldDisableButton, setShouldDisableButton] = React.useState(false);
	const [approvedRows, setApprovedRows] = React.useState([]);
	const [pendingRows, setPendingRows] = React.useState([]);
	const [closedRow, setClosedRow] = React.useState([]);
  const [radioValue, setRadioValue] = React.useState('');
  const [positionType, setPositionType] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [contentList, setContentList] = React.useState([]);
  const [contentSelectedItem, setContentSelectedItem] = React.useState({
    id: 0,
    kpoCategoryId: '',
    category: '',
    kpoDescription: '',
    target: '',
    kpoPipTarget: ''
  });
  
  React.useEffect(() => {
    getCountries().then((res) => setCountries(res));
    dispatch(Actions.getEntities());
    dispatch(Actions.getDept(userInfo.entityId));
    dispatch(Actions.getJobTitle());
  }, []);


  React.useEffect(() => {
		dispatch(Actions.getAllOpenPositions());
		dispatch(Actions.getEntities());
	}, [dispatch])

	React.useEffect(() => {
		setApprovedRows(data.filter(row => row.status === 'open'));
		setPendingRows(data.filter(row => row.status === 'pending' || row.status === 'added'));
		setClosedRow(data.filter(row => row.status === 'closed'));
	}, [data]);

	const handleOpenModal = () => {
		dispatch({ type: Actions.OPEN_CREATE_OPENING_MODAL });
	};

	const handleCloseModal = () => {
		dispatch({ type: Actions.CLOSE_CREATE_OPENING_MODAL });
	};

  const handleCountryChange = (ev) => {
    getStates(ev.target.value).then((st) => setStates(st));
  }

  const isManager = () => userInfo.role.toUpperCase() === 'LINE MANAGER';

	  const onSubmit = () => {
        
      };

  const handleChangeRadioBtn = (ev) => {
    setRadioValue(ev.target.value);
  }

  const handleChangePositionType = (ev) => {
    setPositionType(ev.target.value);
  }

	const disableInput = () => {
		if (userRole(userInfo.role) !== 'linemanager') {
			return {
				disabled: true
			};
		}
	};

	const shouldShowEditIcon = () => {
		if (userRole(userInfo.role) === 'linemanager') {
			return true;
		} else {
			return false;
		}
	};
  
  const handleDeleteRecruitment = () => {

  }

	return {
		...state,
		disableInput,
		open,
		handleOpenModal,
		handleCloseModal,
		errors,
    control,
		handleSubmit,
		register,
		onSubmit,
		loading,
		kpoCategory,
		shouldDisableButton,
		shouldShowEditIcon,
    approvedRows,
    pendingRows,
    closedRow,
    isManager,
    rows: data,
    handleDeleteRecruitment,
    handleChangeRadioBtn,
    radioValue,
    handleChangePositionType,
    positionType,
    handleCountryChange,
    countries,
    states,
    employeeInfo
    // jobTitle,
    // entities,
    // employeeGrade,
    // roles
	};
};

export default useRecruitmentOpening;
