import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_MALARONE = 'GET MALARONE';

export const getMalarone = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/malarone/${id}`);
      dispatch({
        type: GET_MALARONE,
        payload: data || {}
      });
    } catch (e) {
      dispatch({
        type: GET_MALARONE,
        payload: {}
      });
    }
  }
};

export const createMalarone = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/malarone', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getMalarone(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateMalarone = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/malarone', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getMalarone(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}