import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  firstName: yup.string(errorMsg({ name: 'First Name', type: 'string' }))
      .required(errorMsg({ name: 'First Name', type: 'required' }))
      .min(3, errorMsg({ name: 'First Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'First Namr', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastName: yup.string(errorMsg({ name: 'Last Name', type: 'string' }))
      .required(errorMsg({ name: 'Last Name', type: 'required' }))
      .min(3, errorMsg({ name: 'Last Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'Last Name', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  middleName: yup.string(errorMsg({ name: 'Middle Name', type: 'string' }))
      // .required(errorMsg({ name: 'Middle Name', type: 'required' }))
      .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'Middle Name', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  employeeId: yup.string(errorMsg({ name: 'Employee ID', type: 'string' }))
      .required(errorMsg({ name: 'Employee ID', type: 'required' })),
  // userName: yup.string(errorMsg({ name: 'User Name', type: 'string' }))
  //     .required(errorMsg({ name: 'User Name', type: 'required' }))
  //     .min(3, errorMsg({ name: 'User Name', type: 'min', number: 3 })).matches(/^[ A-Za-z_@./#&+-]*$/, "Only alphabets and Special Case Characters are allowed for this field " ),
  email: yup.string()
      .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
      .required(errorMsg({ name: 'Email Address', type: 'required' }))
      .email(),
  personalEmail: yup.string()
  .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
  .required(errorMsg({ name: 'Email Address', type: 'required' }))
  .email(),
  entityId: yup.number()
      .required(errorMsg({ name: 'Entity', type: 'required' })),
  departmentId: yup.number()
      .required(errorMsg({ name: 'Department', type: 'required' })),
  roleId: yup.number()
      .required(errorMsg({ name: 'Role', type: 'required' })),
  jobTitleId: yup.number()
      .required(errorMsg({ name: 'Job Title', type: 'required' })),
  employeeGradeId: yup.number()
      .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
  grossAnnualSalary: yup.string()
      .required(errorMsg({ name: 'Gross Annual Salary', type: 'required' })),
  // employeeGradeLevelId: yup.number()
  //     .required(errorMsg({ name: 'Employee Grade Level', type: 'required' })),
  employmentStatus: yup.string()
      .required(errorMsg({ name: 'Employment Status', type: 'required' })),
  modeOfEmployment: yup.string()
      .required(errorMsg({ name: 'Mode Of Employment', type: 'required' })),
  startDate: yup.string()
      .required(errorMsg({ name: 'Employee Start Date', type: 'required' })),
});

const useEmployees = ({dispatch, state}) => {
  const {
    control,
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { entities, roles, jobTitles, accountSettings, grades, loading, employees } = state;
  // // console.log('roles: ', roles);
  const employmentStatusList = accountSettings?.employmentStatus ?? [];
  const modeOfEmploymentList = accountSettings?.modeOfEmployment ?? [];
  const [checked, setChecked] = React.useState(true);
  const [departments, setDepartments] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
	const [contentSelectedItem, setContentSelectedItem] = React.useState({
		id: 0,
		firstName: '',
		lastName: '',
		middleName: '',
		srgIdNumber: '',
		departmentId: '',
		roleId: '',
		jobTitleId: '',
		employeeGradeId: '',
		grossAnnualSalary: 0,
		employmentStatus: '',
    modeOfEmployment: '',
    startDate: '',
    newsletter: false
	});

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getRoles());
    dispatch(Actions.getGrades());
    dispatch(Actions.getJobTitle());
    dispatch(Actions.getAccountSettings());
    dispatch(Actions.getEmployees());
  }, []);

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (value) => {
    console.log(value)
    dispatch(Actions.addEmployee(contentSelectedItem));
  };

  const handleOpenModal = () => {
    dispatch({
      type: Actions.OPEN_ADD_NEW_EMPLOYEE_MODAL
    });
  };

  const handleCloseModal = () => {
    dispatch({
      type: Actions.CLOSE_ADD_NEW_EMPLOYEE_MODAL
    });
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteEmployee(id))
  };

  const handleSearch = () => {

  };

  const handleFilter = ({target: { value }}) => {
    dispatch(Actions.filterEmployees(value));
  };

  const handleGetDept = (id) => {
    dispatch(Actions.getDept(id));
  }

  const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

  return {
    control,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleCloseModal,
    handleOpenModal,
    handleDelete,
    handleSearch,
    handleFilter,
    handleBack,
    handleNext,
    handleGetDept,
    handleCheckedChange,
    employmentStatusList,
    modeOfEmploymentList,
    entities,
    roles,
    jobTitles,
    employees,
    loading,
    grades,
    departments,
    setDepartments,
    contentSelectedItem,
    setContentSelectedItem
  };
};

export default useEmployees;