import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_EMERGENCY_CONTACTS = 'GET EMERGENCY CONTACTS';

export const getEmergencyContact = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/emergency_contact/');
      dispatch({
        type: GET_EMERGENCY_CONTACTS,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_EMERGENCY_CONTACTS,
        payload: []
      });
    }
  }
};

export const addEmergencyContact = (value) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/emergency_contact/', value);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getEmergencyContact());
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

export const updateEmergencyContact = ({id, data}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/emergency_contact/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getEmergencyContact());
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteEmergencyContact = (id) => {
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
          const { data: { message } } = await api.delete(`/emergency_contact/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getEmergencyContact());
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