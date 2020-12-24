import React from 'react';
import { getOneBehaviouralAttribute } from '../store/actions';

const useBehaviouralAttribute = (state, dispatch) => {

  const handleGetOneBehaviouralAttribute = (data) => {
    dispatch(getOneBehaviouralAttribute(data))
  };

  return {
    state,
    handleGetOneBehaviouralAttribute
  };
};

export default useBehaviouralAttribute;