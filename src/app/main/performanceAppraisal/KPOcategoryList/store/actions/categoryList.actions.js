import api from "app/services/api";
import swal from 'sweetalert2';

export const OPEN_kPO_CATEGORY_LIST_DIALOG = 'OPEN KPO CATEGORY LIST DIALOG';
export const CLOSE_KPO_CATEGORY_LIST_DIALOG = 'CLOSE KPO CATEGORY LIST';
export const GET_KPO_CATEGORY = 'GET KPO CATEGORY';
export const GET_ALL_KPO_CATEGORY = 'GET ALL KPO CATEGORY';

export const getCategory = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_KPO_CATEGORY,
      payload: data
    })
  };
};

export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      const { data: { data , success }} = await api.get('/appraisal/kpo-category/');
      if(success) {
        dispatch({
          type: GET_ALL_KPO_CATEGORY,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ALL_KPO_CATEGORY,
        payload: []
      })
    }
    
  }
};

export const addKpoCategory = (payload) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: {
        success,
        message,
      }} = await api.post('/appraisal/kpo-category/', payload);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        });
        dispatch(getAllCategory());
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error,
        icon: 'error',
      })
    }
  }
};

export const updateKpoCategory = ({id, payload}) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: {
        success,
        message,
      }} = await api.patch(`/appraisal/kpo-category/${id}`, payload);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        });
        dispatch(getAllCategory());
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error,
        icon: 'error',
      })
    }
  }
};

export const deleteKpoCategory = (id) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: {
        success,
        message,
      }} = await api.delete(`/appraisal/kpo-category/${id}`);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        });
        dispatch(getAllCategory());
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error,
        icon: 'error',
      })
    }
  }
};