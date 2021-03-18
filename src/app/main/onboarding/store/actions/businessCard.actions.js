import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_BUSINESS_CARD = 'GET BUSINESS CARD';

export const getBusinessCard = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/business-card/${id}`);
      dispatch({
        type: GET_BUSINESS_CARD,
        payload: data || {}
      });
    } catch (e) {
      dispatch({
        type: GET_BUSINESS_CARD,
        payload: {}
      });
    }
  }
}

export const requestBusinessCard = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/business-card', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getBusinessCard(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateBusinessCard = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/business-card', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getBusinessCard(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}