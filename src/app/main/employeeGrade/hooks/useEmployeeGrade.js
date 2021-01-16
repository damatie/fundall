import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  name: yup.string(
    errorMsg({
      name: 'Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Name',
      type: 'required',
    })
  ),
  description: yup.string(
    errorMsg({
      name: 'Description',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Description',
      type: 'required',
    })
  ),
  pip: yup.mixed().required(
    errorMsg({
      name: 'PIP Eligible',
      type: 'required',
    })
  ),
  entity: yup.mixed().required(
    errorMsg({
      name: 'Entity',
      type: 'required',
    })
  ),
});

const useEmployeeGrade = (params, dispatch) => {
  const {
    errors,
    handleSubmit,
    control,
    register,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  // const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch({
      type: Actions.OPEN_EMPLPYEE_GRADE_MODAL,
      payload: 'new'
    })
  };

  const handleClose = () => {
    dispatch({
      type: Actions.CLOSE_EMPLOYEE_GRADE_MODAL,
      payload: 'new'
    })
  };

  const textFieldValue = (name) => {
    switch(params?.type) {
      case 'new':
        return '';
      case 'update':
        if(name === 'entityName') {
          const value = params.entity.filter(item => item.entityName === params.singleData.entityName);
          return value[0];
        }
        return params?.singleData[name];
    }

  };

  const modalTitle = () => {
    switch(params?.type) {
      case 'new':
        return 'New Employee Grade';
      case 'update':
        return 'Update Employee Grade';
    }
  };

  const buttonTitle = () => {
    switch(params?.type) {
      case 'new':
        return 'Create Employee Grade';
      case 'update':
        return 'Update Employee Grade';
    }
  }

  const onSubmit = (value) => {
    const model = {
      model: {
        entityName: value.entity.entityName,
        entityId: value.entity.id,
        gradeName: value.name,
        gradeDescription: value.description,
        pipEligibility: value.pip
      },
      pagination: {
        limit: 10,
        offset: 0
      }
      
    };
    switch(params?.type) {
      case 'new':
        dispatch(Actions.createEmployeeGrade({...model}));
        break;
      case 'update':
        dispatch(Actions.updateEmployeeGrade({ id: params.singleData?.id, ...model }));
        break;
      default: 
        return model;
    }
  };

  const handleGetOne = (data) => {
    dispatch({
      type: Actions.GET_ONE_EMPLOYEE_GRADE,
      payload: data
    })
    dispatch({
      type: Actions.OPEN_EMPLPYEE_GRADE_MODAL,
      payload: 'update'
    })
  };

  const handleDelete = (id) => {
    const params = {
      id,
      pagination: {
        offset: 0,
        count: 10
      }
    }
    dispatch(Actions.deleteEmployeeGrade({...params}));
  };

  const gotoPage = (newPage) => {
    if(params?.term === '') {
      return dispatch(Actions.getAllEmployeeGrade({
        offset: newPage,
        limit: 10
      }));
    }
    return dispatch(Actions.filterEmployeeGrade({
      term: params?.term,
      offset: newPage,
      limit: 10
    }))
  }

  const handleFilter = (ev) => {
    dispatch(Actions.filterEmployeeGrade({
      term: ev.target.value,
      offset: 0,
      limit: 10
    }))
  }

  return {
    handleOpen,
    handleClose,
    handleDelete,
    register,
    errors,
    control,
    handleGetOne,
    onSubmit,
    handleSubmit,
    textFieldValue,
    modalTitle,
    buttonTitle,
    x: 'fucking test',
    state: params,
    getValues: getValues(),
    gotoPage,
    handleFilter
  };
};

export default useEmployeeGrade;