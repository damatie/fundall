import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMssg from '../../../../../utils/errorMsg';



const schema = yup.object().shape({
  jobRole: yup.string(
    errorMssg({
      name: 'Job Role',
      type: 'string',
    })
  ).required(
    errorMssg({
      name: 'Job Role',
      type: 'required',
    })
  ),
  kpoYear: yup.mixed().required(
    errorMssg({
      name: 'KpoYear',
      type: 'required',
    })
  ),
  lineManagerId: yup.number(
    errorMssg({
      name: 'Line Manager',
      type: 'number',
    })
  ).required(
    errorMssg({
      name: 'Line Manager',
      type: 'required',
    })
  ),
  reviewingManagerId: yup.number(
    errorMssg({
      name: 'Reviewing Manager',
      type: 'number',
    })
  ).required(
    errorMssg({
      name: 'Review Manager',
      type: 'required',
    })
  ),
})

const useKpoList = () => {
  const dispatch = useDispatch();

  const { open } = useSelector(state => state.employeeKpoList);

  const {
    errors,
    handleSubmit,
    register,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const handleCloseModal = () => {
    dispatch({
      type: Actions.CLOSE_EMPLOYEE_KPO_LIST_MODAL
    });
  };

  const handleOpenModal = () => {
    dispatch({
      type: Actions.OPEN_EMPLOYEE_KPO_LIST_MODAL
    })
  };

  const onSubmit = (model) => {
    console.log(model);
  }

  return {
    handleCloseModal,
    handleOpenModal,
    open,
    handleSubmit,
    errors,
    register,
    onSubmit,
    control,
  };
};

export default useKpoList;