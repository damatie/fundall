import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import * as Actions from 'app/store/actions';

const schema = yup.object().shape({
  officialEmail: yup.string(
    errorMsg({
      type: 'string',
      name: 'Official Email'
    })
  ).email(
    errorMsg({
      type: 'email',
      name: 'Official Email'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Official Email'
    })
  ),
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
  facebookHandle: yup.string(
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
});

const useEmployeeEmail = ({defaultValue, dispatch, state}) => {
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

  const onSubmit = (value) => {
    dispatch(Actions.updateEmployeeProfile(state.id, value));
  };

  const handleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  return {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit
  };
};

export default useEmployeeEmail;