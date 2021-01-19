import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';

export const OPEN_BEHAVIOURAL_MODAL = 'OPEN BEHAVIOURAL MODAL';
export const CLOSE_BEHAVIOURAL_MODAL = 'CLOSE BEHAVIOURAL MODAL';
export const GET_ALL_BEHAVIOURAL_ATTRIBUTE = 'GET ALL BEHAVIOURAL ATTRIBUTE';
export const GET_ONE_BEHAVIOURAL_ATTRIBUTE = 'GET ONE BEHAVIOURAL ATTRIBUTE';

export const getAllBehaviouralAttribute = ({offset, limit}) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/behavioral/attributes/header/?offset=${offset}&limit=${limit}`);
      dispatch({
        type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
        payload: data.rows || []
      })
    } catch (e) {
      dispatch({
        type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
        payload: []
      })
    }
  }
};

export const createBehaviouralAttribute = (model) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Creating...',
        allowOutsideClick: false,
      });
      swal.showLoading();
      const { data: { message } } = await api.post('/behavioral/attributes/header', model);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getAllBehaviouralAttribute({offset: 0, limit: 10}));
      dispatch({
        type: CLOSE_BEHAVIOURAL_MODAL
      })
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const updateBehaviouralAttribute = ({id, model}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Updating...',
        allowOutsideClick: false,
      });
      swal.showLoading();
      const { data: { message } } = await api.patch(`/behavioral/attributes/header/${id}`, model);
      swal.fire({
        text: message,
        icon: 'success'
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const deleteBehaviouralAttribute = (id) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Deleting...',
        allowOutsideClick: false,
      });
      swal.showLoading();
      const { data: { message } } = await api.delete('/behavioral/attributes/header/all/selected', {
        data: {
          id
        }
      });
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getAllBehaviouralAttribute({offset: 0, limit: 10}));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const getOneBehaviouralAttribute = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/behavioral/attributes/header/${id}`);
      dispatch({
        type: GET_ONE_BEHAVIOURAL_ATTRIBUTE,
        payload: data || {}
      })
    } catch (e) {
      dispatch({
        type: GET_ONE_BEHAVIOURAL_ATTRIBUTE,
        payload: {}
      })
    }
  }
};