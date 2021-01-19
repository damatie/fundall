import React from 'react';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../../utils/errorMsg';
import { getAllCategory } from '../../KPOcategoryList/store/actions';

const schema = (type) => {
  switch(type){
    case 'quarter':
      return yup.object().shape({
        Q1: yup.string(
          errorMsg({
            name: 'Q1',
            type: 'string'
          })
        ),
        Q2: yup.string(
          errorMsg({
            name: 'Q2',
            type: 'string'
          })
        ),
        Q3: yup.string(
          errorMsg({
            name: 'Q3',
            type: 'string'
          })
        ),
        Q4: yup.string(
          errorMsg({
            name: 'Q4',
            type: 'string'
          })
        ),
        kpoYearendScore: yup.string(
          errorMsg({
            name: 'Year End',
            type: 'string'
          })
        ),
        kpoYearendRemarks: yup.string(
          errorMsg({
            name: 'Year End Remarks',
            type: 'string'
          })
        ),
        kpoPipAchieved: yup.string(
          errorMsg({
            name: 'Year End Remarks',
            type: 'string'
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
        ),
        kpoPipTarget: yup.string(
          errorMsg({
            name: 'PIP Target',
            type: 'string'
          })
        )
      })
    }
  }
};

const useKpoContentList = ({config, state, dispatch, params, push, kpoCategory}) => {
  const { open, data, loading, kpoContent } = state;
  const { id, kpoContentId: kpoId } = params;

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema(config?.type))
  });

  const [shouldDisableButton, setShouldDisableButton] = React.useState(!!kpoContent.status === 4);

  React.useEffect(() => {
    if(kpoId) {
      dispatch(Actions.getOneKpoContent(kpoId))
    }
    dispatch(Actions.getAllKpoContent(id));
    dispatch(getAllCategory());
  }, []);

  // React.useEffect(() => {
  //   // return !!(getValues().kpoYearendScore && getValues().kpoYearendRemarks && getValues().kpoPipAchieved)
  //   if(kpoContent.status === 4) {
  //     // setShouldDisableButton(true)
  //     if(getValues().kpoYearendScore) {
  //       console.log(getValues().kpoYearendScore)
  //     }
  //   }
  // }, [getValues().kpoYearendScore]);

  

  const handleOpenModal = () => {
    dispatch({type: Actions.OPEN_ADD_KPO_CONTENT_MODAL})
  };

  const handleCloseModal = () => {
    dispatch({type: Actions.CLOSE_ADD_KPO_CONTENT_MODAL})
  };

  const onSubmit = (model) => {
    const body = {
      ...model,
      kpoId: kpoId || id 
    };

    if(id && !kpoId) {
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

  const shouldShowInput = (name) => {
    const status = kpoContent.status;
    if(name === 'q1' && status === 0) {
      return true;
    } else if(name === 'q2' && status === 1) {
      return true;
    } else if(name === 'q3' && status === 2) {
      return true;
    } else if(name === 'q4' && status === 3) {
      return true;
    } else if ((name === 'kpoyearendscore' || name === 'kpoyearendremarks' || name === 'kpopipachieved') && status === 4) {
      return true;
    } else {
      return false;
    }
  }


  return {
    ...state,
    open,
    handleOpenModal,
    handleCloseModal,
    errors,
    handleSubmit,
    register,
    onSubmit,
    control,
    kpoData: data,
    push,
    id,
    handleDelete,
    kpoDetails: kpoContent,
    loading,
    kpoCategory,
    shouldShowInput,
    shouldDisableButton
  };
};

export default useKpoContentList;