import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMssg from '../../../../../utils/errorMsg';
import { useParams, useHistory } from 'react-router-dom';

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

const data = [
  {
    id: 1,
    jobRole: 'Admin Officer',
    totalScore: 87,
    kpoYear: '2019',
    dateCompleted: '02 oct 2019',
    lineManager: 'Patrick Obama',
    reviewingManager: 'John Osama'
  },
  {
    id: 2,
    jobRole: 'Admin Officer',
    totalScore: 90,
    kpoYear: '2020',
    dateCompleted: '02 oct 2020',
    lineManager: 'Patrick Obama',
    reviewingManager: 'John Osama'
  }
];

const details = {
  id: 1,
  jobRole: 'Admin Officer',
  totalScore: 87,
  kpoYear: '2019',
  dateCompleted: '02 oct 2019',
  lineManager: 'Josh Maximum',
  reviewingManager: 'John Osama'
};

const useKpoList = () => {
  const dispatch = useDispatch();

  const { open, kpoList, loading, kpo, } = useSelector(state => state.kpo.employeeKpoList);

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

  const [listOfKpo, setListOfKpo] = React.useState(data);

  React.useEffect(() => {
    if(!id) {
      dispatch(Actions.getAllKpo(1));
    } else {
      dispatch(Actions.getOneKpo(id));
    }
  }, []);

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
    dispatch(Actions.createKpo({ userId: 1, item: model}))
  };

  const handleDeleteKpo = (kpoId) => {
    if(id) {
      return dispatch(Actions.updateKpo({
        id,
        userId: 1
      }));
    }
    dispatch(Actions.deleteKpo({
      id: kpoId,
      userId: 1
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
    listOfKpo,
    loading,
    push,
    details
  };
};

export default useKpoList;