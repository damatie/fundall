import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import * as Actions from 'app/store/actions';
import swal from 'sweetalert2';
import { getStates } from '../services';

const { useState, useEffect } = React;

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
  nickName: yup.string(
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
  srgIdNumber: yup.string(
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
  phoneNumber: yup.string(
    errorMsg({
      name: 'Phone Number',
      type: 'string',
    })
  ).min(
    14,
    errorMsg({
      name: 'Phone Number',
      type: 'min',
      number: 14,
    })
  ).max(
    14,
    errorMsg({
      name: 'Phone Number',
      type: 'max',
      number: 14,
    })
  ).required(
    errorMsg({
      name: 'Phone Number',
      type: 'required',
    })
  ),
  country: yup.string(
    errorMsg({
      name: 'Country',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Country',
      type: 'required',
    })
  ),
  cityOfResidence: yup.string(
    errorMsg({
      name: 'City of Residence',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'City of Residence',
      type: 'required',
    })
  ),
  residentialAddress: yup.string(
    errorMsg({
      name: 'Residential Address',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Residential Address',
      type: 'required',
    })
  )
});

const useEmployeeProfile = ({dispatch, defaultValue, state, country}) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [states, setStates] = useState([]);
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

  useEffect(() => {
    console.log(country)
    !!country && getStates(country.country).then(data => {
      setStates(data);
    });
  }, [country]);

  const onSubmit = (value) => {
    dispatch(Actions.updateEmployeeProfile(state.id, value));
    setShouldUpdate(!shouldUpdate);
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  }

  const handleMenuItemClick = ({ value, name }) => () => {
    if(name === 'country') {
      console.log(value)
      getStates(value).then(data => {
        setStates(data);
        swal.fire({
          text: 'Please select your city of residence',
          icon: 'info',
        });
      });
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control,
    handleMenuItemClick,
    states,
  };
};

export default useEmployeeProfile