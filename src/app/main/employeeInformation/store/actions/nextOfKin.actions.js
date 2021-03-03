import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_NEXT_OF_KIN = 'GET NEXT OF KIN';

export const getNextOfKin = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/nok/${id}`);
      dispatch({
        type: GET_NEXT_OF_KIN,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_NEXT_OF_KIN,
        payload: []
      });
    }
  }
};

export const addNextOfKin = ({formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/nok/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getNextOfKin(employeeId));
      dispatch({
        type: CLOSE_SHARED_MODAL
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const updateNextOfKin = ({id, data, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/nok/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getNextOfKin(employeeId));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteNextOfKin = ({id, employeeId}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        if (result.isConfirmed) {
          loading('Deleting...');
          const { data: { message } } = await api.delete(`/nok/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getNextOfKin(employeeId));
        }
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
      });
    }
  }
};