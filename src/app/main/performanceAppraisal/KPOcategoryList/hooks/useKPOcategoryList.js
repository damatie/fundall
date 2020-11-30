import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_kPO_CATEGORY_LIST_DIALOG, CLOSE_KPO_CATEGORY_LIST_DIALOG, getCategory } from '../store/actions';

const data = [
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
  const [kpoCategoryList] = React.useState(data);

  const { open, category, title, type } = useSelector(state => state.kpoCategory)

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
  }

  return {
    kpoCategoryList,
    handleOpen,
    handleClose,
    title,
    open,
    handleGetCategory,
    category,
    type
  };
};

export default useKPOcategoryList;