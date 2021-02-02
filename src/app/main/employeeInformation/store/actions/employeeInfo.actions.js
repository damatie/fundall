import api from 'app/services/api';
import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import * as Actions from 'app/store/actions';

export const createEmployeeInfo = ({id, data}) => {
  return async (dispatch) => {
    try {
      loading('Creating Your Info...')
      const { data: { message, success } } = await api.post(`/auth/employee/${id}`, data);
      if(success) {
        dispatch(Actions.getEmployeeProfile(id));
        swal.fire({
          text: message,
          icon: 'success'
        });
      }
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  }
}; 