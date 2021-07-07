import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_kPO_CATEGORY_LIST_DIALOG, CLOSE_KPO_CATEGORY_LIST_DIALOG, getCategory, getAllCategory, updateKpoCategory, deleteKpoCategory, addKpoCategory } from '../store/actions';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMssg from '../../../../../utils/errorMsg';

const schema = yup.object().shape({
  name: yup.string(
    errorMssg({
      name: 'Name',
      type: 'string',
    })
  )
    .required(
      errorMssg({
        name: 'Name',
        type: 'required',
      })
    ),
  description: yup.string(
    errorMssg({
      name: 'Description',
      type: 'string',
    })
  )
    .required(
      errorMssg({
        name: 'Description',
        type: 'required',
      })
    ),
  status: yup.string(
    errorMssg({
      name: 'Status',
      type: 'string',
    })
  )
    .required(
      errorMssg({
        name: 'Status',
        type: 'required',
      })
    ),
})

const items = [
  {
    id: 1,
    name: 'Organizational Integrity',
    description: 'Lorem ipsum dolor sit...',
    modified: '18 Hours Ago',
    modifiedBy: 'MaryAnn John',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Business Growth',
    description: 'Lorem ipsum dolor sit...',
    modified: '27 July 2019',
    modifiedBy: 'John Doe',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Financial Efficiency',
    description: 'Lorem ipsum dolor sit...',
    modified: '30 July 2019',
    modifiedBy: 'Aomam Nathan',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Client & Employee Engagement',
    description: 'Lorem ipsum dolor sit...',
    modified: '18 Hours Ago',
    modifiedBy: 'MaryAnn John',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Personal Development',
    description: 'Lorem ipsum dolor sit...',
    modified: '27 July 2019',
    modifiedBy: 'MaryAnn John',
    status: 'Inactive'
  }
];

const useKPOcategoryList = () => {
  const dispatch = useDispatch();

  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: category || {}
  })

  const { open, category, title, type, data, loading } = useSelector(state => state.kpoCategory)

  React.useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleOpen = (type) => () => {
    dispatch({
      type: OPEN_kPO_CATEGORY_LIST_DIALOG,
      payload: {
        type: 'new',
        title: 'New KPO category'
      }
    });
  };

  const handleClose = () => {
    dispatch({
      type: CLOSE_KPO_CATEGORY_LIST_DIALOG
    })
  };

  const handleGetCategory = (data) => {
    dispatch({
      type: OPEN_kPO_CATEGORY_LIST_DIALOG,
      payload: {
        type: 'update',
        title: 'Update KPO category'
      }
    });
    dispatch(getCategory(data));
  };

  const onSubmit = (model) => {
    switch (type) {
      case 'new':
        dispatch(addKpoCategory(model))
        break;
      case 'update':
        // console.log(model, type);
        dispatch(updateKpoCategory({
          id: category?.id,
          payload: model
        }))
        break;
      default: {
        return model;
      }
    }
  };

  const handleDeleteKpoCategory = (id) => {
    dispatch(deleteKpoCategory(id));
  };

  return {
    kpoCategoryList: data,
    handleOpen,
    handleClose,
    title,
    open,
    handleGetCategory,
    category,
    type,
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    handleDeleteKpoCategory,
    loading
  };
};

export default useKPOcategoryList;