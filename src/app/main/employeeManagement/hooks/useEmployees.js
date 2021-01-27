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
  employeeIdNumber: yup.string(
    errorMsg({
      name: 'Employee ID Number',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Employee ID Number',
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
    console.log(value);
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

  const handleDelete = () => {

  };

  const handleSearch = () => {

  };

  const handleFilter = () => {

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
  };
};

export default useEmployees;