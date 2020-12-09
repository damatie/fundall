import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../../utils/errorMsg';
import { useHistory, useParams } from 'react-router-dom';

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

const kpoData = [
  {
    kpoCategory: 'Admin',
    description: 'lorem ipsum dorem ipsam...',
    target: 'Less then 90%',
    q1: '70%',
    q2: '80%',
    q3: '',
    q4: '',
    yearEnd: '',
    id: 1
  },
  {
    kpoCategory: 'Admin',
    description: 'lorem ipsum dorem ipsam...',
    target: 'Less then 90%',
    q1: '70%',
    q2: '80%',
    q3: '',
    q4: '',
    yearEnd: '',
    id: 2
  }
];

const kpoDetails = {
  kpoCategory: 'Admin',
  description: 'lorem ipsum dorem ipsam...',
  target: 'Less then 90%',
  q1: '70%',
  q2: '80%',
  q3: '',
  q4: '',
  yearEnd: '',
  id: 2
}

const useKpoContentList = (config) => {
  const { open } = useSelector(state => state.kpo.kpoContentList);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id, kpoId } = useParams();

  const {
    register,
    handleSubmit,
    errors,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema(config?.type))
  });

  React.useEffect(() => {
    dispatch(Actions.getAllKpoContent(id));
  }, []);

  const handleOpenModal = () => {
    dispatch({type: Actions.OPEN_ADD_KPO_CONTENT_MODAL})
  };

  const handleCloseModal = () => {
    dispatch({type: Actions.CLOSE_ADD_KPO_CONTENT_MODAL})
  };

  const onSubmit = (model) => {
    const body = {
      ...model,
      kpoId: id
    };

    if(id) {
      dispatch(Actions.addKpoContent(body));
    } else if (kpoId) {
      dispatch(Actions.updateKpoContent(body))
    }
    return;
  };

  const handleDelete = (kpoContentId) => {
    dispatch(Actions.deleteKpoContent({
      id: kpoContentId,
      kpoId: id
    }));
  };

  return {
    open,
    handleOpenModal,
    handleCloseModal,
    errors,
    handleSubmit,
    register,
    onSubmit,
    control,
    kpoData,
    push,
    id,
    handleDelete,
    kpoDetails
  };
};

export default useKpoContentList;