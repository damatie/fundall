import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  firstName: yup.string(
    errorMsg({
      name: 'First Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'First Name',
      type: 'required',
    })
  ),
  lastName: yup.string(
    errorMsg({
      name: 'Last Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Last Name',
      type: 'required',
    })
  ),
  middleName: yup.string(
    errorMsg({
      name: 'middle Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Middle Name',
      type: 'required',
    })
  ),
  email: yup.string(
    errorMsg({
      name: 'Officail Email',
      type: 'string',
    })
  ).email(
    errorMsg({
      name: 'Officail Email',
      type: 'email',
    })
  ).required(
    errorMsg({
      name: 'Officail Email',
      type: 'required',
    })
  ),
  entityId: yup.string(
    errorMsg({
      name: 'Entity',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Entity',
      type: 'required',
    })
  ),
  jobTitleId: yup.string(
    errorMsg({
      name: 'Job Title',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Job Title',
      type: 'required',
    })
  ),
  departmentId: yup.string(
    errorMsg({
      name: 'Department',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Department',
      type: 'required',
    })
  ),
  roleId: yup.string(
    errorMsg({
      name: 'Role',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Role',
      type: 'required',
    })
  ),
  idNumber: yup.string(
    errorMsg({
      name: 'Employee ID Card Number',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Employee ID Card Number',
      type: 'required',
    })
  ),
  employeeGradeId: yup.string(
    errorMsg({
      name: 'Employee Grade',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Employee Grade',
      type: 'required',
    })
  ),
  srgSeniorityDate: yup.string(
    errorMsg({
      name: 'SRG Seniority Date',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'SRG Seniority Date',
      type: 'required',
    })
  )
});

const useEmployees = ({dispatch}) => {
  const {
    control,
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (value) => {
    dispatch(Actions.addEmployee(value));
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
    handleGetDept
  };
};

export default useEmployees;