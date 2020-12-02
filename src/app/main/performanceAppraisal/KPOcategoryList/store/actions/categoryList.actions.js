export const OPEN_kPO_CATEGORY_LIST_DIALOG = 'OPEN KPO CATEGORY LIST DIALOG';
export const CLOSE_KPO_CATEGORY_LIST_DIALOG = 'CLOSE KPO CATEGORY LIST';
export const GET_KPO_CATEGORY = 'GET KPO CATEGORY';

export const getCategory = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_KPO_CATEGORY,
      payload: data
    })
  };
};