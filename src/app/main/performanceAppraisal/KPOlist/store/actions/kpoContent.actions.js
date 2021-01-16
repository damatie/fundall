import api from "app/services/api";
import swal from 'sweetalert2';
import loading from "utils/loading";

export const OPEN_ADD_KPO_CONTENT_MODAL = 'OPEN ADD KPO CONTENT MODAL';
export const CLOSE_ADD_KPO_CONTENT_MODAL = 'CLOSE ADD KPO CONTENT MODAL';
export const GET_ALL_KPO_CONTENT = 'GET ALL KPO CONTENT';
export const GET_ONE_KPO_CONTENT = 'GET ONE KPO CONTENT';

export const getAllKpoContent = (kpoId) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get(`/appraisal/kpo-content/all/${kpoId}`);
      if(success) {
        dispatch({
          type: GET_ALL_KPO_CONTENT,
          payload: data
        });
        dispatch({
          type: CLOSE_ADD_KPO_CONTENT_MODAL,
        });
      }
    } catch (e) {
      dispatch({
        type: GET_ALL_KPO_CONTENT,
        payload: []
      });
    }
    
  };
};

export const addKpoContent = (model) => {
  return async (dispatch) => {
    try {
      loading('Creating...');
      const { data: { success, message } } = await api.post(`/appraisal/kpo-content/`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        })
        dispatch(getAllKpoContent(model.kpoId));
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      });
    }
  }
};

export const getOneKpoContent = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get(`/appraisal/kpo-content/${id}`);
      if(success) {
        dispatch({
          type: GET_ONE_KPO_CONTENT,
          payload: data
        });
      }
    } catch (e) {
      dispatch({
        type: GET_ONE_KPO_CONTENT,
        payload: []
      });
    }
  };
};

export const updateKpoContent = (model) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message, success } } = await api.patch(`/appraisal/kpo-content/${model.kpoId}`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getOneKpoContent(model.kpoId));
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      });
    }
  };
};

export const deleteKpoContent = ({id, kpoId}) => {
  return async (dispatch) => {
    loading('Deleting...');
    try {
      swal.showLoading();
      const { data: { message, success, error } } = await api.delete(`/appraisal/kpo-content/all/selected`, {
        data: {
          id
        }
      });
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllKpoContent(kpoId));
      } else {
        swal.fire({
          text: message || error,
          icon: 'error'
        });
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      });
    }
  };
};