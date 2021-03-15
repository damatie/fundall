import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const createIdCardIssuance = (formData) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/idcard', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getOwnOnboardingForms());
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateIdCardIssuance = (formData) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/idcard', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getOwnOnboardingForms());
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}