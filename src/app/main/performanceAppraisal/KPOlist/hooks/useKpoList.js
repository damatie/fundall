import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers';
import errorMssg from '../../../../../utils/errorMsg';

// errorMssg({
//   name: '',
//   number: '',
//   type: '',
// });

// const schema = yup.objec().shap({
//   jobRole: yup.string(

//   ).required(

//   ),
//   kpoYear: yup.mixed().required(

//   )
// })

const useKpoList = () => {
  const dispatch = useDispatch();

  const { open } = useSelector(state => state.employeeKpoList);

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

  return {
    handleCloseModal,
    handleOpenModal,
    open
  };
};

export default useKpoList;