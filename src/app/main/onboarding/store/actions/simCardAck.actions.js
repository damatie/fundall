import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_SIM_CARD_ACK = 'GET SIM CARD ACK';

export const getSimCardAck = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/simcard/${id}`);
      dispatch({
        type: GET_SIM_CARD_ACK,
        payload: data || {},
      });
    } catch (e) {
      dispatch({
        type: GET_SIM_CARD_ACK,
        payload: {},
      })
    }
  }
}

export const createSimCardAck = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/simcard/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getSimCardAck(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateSimCardAck = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/simcard/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getSimCardAck(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}