// import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import { kpoSummary } from '../store/actions';

const lineManagerSchema = yup.object().shape({
  strengths: yup.string(errorMsg({
    name: 'Employee Key Strength',
    type: 'string'
  })).required(errorMsg({
    name: 'Employee Key Strength',
    type: 'required'
  })),
  areaOfImprovements: yup.string(errorMsg({
    name: 'Employee Area of Improvement',
    type: 'string'
  })).required(errorMsg({
    name: 'Employee Area of Improvement',
    type: 'required'
  })),
  personnelOverallRating: yup.string(errorMsg({
    name: 'Personnel Overall Rating',
    type: 'string'
  })).required(errorMsg({
    name: 'Personnel Overall Rating',
    type: 'required'
  })),
  lineManagerComment: yup.string(errorMsg({
    name: 'Line Manager Comment',
    type: 'string'
  })).required(errorMsg({
    name: 'Line Manager Comment',
    type: 'required'
  })),
});

const employeeSchema = yup.object().shape({
  employeeComment: yup.string(errorMsg({
    name: 'Employee Comment',
    type: 'string'
  })).required(errorMsg({
    name: 'Employee Comment',
    type: 'required'
  }))
});

const reviewingManagerSchema = yup.object().shape({
  reviewingManagerComment: yup.string(errorMsg({
    name: 'Reviewing Manager Comment',
    type: 'string'
  })).required(errorMsg({
    name: 'Reviewing Manager Comment',
    type: 'required'
  }))
});

const useLineManagerComment = ({dispatch, id}) => {
  const {
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(lineManagerSchema),
  });

  const onSubmit = (model) => {
    dispatch(kpoSummary({
      id,
      model,
      type: 'lm'
    }))
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
  }
};

const useEmployeeComment = ({dispatch, id}) => {
  const {
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(employeeSchema),
  });

  const onSubmit = (model) => {
    dispatch(kpoSummary({
      id,
      model,
      type: 'employee'
    }))
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
  }
};

const useReviewingManagerComment = ({dispatch, id}) => {
  const {
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(reviewingManagerSchema),
  });

  const onSubmit = (model) => {
    dispatch(kpoSummary({
      id,
      model,
      type: 'rm'
    }))
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
  }
};

const checkIfAssigned = () => {

};

// const checkIf
const useKpoSummary = ({dispatch, state, userInfo}) => {
  const role = userInfo.role;
  const userRole = () => {

  };

  const shouldShowButton = (user) => {
    if(role.toLowerCase() === 'employee' && role.toLowerCase()=== user) {
      return true;
    };
    // if(user === 'linemanager') {
    //   state
    // }
  }
  return {
    lineManagerComment: useLineManagerComment({dispatch}),
    employeeComment: useEmployeeComment({dispatch}),
    reviewingManagerComment: useReviewingManagerComment({dispatch}),
    shouldShowButton,

  };
};

export default useKpoSummary;