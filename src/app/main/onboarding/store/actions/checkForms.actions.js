import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const signOnboardingForm = (formData) => {
  return async (dispatch) => {
    try {
      loading('signing form...');
      const { data: { message } } = await api.patch('/onboarding/sign-form', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
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
};