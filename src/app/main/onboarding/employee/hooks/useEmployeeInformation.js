import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import {getCountries} from 'app/store/actions';
import * as Actions from '../store/actions';
import { useAuth } from 'app/hooks/useAuth';

const { useState, useEffect } = React;

const schema = yup.object().shape({
    officeExtension: yup.string(
    errorMsg({
      name: 'Office Extension',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Office Extension',
      type: 'required',
    })
  ),
  privateMobileNumber: yup.string(
    errorMsg({
      name: 'Private Mobile Number',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Private Mobile Number',
      type: 'required',
    })
  ),
  officeLine: yup.string(
    errorMsg({
      name: 'Office Telephone Line',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Office Telephone Line',
      type: 'required',
    })
  ),
  officialNo: yup.string(
    errorMsg({
      name: 'Official Mobile No',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Official Mobile No',
      type: 'required',
    })
  ),
  alternativeEmail: yup.string(
    errorMsg({
      name: 'Alternative Email/Private Email',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Alternative Email/Private Email',
      type: 'required',
    })
  ),
  nationality: yup.string(
    errorMsg({
      name: 'Nationality',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Nationality',
      type: 'required',
    })
  ),
  facebookHandle: yup.string(
    errorMsg({
      name: 'Facebook Handle',
      type: 'string',
    })
  ),
  twitterHandle: yup.string(
    errorMsg({
      name: 'Twitter Handle',
      type: 'string',
    })
  ),
  linkedInHandle: yup.string(
    errorMsg({
      name: 'LinkedIn Handle',
      type: 'string',
    })
  ),
  zipCode: yup.number(
    errorMsg({
      name: 'Postal/Zip Code',
      type: 'number',
    })
  ),
  employeeManager1: yup.string(
    errorMsg({
      name: 'Employee Manager 1',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Employee Manager 1',
      type: 'required',
    })
  ),
  functionalManager: yup.string(
    errorMsg({
      name: 'Functional Manager',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Functional Manager',
      type: 'required',
    })
  ),
  reviewingManager: yup.string(
    errorMsg({
      name: 'Reviewing Manager',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Reviewing Manager',
      type: 'required',
    })
  ),
  personalAssistant: yup.string(
    errorMsg({
      name: 'Personal Assistant',
      type: 'string',
    })
  )
});

const useEmployeeInformation = ({dispatch, state, goToNextStepper}) => {

    const { countries, states, cities } = state.regions; 
    const { data, success, loading } = state.EmployeeInformation.employeeinformation; 
    const [file, setFile] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState({
        officeExtension: 0,
        privateMobileNumber: '',
        officeLine: '',
        officialNo: '',
        alternativeEmail: '',
        nationality: '',
        facebookHandle: '',
        twitterHandle: '',
        linkedInHandle: '',
        zipCode: '',
        employeeManager1: '',
        functionalManager: '',
        reviewingManager: '',
        personalAssistant: ''
    });

    const {
        errors,
        register,
        handleSubmit,
        control
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValue: {
            ...data,
            alternativeEmail: data.personalEmail,
            functionalManager: data.employeeManager2,
            facebookHandle: data.faceBookHandle
        }
    });

    React.useEffect(() => {
        dispatch(getCountries());
        dispatch(Actions.getEmployeeInfo());
    }, []);

    React.useEffect(() => {
        setSelectedItem({
            ...data,
            alternativeEmail: data.personalEmail,
            functionalManager: data.employeeManager2,
            facebookHandle: data.faceBookHandle
        });
    }, [data])

    const onSubmit = (value) => {
        console.log(value);
        const userProfile= useAuth().getUserProfile;
        let formData = new FormData();
        for (let i = 0; i < Object.keys(value).length; i++) {
            formData.append(`${Object.keys(value)[i]}`, value[Object.keys(value)[i]]);
        }
        if(file.length > 0){
            formData.append("signature", file[0], `${userProfile?.firstName}_${userProfile?.lastName}_signuature.${file[0]?.name?.split('.')?.pop()}`);
        }
        if(value?.id){
            dispatch(Actions.updateEmployeeInfo(formData, value?.employeeId, goToNextStepper))
        }else{
            dispatch(Actions.addEmployeeInfo(formData, goToNextStepper))
        }
        // goToNextStepper();
    };

    const isValid = () => {
        console.log({selectedItem})
        return !selectedItem.privateMobileNumber ||!selectedItem.alternativeEmail || !selectedItem.employeeManager1 || !selectedItem.functionalManager
        || !selectedItem.nationality || !selectedItem.officialNo || !selectedItem.reviewingManager || (file.length === 0 && !selectedItem?.id)
    }


  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    control,
    countries,
    file, 
    setFile,
    selectedItem,
    setSelectedItem,
    info: {
        ...data,
        alternativeEmail: data.personalEmail,
        functionalManager: data.employeeManager2,
        facebookHandle: data.faceBookHandle
    },
    isValid,
    loading
  };
};

export default useEmployeeInformation