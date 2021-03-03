import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_TRAVEL_VACATION = 'GET TRAVEL AND VACATION';

export const getTravelAndVacation = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get(`/travel/vacation/${id}`);
      dispatch({
        type: GET_TRAVEL_VACATION,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_TRAVEL_VACATION,
        payload: []
      });
    }
  }
};

export const addTravelAndVacation = ({formData, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/travel/vacation', formData);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getTravelAndVacation(employeeId));
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

export const updateTravelAndVacation = ({id, data, employeeId}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/travel/vacation/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getTravelAndVacation(employeeId));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteTravelAndVacation = ({id, employeeId}) => {
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
          const { data: { message } } = await api.delete(`/travel/vacation/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getTravelAndVacation(employeeId));
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