import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_MALARIA_PPA = 'GET MALARIA PPA';

export const getMalariaPPA = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/malariaPPA/${id}`);
      dispatch({
        type: GET_MALARIA_PPA,
        payload: data || {}
      });
    } catch(e) {
      dispatch({
        type: GET_MALARIA_PPA,
        payload: {}
      });
    }
  }
}

export const createMalariaPPA = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/malariaPPA', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getMalariaPPA(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateMalariaPPA = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/malariaPPA', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getMalariaPPA(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}
