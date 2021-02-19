import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';
import loading from 'utils/loading';
import confirm from 'utils/confirm';
import api from 'app/services/api';

export const GET_COMPENSATION_COLUMNS = 'GET COMPENSATION COLUMNS';
export const OPEN_COMPENSATION_COLUMNS_MODAL = 'OPEN COMPENSATION COLUMNS MODAL';
export const CLOSE_COMPENSATION_COLUMNS_MODAL = 'CLOSE COMPENSATION COLUMNS MODAL';
export const GET_ONE_COMPENSATION_COLUMN = 'GET ONE COMPENSATION COLUMN'

export const getCompensationColumns = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/compensation/');
      dispatch({
        type: GET_COMPENSATION_COLUMNS,
        payload: data || [],
      });
    } catch (e) {
      dispatch({
        type: GET_COMPENSATION_COLUMNS,
        payload: [],
      });
    }
  }
};

export const addCompensationColumn = (value) => {
  return async(dispatch) => {
    try {
      loading('Adding Compensation Column');
      const { data: { message } }  = await api.post('/compensation/', value);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getCompensationColumns());
      dispatch({
        type: CLOSE_COMPENSATION_COLUMNS_MODAL,
      })
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const updateCompensationColumn = ({id,value}) => {
  return async(dispatch) => {
    try {
      loading('Updating Compensation Column');
      const { data: { message } }  = await api.patch(`/compensation/${id}`, value);
      swal.fire({
        text: message,
        icon: 'success',
        timer: 1500
      });
      dispatch(getCompensationColumns());
      dispatch({
        type: CLOSE_COMPENSATION_COLUMNS_MODAL,
      })
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
        timer: 1500
      });
    }
  }
};

export const deleteCompensationColumn = (id) => {
  return (dispatch) => {
    confirm( async () => {
      try {
        loading('Deleting Compensation Column');
        const { data: { message } }  = await api.delete(`/compensation/${id}`);
        swal.fire({
          text: message,
          icon: 'success',
          timer: 1500
        });
        dispatch(getCompensationColumns());
      } catch (e) {
        swal.fire({
          text: catchErrorMsg(e),
          icon: 'error',
          timer: 1500
        });
      }
    })
    
  }
};