import api from 'app/services/api';
import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';

export const OPEN_SHARED_MODAL = 'OPEN SHARED MODAL';
export const CLOSE_SHARED_MODAL = 'CLOSE SHARED MODAL';
export const EMPLOYEE_DATA = 'EMPLOYEE DATA';


export const getEmployeeInfo = (id, update) => {
  return async (dispatch) => {
    !update && dispatch({
      type: 'clear_info'
    })
    try {
      const { data: { data } } = await api.get(`/auth/employee/${id}`);
      dispatch({
        type: EMPLOYEE_DATA,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: EMPLOYEE_DATA,
        payload: {},
      });
    }
  }
};

export const createEmployeeInfo = ({id, data, handleClick}) => {
  return async (dispatch) => {
    try {
      loading('Creating Your Info...')
      const { data: { message, success } } = await api.post(`/info`, data);
      if(success) {
        dispatch(getEmployeeInfo(id, true));
        swal.fire({
          text: message,
          icon: 'success'
        });
        !!handleClick && handleClick();
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
        dispatch(getEmployeeInfo(id, true));
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