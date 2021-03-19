import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_ID_CARD_ISSUANCE = 'GET ID CARD ISSUANCE';

export const getIdCardIssuance = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/idcard/${id}`);
      dispatch({
        type: GET_ID_CARD_ISSUANCE,
        payload: data,
      });
    } catch(e) {
      dispatch({
        type: GET_ID_CARD_ISSUANCE,
        payload: {}
      })
    }
  }
}

export const createIdCardIssuance = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/idcard', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getIdCardIssuance(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateIdCardIssuance = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/idcard', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getIdCardIssuance(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}