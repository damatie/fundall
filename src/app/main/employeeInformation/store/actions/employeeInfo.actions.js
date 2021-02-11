import api from 'app/services/api';
import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import * as Actions from 'app/store/actions';

export const OPEN_SHARED_MODAL = 'OPEN SHARED MODAL';
export const CLOSE_SHARED_MODAL = 'CLOSE SHARED MODAL';

export const createEmployeeInfo = ({id, data}) => {
  return async (dispatch) => {
    try {
      loading('Creating Your Info...')
      const { data: { message, success } } = await api.post(`/info`, data);
      if(success) {
        dispatch(Actions.getEmployeeProfile(id));
        swal.fire({
          text: message,
          icon: 'success'
        });
        return;
      }
      swal.fire({
        text: message,
        icon: 'error'
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  }
};
export const updateEmployeeInfo = ({id, value}) => {
  return async (dispatch) => {
    try {
      loading('Updating Info...')
      const { data: { message, success } } = await api.patch(`/info/`, value);
      if(success) {
        dispatch(Actions.getEmployeeProfile(id));
        swal.fire({
          text: message,
          icon: 'success'
        });
        return;
      }
      swal.fire({
        text: message,
        icon: 'error'
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  }
};

export const openSharedModal = (title) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SHARED_MODAL,
      payload: title
    })
  };
};