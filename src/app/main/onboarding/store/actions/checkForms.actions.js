import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_CHECK_FORMS = 'GET GET_CHECK_FORMS';

export const signOnboardingForm = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('signing form...');
      const { data: { message } } = await api.patch('/onboarding/sign-form', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getCheckForms(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500,
      });
    }
  }
};

export const getCheckForms = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/onboarding/${id}`);
      dispatch({
        type: GET_CHECK_FORMS,
        payload: data || {}
      });
    } catch (e) {
      dispatch({
        type: GET_CHECK_FORMS,
        payload: {},
      });
    }
  }
}