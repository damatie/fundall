import api from 'app/services/api';
import loading from 'utils/loading';
import confirm from 'utils/confirm';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';

export const GET_PROMOTION_HISTORY = 'GET PRMOTION HISTORY';
export const OPEN_MODAL = '[PROMOTION HISTORY] OPEN MODAL';
export const CLOSE_MODAL = '[PROMOTION HISTORY] CLOSE MODAL';
export const SINGLE_PROMOTION_HISTORY = 'SINGLE PROMOTION HISTORY';

export const getPromotionHistory = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/promotionHistory/${id}`);
      dispatch({
        type: GET_PROMOTION_HISTORY,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: GET_PROMOTION_HISTORY,
        payload: [],
      });
    }
  }
};

export const addPromotionHistory = ({formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Adding promotion history...');
      const { data: { message } } = await api.post(`/promotionHistory/${employeeId}`, formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getPromotionHistory(employeeId));
      dispatch({type: CLOSE_MODAL})
    } catch (e) {
      catchErrorMsg(e);
    }
  }
};

export const updatePromotionHistory = ({id, formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Updating promotion history...');
      const { data: { message } } = await api.patch(`/promotionHistory/${id}`, formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getPromotionHistory(employeeId));
    } catch (e) {
      catchErrorMsg(e);
    }
  }
};

export const deletePromotionHistory = ({id, employeeId}) => {
  return async (dispatch) => {
    confirm(async () => {
      try {
        loading('Deleting promotion history...');
        const { data: { message } } = await api.delete(`/promotionHistory/${id}`);
        swal.fire({
          text: message,
          icon: 'success',
          timer: 1500
        });
        dispatch(getPromotionHistory(employeeId));
      } catch (e) {
        catchErrorMsg(e);
      }
    });
  }
};