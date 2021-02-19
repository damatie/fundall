import { useForm } from 'react-hook-form';
import {
  updateEmployeeInfo
} from '../store/actions';
import React from 'react';

const useEmployeeCompensation = ({ dispatch, state }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
  });

  const compensationColumns = (data) => {
    const columns = [];
    data.forEach((item) => {
      columns.push({
        label: item.columnName,
        name: item.columnName.split(' ').join(''),
      })
    });

    return columns;
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  const onSubmit = (value) => {
    const compensationDetails = {
      ...value,
    }
    dispatch(updateEmployeeInfo({
      id: state.id,
      value: { compensationDetails },
    }))
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
    compensationColumns,
    control,
    handleShouldUpdate,
    shouldUpdate
  };
};

export default useEmployeeCompensation;