import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_EDUCATIONS = 'GET EDUCATIONS';

export const getEducation = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/eduQualification/');
      dispatch({
        type: GET_EDUCATIONS,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_EDUCATIONS,
        payload: []
      });
    }
  }
};

export const addEducation = (value) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/eduQualification/', value);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getEducation());
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

export const updateEducation = ({id, data}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/eduQualification/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getEducation());
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteEducation = (id) => {
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
          const { data: { message } } = await api.delete(`/eduQualification/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getEducation());
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