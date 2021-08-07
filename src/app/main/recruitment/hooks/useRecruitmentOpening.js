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
      employeeGradeId: yup.string(
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
      countryId: yup.string(
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
      stateId: yup.string(
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
      contactEmail: yup.string(
        errorMsg({
          name: 'Contact Email',
          type: 'string'
        })
      ).required(
        errorMsg({
          name: 'Contact Email',
          type: 'required'
        })
      ),
      closingDate: yup.date(
        errorMsg({
          name: 'Closing Date',
          type: 'date'
        })
      ).required(
        errorMsg({
          name: 'Closing Date',
          type: 'required'
        })
      ),
    });

const useRecruitmentOpening = ({ state, dispatch, push, id, userInfo, description, setDescription }) => {
	const { open, data, loading, oneLoading, onePosition} = state.recruitment;
	const employeeInfo = state.employeeInformation;
  const employees = employeeInfo.employees.filter(em => em.id !== userInfo.id).map(em => {
    return {
      name: `${em.firstName} ${em.lastName}`,
      id: em.id
    };
  });

	const { register, handleSubmit, errors, control, getValues , reset} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

  // console.log(state);

	const [shouldDisableButton, setShouldDisableButton] = React.useState(false);
	const [publishedRows, setPublishedRows] = React.useState([]);
	const [unpublishedRows, setUnpublishedRows] = React.useState([]);
	const [closedRow, setClosedRow] = React.useState([]);
  const [radioValue, setRadioValue] = React.useState('');
  const [positionType, setPositionType] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [contentList, setContentList] = React.useState([]);
  const [contentSelectedItem, setContentSelectedItem] = React.useState({
    id: 0,
    entityId: '',
    employeeGradeId: '',
    departmentId: '',
    jobRoleId: '',
    jobDescription: '<p></p>',
    openingType: '',
    employeeToReplace: 0,
    duration: '',
    positionType: '',
    startDate: '',
    endDate: '',
    hireDate: '',
    urgency: '',
    countryId: '',
    stateId: '',
    contanctEmail: '',
    closingDate: ''
});

  React.useEffect(() => {
		dispatch(Actions.getEntities());
    getCountries().then((res) => setCountries(res));
    dispatch(Actions.getEntities());
    dispatch(Actions.getDept(userInfo.entityId));
    dispatch(Actions.getJobTitle());
    dispatch(Actions.getGrades());
    dispatch(Actions.getEmployees());
		dispatch(Actions.getAllOpenPositions());
    if(id){
      dispatch(Actions.getOneOpenPosition(id));
    }
	}, [dispatch])

  React.useEffect(() => {
    if(id){
        setContentSelectedItem({
            ...onePosition,
            entityName: onePosition?.entity?.entityName,
            departmentName: onePosition?.department?.departmentName,
            jobRoleName: onePosition?.jobTitles?.name,
            employeeGrade: onePosition?.grade?.gradeName,
            countryName: countries.find(country => country.id === onePosition.countryId)?.name,
            employeeName: employees.find(emp => emp.id === onePosition.employeeToReplace)?.name
        });
        setDescription(onePosition?.jobDescription);
    }
  }, [id, onePosition]);

	React.useEffect(() => {
		setPublishedRows(data.filter(row => row.status === 'PUBLISHED'));
		setUnpublishedRows(data.filter(row => row.status === 'UNPUBLISHED'));
		setClosedRow(data.filter(row => row.status === 'CLOSED'));
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

  const isManager = () => userRole(userInfo?.role?.name) === 'linemanager';

  const isHR = () => userRole(userInfo?.role?.name) === 'hrmanager' || userRole(userInfo?.role?.name).includes('hr');

  const onSubmit = () => {
      console.log(contentList);
      const payload = {
        openings: contentList
      }
      dispatch(Actions.createOpening(payload));
  };

  const getDurations = () => {
    let items = [];
    for(let i = 1; i <= 12; i++){
      let item = (i <= 1) ? `${i} Month` : `${i} Months`;
      items.push(item);
    }
    return items;
  }

  const publishOpening = () => {
    const payload = {
      employeeGradeId: Number(contentSelectedItem.employeeGradeId),
      jobRoleId: Number(contentSelectedItem.jobRoleId),
      jobDescription: contentSelectedItem.jobDescription,
      openingType: contentSelectedItem.openingType,
      employeeToReplace: contentSelectedItem.employeeToReplace,
      duration: contentSelectedItem.duration,
      positionType: contentSelectedItem.positionType,
      startDate: contentSelectedItem.startDate,
      endDate: contentSelectedItem.endDate,
      hireDate: contentSelectedItem.hireDate,
      urgency: contentSelectedItem.urgency,
      countryId: contentSelectedItem.countryId,
      stateId: contentSelectedItem.stateId,
    }
    dispatch(Actions.publishOpening(payload, contentSelectedItem.id));
  }

  const handleChangeRadioBtn = (ev) => {
    setRadioValue(ev.target.value);
  }

  const handleChangePositionType = (ev) => {
    setPositionType(ev.target.value);
  }

  const handleAddList = (model) => {
    // console.log(model);
    contentList.push({
      ...model,
      id: model.id || contentList.length+1,
      jobDescription: description,
      entityName: employeeInfo.entities.find(en => en.id === model.entityId)?.entityName,
      departmentName: employeeInfo.departments.find(dep => dep.id === model.departmentId)?.departmentName,
      jobRoleName: employeeInfo.jobTitles.find(job => job.id === model.jobRoleId)?.name,
      employeeGrade: employeeInfo.grades.find(emp => emp.id === model.employeeGradeId)?.gradeName,
      countryName: countries.find(country => country.id === model.countryId)?.name,
      employeeName: employees.find(emp => emp.id === model.employeeToReplace)?.name
    });
    setContentList(contentList);
    reset();
    setContentSelectedItem({
      id: 0,
      entityId: '',
      employeeGradeId: '',
      departmentId: '',
      jobRoleId: '',
      jobDescription: '',
      openingType: '',
      employeeToReplace: 0,
      duration: '',
      positionType: '',
      startDate: '',
      endDate: '',
      hireDate: '',
      urgency: '',
      countryId: '',
      stateId: '',
      contanctEmail: '',
      closingDate: ''
    });
    setDescription('');
    // console.log(contentSelectedItem);
  }

  const handleEditList = (id) => {
    // console.log(id);
    setContentSelectedItem(contentList.find(content => content.id === id));
    console.log(contentSelectedItem?.jobDescription);
    setDescription(contentSelectedItem?.jobDescription);
    setContentList(contentList.filter(content => content.id !== id));
  }
  
  const handleDeleteRecruitment = (payload) => {
    dispatch(Actions.deleteOpening(payload));
  }

  const handleExtendClsoingDate = () => {
    dispatch(Actions.extendClosingDate('1'))
  }

	return {
		...state,
		open,
		handleOpenModal,
		handleCloseModal,
		errors,
    control,
		handleSubmit,
		register,
		onSubmit,
    publishOpening,
		loading,
    push,
		isHR,
    publishedRows,
    unpublishedRows,
    closedRow,
    oneLoading,
    content: onePosition,
    isManager,
    rows: data,
    handleDeleteRecruitment,
    handleExtendClsoingDate,
    handleChangeRadioBtn,
    radioValue,
    handleChangePositionType,
    positionType,
    handleCountryChange,
    countries,
    states,
    employeeInfo,
    employees,
    handleAddList,
    handleEditList,
    contentList,
    contentSelectedItem,
    setContentSelectedItem,
    description,
    setDescription,
    getDurations
	};
};

export default useRecruitmentOpening;
