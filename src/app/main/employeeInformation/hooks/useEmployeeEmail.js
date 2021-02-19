import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import { updateEmployeeInfo } from '../store/actions';
import * as Actions from 'app/store/actions';

const schema = yup.object().shape({
  alternativeEmail: yup.string(
    errorMsg({
      type: 'string',
      name: 'Alternative Email/Private Email'
    })
  ).email(
    errorMsg({
      type: 'email',
      name: 'Alternative Email/Private Email'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Alternative Email/Private Email'
    })
  ),
  faceBookHandle: yup.string(
    errorMsg({
      type: 'string',
      name: 'Facebook Handle'
    })
  ).matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!'
  ).required(
    errorMsg({
      type: 'required',
      name: 'Facebook Handle'
    })
  ),
  twitterHandle: yup.string(
    errorMsg({
      type: 'string',
      name: 'Twitter Handle'
    })
  ).matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!'
  ).required(
    errorMsg({
      type: 'required',
      name: 'Twitter Handle'
    })
  ),
  linkedInHandle: yup.string(
    errorMsg({
      type: 'string',
      name: 'Linkedin Handle'
    })
  ).matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!'
  ).required(
    errorMsg({
      type: 'required',
      name: 'Linkedin Handle'
    })
  ),
  instagramInHandle: yup.string(
    errorMsg({
      type: 'string',
      name: 'Linkedin Handle'
    })
  ).matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!'
  ).required(
    errorMsg({
      type: 'required',
      name: 'Linkedin Handle'
    })
  ),
  officeExtension: yup.string(
    errorMsg({
      type: 'string',
      name: 'Office Extension'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Office Extension'
    })
  ),
  officeLine: yup.string(
    errorMsg({
      type: 'string',
      name: 'Office Telephone Line'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Office Telephone Line'
    })
  ),
  officialNo: yup.string(
    errorMsg({
      type: 'string',
      name: 'Official Mobile No'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Official Mobile No'
    })
  ),
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
  DOB: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee DOB'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee DOB'
    })
  ),
  nationality: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee County'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee County'
    })
  ),
  stateOfOrigin: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee State of Origin'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee State of Origin'
    })
  ),
  LGA: yup.string(
    errorMsg({
      type: 'string',
      name: 'Employee LGA / City'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Employee LGA / City'
    })
  ),
  nearestAirportToResidence: yup.string(
    errorMsg({
      type: 'string',
      name: 'Nearest Airport to Residence'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Nearest Airport to Residence'
    })
  ),
  internationalPassportNumber: yup.string(
    errorMsg({
      type: 'string',
      name: 'Passport Number'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Passport Number'
    })
  ),
  internationalPassportNumberExpirationDate: yup.string(
    errorMsg({
      type: 'string',
      name: 'Passport Expiration Date'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Passport Expiration Date'
    })
  )
});

const useEmployeeEmail = ({defaultValue, dispatch, state}) => {
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
    dispatch(updateEmployeeInfo({id: state.id, value}));
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  const handleMenuItemClick = ({ value, name }) => () => {
    if(name === 'nationality') {
      dispatch(Actions.getStates(value));
      // swal.fire({
      //   text: 'Please select your city of residence',
      //   icon: 'info',
      // });
    }
    if(name === 'stateOfOrigin') {
      dispatch(Actions.getCitites(value));
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
    handleMenuItemClick
  };
};

export default useEmployeeEmail;