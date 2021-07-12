import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';

export const ONBOARDING_FORMS = 'ONBOARDING FORMS';

export const getOwnOnboardingForms = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/onboarding/${id}`);
      dispatch({
        type: ONBOARDING_FORMS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ONBOARDING_FORMS,
        payload: [],
      });
    }
  }
};

export const submitForms = (id) => {
  return async (dispatch) => {
    try {
      loading('sumbitting forms...');
      const { data: { message } } = await api.post('/onboarding/');
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getOwnOnboardingForms(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}