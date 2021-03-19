import loading from 'utils/loading';
import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import { getOwnOnboardingForms } from '.';

export const GET_REIMBURSABLE_EXPENSES = 'GET REIMBURSABLE EXPENSES';

export const getReimbursableExpenses = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/reimbursable-expenses/${id}`);
      dispatch({
        type: GET_REIMBURSABLE_EXPENSES,
        payload: data || {}
      });
    } catch (e) {
      dispatch({
        type: GET_REIMBURSABLE_EXPENSES,
        payload: {},
      });
    }
  };
};

export const createReimbursableExpenses = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.post('/reimbursable-expenses', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getReimbursableExpenses(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}

export const updateReimbursableExpenses = ({formData, id}) => {
  return async (dispatch) => {
    try {
      loading('sumbitting form...');
      const { data: { message } } = await api.patch('/reimbursable-expenses', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timner: 1500,
      });
      dispatch(getReimbursableExpenses(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500, 
      });
    }
  }
}