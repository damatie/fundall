import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_TRAINING_EXPERTISE = 'GET TRAINING AND EXPERTISE';

export const getTrainingAndExpertise = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/training/expertise/${id}`);
      dispatch({
        type: GET_TRAINING_EXPERTISE,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_TRAINING_EXPERTISE,
        payload: []
      });
    }
  }
};

export const addTrainingAndExpertise = ({formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/training/expertise/', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getTrainingAndExpertise(employeeId));
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

export const updateTrainingAndExpertise = ({id, data, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/training/expertise/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getTrainingAndExpertise(employeeId));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteTrainingAndExpertise = ({id, employeeId}) => {
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
          const { data: { message } } = await api.delete(`/training/expertise/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getTrainingAndExpertise(employeeId));
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