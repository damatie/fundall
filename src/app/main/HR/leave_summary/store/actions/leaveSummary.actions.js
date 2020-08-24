
export const GET_ONE_LEAVE_SUMMARY = 'GET ONE LEAVE SUMMARY';

export const getOneLeaveSummary = (data) => {
  return dispatch => {
    dispatch({
      type: GET_ONE_LEAVE_SUMMARY,
      payload: data
    })
  };
};

