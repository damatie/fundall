import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import * as Actions from 'app/store/actions';
import swal from 'sweetalert2';

const schema = yup.object().shape({
  cityOfResidence: yup.string(
    errorMsg({
      type: 'string',
      name: 'City'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'City'
    })
  ),
  contactAddress: yup.string(
    errorMsg({
      type: 'string',
      name: 'Contact Address'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Contact Address'
    })
  ),
  // state: yup.string(
  //   errorMsg({
  //     type: 'string',
  //     name: 'State'
  //   })
  // ).required(
  //   errorMsg({
  //     type: 'required',
  //     name: 'State'
  //   })
  // ),
  zipCode: yup.string(
    errorMsg({
      type: 'string',
      name: 'Postal/Zip Code'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Postal/Zip Code'
    })
  ),
  country: yup.string(
    errorMsg({
      type: 'string',
      name: 'Country'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Country'
    })
  ),
});

const useEmployeeLocation = ({dispatch, state, defaultValue}) => {
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
    if(name === 'country') {
      dispatch(Actions.getStates(value));
      swal.fire({
        text: 'Please select your city of residence',
        icon: 'info',
      });
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

export default useEmployeeLocation;