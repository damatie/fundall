import swal from 'sweetalert2';
import api from 'app/services/api';
import catchErrorMsg from 'utils/catchErrorMsg';

export const GET_ALL_BEHAVIOURAL_CONTENT = 'GET ALL BEHAVIOURAL CONTENT';
export const GET_ONE_BEHAVIOURAL_CONTENT = 'GET ONE BEHAVIOURAL CONTENT';
export const OPEN_BEHAVIOURAL_CONTENT_MODAL = 'OPEN BEHAVIOURAL CONTENT MODAL';
export const CLOSE_BEHAVIOURAL_CONTENT_MODAL = 'CLOSE BEHAVIOURAL CONTENT MODAL';

export const getAllBehaviouralContent = ({id, offset, limit}) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/behavioral/attributes/header/${id}
      `);
      dispatch({
        type: GET_ALL_BEHAVIOURAL_CONTENT,
        payload: data
      })
    } catch (e) {
      dispatch({
        type: GET_ALL_BEHAVIOURAL_CONTENT,
        payload: {}
      })
    }
  }
};

export const getOneBehaviouralContent = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_ONE_BEHAVIOURAL_CONTENT,
      payload: data
    })
  }
};

export const createBehaviouralContent = (model) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Creating...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message } } = await api.post('/behavioral/attributes/content', model);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getAllBehaviouralContent({
        id: model.headerId,
        offset: 0,
        limit: 10
      }));
      dispatch({
        type: CLOSE_BEHAVIOURAL_CONTENT_MODAL
      })
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const updateBehaviouralContent = ({id, model, headerId}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Updating...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message } } = await api.patch(`/behavioral/attributes/content/${id}`, model);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getAllBehaviouralContent({
        id: headerId,
        offset: 0,
        limit: 10
      }))
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const deleteBehaviouralContent = ({ id, headerId}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Deleting...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message } } = await api.delete('/behavioral/attributes/content', {
        data: {
          id
        }
      });
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getAllBehaviouralContent({
        id: headerId,
        offset: 0,
        limit: 10
      }))
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};