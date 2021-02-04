import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import * as Actions from 'app/store/actions';

const schema = yup.object().shape({
  employeeManager1: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee Manager 1'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee Manager 1'
    })
  ),
  employeeManager2: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee Manager 2'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee Manager 2'
    })
  ),
  reviewingManager: yup.string(
    errorMsg({
      type: 'string',
      name: 'Reviewing Manager'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Reviewing Manager'
    })
  ),
  personalAssistant: yup.string(
    errorMsg({
      type: 'string',
      name: 'Personal Assistant'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Personal Assistant'
    })
  ),
  jobTitle: yup.string(
    errorMsg({
      type: 'string',
      name: 'Job Title'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Job Title'
    })
  ),
  entity: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee SRG Entity'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee SRG Entity'
    })
  ),
  department: yup.string(
    errorMsg({
      type: 'string',
      name: 'Department/Function'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Department/Function'
    })
  ),
  srgSeniorityDate: yup.string(
    errorMsg({
      type: 'string',
      name: 'SRG Seniority'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'SRG Seniority'
    })
  ),
  industrySeniorityDate: yup.string(
    errorMsg({
      type: 'string',
      name: 'Industry Seniority'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Industry Seniority'
    })
  ),
  employeeStartDate: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee Start Date'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee Start Date'
    })
  ),
  employmentStatus: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employment Status'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employment Status'
    })
  ),
});

const useEmployeeOrganization = ({ dispatch, state, defaultValue }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValue
  });

  const onSubmit = (value) => {
    dispatch(Actions.updateEmployeeProfile(state.id, value));
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  const handleMenuItemClick = ({ value, name }) => () => {
    if(name === 'entity') {
      console.log(value);
      dispatch(Actions.getDepartments(2));
    }
  }

  return {
    handleMenuItemClick,
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control
  };
};

export default useEmployeeOrganization;