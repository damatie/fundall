import api from "app/services/api";
import swal from 'sweetalert2';

export const OPEN_JOB_TITLE_MODAL = 'OPEN JOB TITLE MODAL';
export const CLOSE_JOB_TITLE_MODAL = 'CLOSE JOB TITLE MODAL';
export const GET_ALL_JOB_TITLE = 'GET ALL JOB TITLE';
export const GET_ONE_JOB_TITLE = 'GET ONE JOB TITLE';

export const getAllJobTitle = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success }} = await api.get('/appraisal/jobTitle/all');
      if(success) {
        dispatch({
          type: GET_ALL_JOB_TITLE,
          payload: data
        })
      }
    } catch(e) {
      dispatch({
        type: GET_ALL_JOB_TITLE,
        payload: []
      })
    }
  }
};

export const createJobTitle = (model) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: { success, message } } = await api.post('/appraisal/jobTitle/new', model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllJobTitle());
        dispatch({
          type: CLOSE_JOB_TITLE_MODAL,
          payload: 'new'
        })
      }
    } catch (e) {
      swal.fire({
        text: e.reponse?.data.message || e.reponse?.data.error || 'Service not avaialable',
        icon: 'error'
      });
    }
  };
};

export const updateJobTitle = ({id, model}) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: { success, message } } = await api.patch(`/appraisal/jobTitle/update/${id}`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllJobTitle());
      }
    } catch (e) {
      swal.fire({
        text: e.reponse?.data.message || e.reponse?.data.error || 'Service not avaialable',
        icon: 'error'
      });
    }
  };
};

export const deleteJobTitle = (id) => {
  return async (dispatch) => {
    try {
      swal.showLoading();
      const { data: { success, message } } = await api.delete(`${id}`,);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllJobTitle());
      }
    } catch (e) {
      swal.fire({
        text: e.reponse?.data.message || e.reponse?.data.error || 'Service not avaialable',
        icon: 'error'
      });
    }
  };
  
};

export const getOneJobTitle = (data) => {
  return (dispatch) => {
    dispatch({
      tyoe: GET_ONE_JOB_TITLE,
      payload: data
    });
  }
};