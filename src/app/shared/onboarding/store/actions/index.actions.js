export const SET_INDEX = 'SET_INDEX';
export const GET_INDEX = 'GET_INDEX';

export const setTabIndex = data => {
  return dispatch => {
    dispatch({
      type: SET_INDEX,
      payload: data
    });
  };
};

export const getTabIndex = () => {
  return dispatch => {
    dispatch({
      type: GET_INDEX
    });
  };
};
