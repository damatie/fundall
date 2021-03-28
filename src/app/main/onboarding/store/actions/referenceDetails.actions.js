import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_REFERENCE_DETAILS = 'GET REFERENCE DETAILS';
export const OPEN_MODAL = '[REFERENCE DETAILS] OPEN MODAL';
export const CLOSE_MODAL = '[REFERENCE DETAILS] CLOSE MODAL';
export const GET_DETAILS = '[REFERENCE DETAILS] GET DETAILS';

export const createReferenceDetails = ({formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/reference/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getReferenceDetails(employeeId));
      dispatch({
        type: CLOSE_MODAL,
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateReferenceDetails = ({formData, id, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch(`/reference/${id}`, formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getReferenceDetails(employeeId));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const getReferenceDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/reference/${id}`);
      dispatch({
        type: GET_REFERENCE_DETAILS,
        payload: [],
      });
    } catch (e) {
      dispatch({
        type: GET_REFERENCE_DETAILS,
        payload: [],
      });
    }
  }
};