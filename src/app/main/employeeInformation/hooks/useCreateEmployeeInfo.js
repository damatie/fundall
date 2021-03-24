import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import swal from 'sweetalert2';
import * as Actions from 'app/store/actions';
import { createEmployeeInfo } from '../store/actions';
import React from 'react';

const schema = yup.object().shape({
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
  privateMobileNumber: yup.string(
    errorMsg({
      type: 'string',
      name: 'Private Mobile Number'
    })
  ).min(
    14,
    errorMsg({
      type: 'min',
      name: 'Private Mobile Number',
      number: 14
    })
  ).max(
    14,
    errorMsg({
      type: 'max',
      name: 'Private Mobile Number',
      number: 14
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Private Mobile Number'
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
  nationality: yup.string(
    errorMsg({
      type: 'string',
      name: 'Nationality'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Nationality'
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
  // signature: yup.mixed().required(
  //   errorMsg({
  //     type: 'required',
  //     name: 'signature'
  //   })
  // ),
});

const useCreateEmployeeInfo = ({dispatch, state, handleClick}) => {
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [signature, setSignature] = React.useState([]);

  const handleClose = () => {
    swal.fire({
      text: 'You have to complete your registration',
      icon: 'info',
    });
  };

  const onSubmit = async (data) => {
    if(signature.length !== 0) {
      const formData = new FormData();
      const entries = {
        ...data,
        signature: signature[0],
      }
      for (const [key, value] of Object.entries(entries)) {
        formData.append(key, value);
      }
      dispatch(createEmployeeInfo({ id:state.id, data: formData, handleClick: handleClick || handleClose }));
      return;
    }
    swal.fire({
      text: 'Please enter your password',
      icon: 'warn',
    });
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
    onSubmit,
    handleClose,
    errors,
    register,
    handleSubmit,
    handleMenuItemClick,
    control,
    setSignature
  };
};

export default useCreateEmployeeInfo;