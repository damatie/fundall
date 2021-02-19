import React from 'react';
import * as Actions from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMssg from '../../../../../utils/errorMsg';
import userRole from 'utils/userRole';

const schema = yup.object().shape({
  jobTitleId: yup.string(
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


const useKpoList = ({dispatch, userId, state, push, id, employees, userInfo}) => {

  const { open, kpoList, loading, kpo, loadingSingleKpo, jobTitles } = state;

  const {
    errors,
    handleSubmit,
    register,
    control,
    setValue
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if(!id) {
      if(userId) {
        dispatch(Actions.getAllKpo(userId));
      }
    } else {
      dispatch(Actions.getOneKpo(id));
    }
    dispatch(Actions.getJobTitle());
  }, [userId, id]);

  React.useEffect(() => {
    if(id) {
      register({name: 'lineManagerId', value: kpo.lineManagerId});
      register({name: 'reviewingManagerId', value: kpo.reviewingManagerId});
    }
  }, []);

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

  const showSubmitBtn = (tabValue) => {
    return (kpo.employeeId === userInfo.id && kpo.employee.email === userInfo.email && tabValue === 0);
  }

  const getEmployeesByRole = (role) => {
    return employees.filter((employee) => userRole(employee?.role?.name) === role).map(newEmployee => {
      return {
        name: `${newEmployee.firstName} ${newEmployee.lastName}`,
        id: newEmployee.id
      }
    });
  };

  const onSubmit = (value) => {
    const model = {
      ...value,
      kpoYear: `${new Date().getFullYear()}`
    }
    if(id) {
      return dispatch(Actions.updateKpo({
        id,
        userId,
        model
      }));
    }
    dispatch(Actions.createKpo({ userId, item: model }));
  };

  const handleDeleteKpo = (kpoId) => {
    
    dispatch(Actions.deleteKpo({
      id: kpoId,
      userId
    }))
  };

  const submitKpo = () => {
    if(kpo.status === 'on-going') {
      dispatch(Actions.submitKpo(id));
      return;
    }
    dispatch(Actions.CompleteKpo(id));
  };

  const approveKpo = () => {
    dispatch(Actions.approveKpo(id));
  };

  const shouldShowAddButton = () => {
    return (userInfo.id === state.kpo.employee.id && userInfo.data.email === state.kpo.employee.email);
  };


  const submitButtonText = () => {
    return kpo.status === 'on-going' ? 'Submit KPO for Review' : 'Complete KPO'
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
    handleDeleteKpo,
    listOfKpo: kpoList,
    loading,
    push,
    details: kpo,
    loadingSingleKpo,
    jobTitles,
    getEmployeesByRole,
    showSubmitBtn,
    submitKpo,
    submitButtonText,
    approveKpo,
    shouldShowAddButton
  };
};

export default useKpoList;