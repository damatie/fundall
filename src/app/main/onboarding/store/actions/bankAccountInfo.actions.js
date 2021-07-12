import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_BANK_ACCOUNT_INFO = 'GET BANK ACCOUNT INFO';

export const getBankAccountInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/bank/${id}`);
      dispatch({
        type: GET_BANK_ACCOUNT_INFO,
        payload: data || {}
      });
    } catch (e) {
      dispatch({
        type: GET_BANK_ACCOUNT_INFO,
        payload: {},
      });
    }
  };
};

export const createBankAccountInfo = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/bank/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getBankAccountInfo(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateBankAccountInfo = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/bank/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getBankAccountInfo(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}