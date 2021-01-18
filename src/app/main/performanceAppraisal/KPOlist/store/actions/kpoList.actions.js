import api from "app/services/api";
import swal from "sweetalert2";
import catchErrorMsg from "utils/catchErrorMsg";

export const  OPEN_EMPLOYEE_KPO_LIST_MODAL = 'OPEN EMPLOYEE KPO LIST MODAL';
export const CLOSE_EMPLOYEE_KPO_LIST_MODAL = 'CLOSE EMPLOYEE KPO LIST MODAL';
export const GET_ALL_KPO = 'GET ALL KPO';
export const GET_ONE_KPO = 'GET ONE KPO';
export const CLEAR_KPO_DATA = 'CLEAR KPO DATA';
export const GET_JOBTITLE = 'GET JOBTITLE';

export const getJobTitle = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success }} = await api.get('/appraisal/jobTitle/');
      dispatch({
        type: GET_JOBTITLE,
        payload: data
      })
    } catch (e) {
      dispatch({
        type: GET_JOBTITLE,
        payload: []
      })
    }
  }
}

export const getAllKpo = (userId) => {
  return async (dispatch) => {
    try {
      const { data: { data, success }} = await api.get(`/appraisal/kpo/employee/${userId}`);
      if(success) {
        dispatch({
          type: GET_ALL_KPO,
          payload: data.rows
        });
      }
    } catch(e) {
      dispatch({
        type: GET_ALL_KPO,
        payload: []
      });
    }
    
  };
};

export const getOneKpo = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get(`/appraisal/kpo/${id}`);
      if(success) {
        dispatch({
          type: GET_ONE_KPO,
          payload: data
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ONE_KPO,
        payload: []
      })
    }
  };
};

export const deleteKpo = ({id, userId}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Deleting...',
        allowOutsideClick: false
      })
      swal.showLoading();
      const { data: { success, message } } = await api.delete(`/appraisal/kpo/${id}`);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllKpo(userId));
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      })
    }
  };
};

export const updateKpo = ({id, userId, model}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Updating...',
        allowOutsideClick: false
      })
      swal.showLoading();
      const { data: { success, message } } = await api.patch(`/appraisal/kpo/${id}`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllKpo(userId));
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      })
    }
  }
};

export const createKpo = ({userId, item}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Creating...',
        allowOutsideClick: false
      })
      swal.showLoading();
      const { data: { success, message } } = await api.post('/appraisal/kpo/', item);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllKpo(userId));
        dispatch({
          type: CLOSE_EMPLOYEE_KPO_LIST_MODAL
        });
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      });
    }
  };
};

export const kpoSummary = ({id, model, type}) => {
  return async (dispatch) => {
    try {
      loading('Adding Comment...');
      const { data: { message } } = await api.patch(`/appraisal/kpo/${type}/${id}`, model);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getOneKpo(id));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      });
    }
  }
};
