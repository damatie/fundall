import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../../utils/errorMsg';

const schema = (type) => {
  switch(type){
    case 'quarter':
      return yup.object().shape({
        q1: yup.string(
          errorMsg({
            name: 'Q1',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Q1',
            type: 'required'
          })
        ),
        q2: yup.string(
          errorMsg({
            name: 'Q2',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Q2',
            type: 'required'
          })
        ),
        q3: yup.string(
          errorMsg({
            name: 'Q3',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Q3',
            type: 'required'
          })
        ),
        q4: yup.string(
          errorMsg({
            name: 'Q4',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Q4',
            type: 'required'
          })
        ),
        yearEnd: yup.string(
          errorMsg({
            name: 'Year End',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Year End',
            type: 'required'
          })
        )
      })
    default: {
      return yup.object().shape({
        kpoCategoryId: yup.number(
          errorMsg({
            name: 'KPO Category',
            type: 'number'
          })
        ).required(
          errorMsg({
            name: 'KPO Category',
            type: 'required'
          })
        ),
        kpoDescription: yup.string(
          errorMsg({
            name: 'Description',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Description',
            type: 'required'
          })
        ),
        target: yup.string(
          errorMsg({
            name: 'Target',
            type: 'string'
          })
        ).required(
          errorMsg({
            name: 'Target',
            type: 'required'
          })
        )
      })
    }
  }
};

const useKpoContentList = (config) => {
  const { open } = useSelector(state => state.kpo.kpoContentList);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    errors,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema(config?.type))
  });

  const handleOpenModal = () => {
    dispatch({type: Actions.OPEN_ADD_KPO_CONTENT_MODAL})
  };

  const handleCloseModal = () => {
    dispatch({type: Actions.CLOSE_ADD_KPO_CONTENT_MODAL})
  };

  const onSubmit = (model) => {
    console.log(model);
  }

  return {
    open,
    handleOpenModal,
    handleCloseModal,
    errors,
    handleSubmit,
    register,
    onSubmit,
    control
  };
};

export default useKpoContentList;