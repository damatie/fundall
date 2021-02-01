import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';

const schema = yup.object().shape({
  title: yup.string(
    errorMsg({
      name: 'Title',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Title',
      type: 'required',
    })
  ),
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
      name: 'Middle Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Middle Name',
      type: 'required',
    })
  ),
  gender: yup.string(
    errorMsg({
      name: 'Gender',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Gender',
      type: 'required',
    })
  ),
  nickname: yup.string(
    errorMsg({
      name: 'Nickname',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Nickname',
      type: 'required',
    })
  ),
  maritalStatus: yup.string(
    errorMsg({
      name: 'Marital Status',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Marital Status',
      type: 'required',
    })
  ),
  srgn: yup.string(
    errorMsg({
      name: 'SRGN',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'SRGN',
      type: 'required',
    })
  ),
});

const useEmployeeProfile = ({dispatch, defaultValue}) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const {
    errors,
    register,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValue
  });

  React.useEffect(() => {
    register({
      name: 'gender',
      value: defaultValue.gender
    });
    register({
      name: 'maritalStatus',
      value: defaultValue.maritalStatus
    });
  }, [])

  const onSubmit = (value) => {
    console.log(value);
    alert('hi');
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  }

  return {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit
  };
};

export default useEmployeeProfile