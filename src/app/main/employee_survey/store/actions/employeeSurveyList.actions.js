import api from "app/services/api";
import swal from "sweetalert2";
import catchErrorMsg from "utils/catchErrorMsg";
import loading from "utils/loading";

export const  OPEN_EMPLOYEE_SURVEY_FORM_MODAL = 'OPEN EMPLOYEE SURVEY FORM MODAL';
export const CLOSE_EMPLOYEE_SURVEY_FORM_MODAL = 'CLOSE EMPLOYEE SURVEY FORM MODAL';
export const GET_ALL_EMPLOYEE_SURVEY_LIST_ITEM = 'GET ALL EMPLOYEE SURVEY LIST ITEM';
export const GET_ONE_EMPLOYEE_SURVEY_LIST_ITEM = 'GET ONE EMPLOYEE SURVEY LIST ITEM';




export const getAllEmployeeSurveyListItem = (userId) => {
  return async (dispatch) => {
    try {
    //   const { data: { data, success }} = await api.get(`/appraisal/kpo/employee/${userId}`);
      if(success) {
        dispatch({
          type: GET_ALL_EMPLOYEE_SURVEY_LIST_ITEM,
          payload:[]
        //   payload: getApprovedKpo(data.rows)
        });
      }
    } catch(e) {
      dispatch({
        type: GET_ALL_EMPLOYEE_SURVEY_LIST_ITEM,
        payload: []
      });
    }
    
  };
};

export const getOneEmployeeSurveyListItem = (id) => {
  return async (dispatch) => {
    try {
    //   const { data: { data, success } } = await api.get(`/appraisal/kpo/${id}`);
      if(success) {
        dispatch({
          type: GET_ONE_EMPLOYEE_SURVEY_LIST_ITEM,
          payload: data
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ONE_EMPLOYEE_SURVEY_LIST_ITEM,
        payload: []
      })
    }
  };
};

export const deleteEmployeeSurveyListItem = ({id, userId}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Deleting...',
        allowOutsideClick: false
      })
      swal.showLoading();
    //   const { data: { success, message } } = await api.delete(`/appraisal/kpo/${id}`);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllEmployeeSurveyListItem(userId));
      }
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      })
    }
  };
};

export const updateEmployeeSurveyListItem = ({id, userId, model}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Updating...',
        allowOutsideClick: false
      })
      swal.showLoading();
    //   const { data: { success, message } } = await api.patch(`/appraisal/kpo/${id}`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllEmployeeSurveyListItem(userId));
        return;
      }
      swal.fire({
        text: message,
        icon: 'warning'
      });
    } catch (e) {
      swal.fire({
        text: e.response?.data.message || e.response?.data.error || 'Service Unavailable',
        icon: 'error'
      })
    }
  }
};

export const createEmployeeSurveyListItem = ({userId, item}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Creating...',
        allowOutsideClick: false
      })
      swal.showLoading();
    //   const { data: { success, message } } = await api.post('/appraisal/kpo/', item);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getAllEmployeeSurveyListItem(userId));
        dispatch({
          type: CLOSE_EMPLOYEE_SURVEY_FORM_MODAL
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

export const submitEmployeeSurveyListItem = (id) => {
  return async (dispatch) => {
    try {
      loading('Submitting...');
    //   const { data: { message }} = await api.patch(`/appraisal/kpo/employee/submit/${id}`);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(getOneEmployeeSurveyListItem(id));
    } catch(e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  }
};



