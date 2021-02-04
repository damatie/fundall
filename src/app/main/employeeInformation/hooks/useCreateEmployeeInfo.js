import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import swal from 'sweetalert2';
import * as Actions from 'app/store/actions';
import { createEmployeeInfo } from '../store/actions';

const schema = yup.object().shape({
  title: yup.string(
    errorMsg({
      type: 'string',
      name: 'Title'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Title'
    })
  ),
  maritalStatus: yup.string(
    errorMsg({
      type: 'string',
      name: 'Marital Status'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Marital Status'
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
  privateMobileNumber: yup.string(
    errorMsg({
      type: 'string',
      name: 'Private Mobile Number'
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
  gender: yup.string(
    errorMsg({
      type: 'string',
      name: 'Gender'
    })
  ).required(
    errorMsg({
      type: 'required',
      name: 'Gender'
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
});

const useCreateEmployeeInfo = ({dispatch, state}) => {
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(createEmployeeInfo({id:state.id, data}));
  };

  const handleClose = () => {
    swal.fire({
      text: 'You have to complete your registration',
      icon: 'info',
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
    control
  };
};

export default useCreateEmployeeInfo;