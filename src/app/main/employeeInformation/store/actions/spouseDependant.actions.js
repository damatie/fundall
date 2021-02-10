import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import api from 'app/services/api';
import { CLOSE_SHARED_MODAL } from './employeeInfo.actions';

export const GET_SPOUSE_DEPENDANTS = 'GET SPOUSE AND DEPENDANTS';

export const getSpouseDependant = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/dependant/');
      dispatch({
        type: GET_SPOUSE_DEPENDANTS,
        payload: data || []
      });
    } catch (e) {
      dispatch({
        type: GET_SPOUSE_DEPENDANTS,
        payload: []
      });
    }
  }
};

export const addSpouseDependant = (value) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: { data, message } } = await api.post('/dependant/', value);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getSpouseDependant());
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

export const updateSpouseDependant = ({id, data}) => {
  return async (dispatch) => {
    try {
      loading('Updating...');
      const { data: { message } } = await api.patch(`/dependant/${id}`, data);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getSpouseDependant());
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteSpouseDependant = (id) => {
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
          const { data: { message } } = await api.delete(`/dependant/${id}`);
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getSpouseDependant());
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