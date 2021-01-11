import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMssg from '../../../../../utils/errorMsg';
import { useParams, useHistory } from 'react-router-dom';

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
  // kpoYear: yup.mixed().required(
  //   errorMssg({
  //     name: 'KpoYear',
  //     type: 'required',
  //   })
  // ),
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

  const { open, kpoList, loading, kpo, loadingSingleKpo } = useSelector(state => state.kpo.employeeKpoList);
  const userId = useSelector(state => state.profile?.data?.id)

  const { id } = useParams();
  const { push } = useHistory();

  const {
    errors,
    handleSubmit,
    register,
    control,
    setValue
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  // const [listOfKpo, setListOfKpo] = React.useState(kpoList);

  React.useEffect(() => {
    if(!id) {
      if(userId) {
        dispatch(Actions.getAllKpo(userId));
      }
    } else {
      dispatch(Actions.getOneKpo(id));
    }
  }, [userId, id]);

  React.useEffect(() => {
    if(id) {
      register({name: 'lineManagerId', value: 1});
      register({name: 'reviewingManagerId', value: 2});
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

  const onSubmit = (model) => {
    if(id) {
      return dispatch(Actions.updateKpo({
        id,
        userId,
        model
      }));
    }
    dispatch(Actions.createKpo({ userId, item: {...model, kpoYear: `${new Date().getFullYear()}`}}));
  };

  const handleDeleteKpo = (kpoId) => {
    
    dispatch(Actions.deleteKpo({
      id: kpoId,
      userId
    }))
  };

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
    loadingSingleKpo
  };
};

export default useKpoList;