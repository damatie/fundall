import React from 'react';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../../utils/errorMsg';
import { getAllCategory } from '../../KPOcategoryList/store/actions';
import userRole from 'utils/userRole';

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
        ).max(100, errorMsg({
          number: 100,
          name: 'Description',
          type: 'max'
        })),
        target: yup.number(
          errorMsg({
            name: 'Target',
            type: 'number'
          })
        ).required(
          errorMsg({
            name: 'Target',
            type: 'required'
          })
        ),
        kpoPipTarget: yup.number(
          errorMsg({
            name: 'PIP Target',
            type: 'number'
          })
        ),
      })
    }
  }
};

const useKpoContentList = ({config, state, dispatch, params, push, kpoCategory, userInfo}) => {
  const { open, data, loading, kpoContent } = state;
  const { id, kpoContentId: kpoId } = params;

  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema(config?.type))
  });

  const [shouldDisableButton, setShouldDisableButton] = React.useState(false);
  const [contentValue, setContentValue] = React.useState({});
  const [contentList, setContentList] = React.useState([]);
  const [contentSelectedItem, setContentSelectedItem] = React.useState({
    id: 0,
    kpoCategoryId: '',
    category: '',
    kpoDescription: '',
    target: '',
    kpoPipTarget: ''
  });
  React.useEffect(() => {
    if(kpoId) {
      dispatch(Actions.getOneKpoContent(kpoId))
    }
    dispatch(Actions.getAllKpoContent(id));
    dispatch(getAllCategory());
  }, []);

  React.useEffect(() => {
    // return !!(getValues().kpoYearendScore && getValues().kpoYearendRemarks && getValues().kpoPipAchieved)
    if(kpoContent.status === 4 && userRole(userInfo.role) !== 'linemanager') {
      setShouldDisableButton(true);
    }
    if(userRole(userInfo.role) !== 'linemanager' && kpoContent.updateStatus === 'approved') {
      setShouldDisableButton(true);
    }
  }, [kpoContent]);

  

  const handleOpenModal = () => {
    dispatch({type: Actions.OPEN_ADD_KPO_CONTENT_MODAL})
  };

  const handleCloseModal = () => {
    dispatch({type: Actions.CLOSE_ADD_KPO_CONTENT_MODAL})
  };

  const onSubmit = () => {
    // console.log(model)
    // const body = {
    //   ...model,
    //   kpoId: +kpoId || +id
    // };
    const payload = {
        kpoId: +kpoId || +id,
        kpoContent: contentList.map( content => {
          return {
            kpoCategoryId: content.kpoCategoryId,
            category: content.category,
            kpoDescription: content.kpoDescription,
            target: content.target,
            kpoPipTarget: content.kpoPipTarget
          }
        })
    }
    if(id && !kpoId) {
      dispatch(Actions.addKpoContent(payload));
    } else if (kpoId) {
      // if(type === 'quarterly' && kpoContent.updateStatus !== 'approved') {
      //   dispatch(Actions.updateKpoContentQuarterly(body));
      //   return;
      // }
      // dispatch(Actions.updateKpoContent({...body, ...contentValue}));
      return;
    }
    return;
  };

  const handleDelete = (kpoContentId) => {
    dispatch(Actions.deleteKpoContent({
      id: kpoContentId,
      kpoId: id
    }));
  };

  const handleAddList = (model) => {
    console.log(model);
    contentList.push({
      ...model,
      id: model.id || contentList.length+1,
      category: kpoCategory.find(cat => cat.id === model.kpoCategoryId).name
    });
    setContentList(contentList);
    reset();
    setContentSelectedItem({
      id: 0,
      kpoCategoryId: '',
      category: '',
      kpoDescription: '',
      target: '',
      kpoPipTarget: 0
    });
  }

  const handleEditList = (id) => {
    console.log(id);
    setContentSelectedItem(contentList.find(content => content.id === id));
    setContentList(contentList.filter(content => content.id !== id));
  }

  const KpoContentValue = () => {
    setContentValue(getValues());
    // console.log(getValues());
  }

  const shouldShowInput = (name) => {
    const { status, updateStatus } = kpoContent;
    if(updateStatus !== 'approved' || !updateStatus) {
      if(name === 'q1' && status === 0) {
        return true;
      } else if(name === 'q2' && status === 1) {
        return true;
      } else if(name === 'q3' && status === 2) {
        return true;
      } else if(name === 'q4' && status === 3) {
        return true;
      } else if ((name === 'kpoyearendscore' || name === 'kpoyearendremarks' || name === 'kpopipachieved') && status === 4 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else {
        return false;
      }
    } else {
      if(name === 'q1' && status > 0 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else if(name === 'q2' && status > 1 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else if(name === 'q3' && status > 2 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else if(name === 'q4' && status > 3 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else if ((name === 'kpoyearendscore' || name === 'kpoyearendremarks' || name === 'kpopipachieved') && status > 4 && userRole(userInfo.role) === 'linemanager') {
        return true;
      } else {
        return false;
      }
    }
  };

  const disableInput = () => {
    if(userRole(userInfo.role) !== 'linemanager') {
      return {
        disabled: true,
      }
    }
  }


  return {
    ...state,
    disableInput,
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
    shouldDisableButton,
    pipEligibility: userInfo.data.employeeGrade?.pipEligibility,
    KpoContentValue,
    handleAddList,
    handleEditList,
    contentList, /*: [{
        kpoCategoryId: 0,
        category: '',
        kpoDescription: '',
        target: 0,
        kpoPipTarget: 0
    }],*/
    contentSelectedItem,
    setContentSelectedItem
  };
};

export default useKpoContentList;
