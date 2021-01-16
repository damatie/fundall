import swal from 'sweetalert2';
import api from 'app/services/api';
import catchErrorMsg from 'utils/catchErrorMsg';


export const GET_LEAVE_TYPE = 'GET_LEAVE_TYPE';
export const SAVE_LEAVE_TYPE = 'SAVE_LEAVE_TYPE';
export const LEAVE_TYPE_LOADING = 'LEAVE_TYPE_LOADING';
export const LEAVE_TYPE_ERROR = 'LEAVE_TYPE_ERROR';
export const GET_ONE_LEAVE_TYPE = 'GET ONE LEAVE TYPE';

export function saveLeaveTypes(data, push) {
  return async () => {
    try {
      swal.fire({
        text: 'Creating...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message } } = await api.post(`/leave-type/`, data);
      swal.fire({
        text: message,
        icon: 'success'
      });
      push('/hr/leave_type');
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export function updateLeaveTypes({id, model, push}) {
  return async () => {
    try {
      swal.fire({
        text: 'Updating...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message } } = await api.patch(`/leave-type/${id}`, model);
      swal.fire({
        text: message,
        icon: 'success'
      });
      push('/hr/leave_type');
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};

export const getOneLeaveType = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/leave-type/${id}`);
      dispatch({
        type: GET_ONE_LEAVE_TYPE,
        payload: data
      })
    } catch (e) {
      dispatch({
        type: GET_ONE_LEAVE_TYPE,
        payload: []
      })
    }
  }
}