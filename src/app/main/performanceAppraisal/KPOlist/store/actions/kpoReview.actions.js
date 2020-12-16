import api from "app/services/api";

export const GET_KPO_BY_DEPT = 'GET KPO BY DEPT';
export const GET_ASSIGNED_KPO = 'GET ASSIGNED KPO';

export const getKpoByDept = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data, success }} = await api.get(`/appraisal/kpo/dept/${id}`);
      if(success) {
        dispatch({
          type: GET_KPO_BY_DEPT,
          payload: data
        })
      }
    } catch (e) {
      dispatch({
        type: GET_KPO_BY_DEPT,
        payload: []
      })
    }
  };
};

export const getAssignedKpo = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get(`/${id}`);
      if(success) {
        dispatch({
          type: GET_ASSIGNED_KPO,
          payload: data,
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ASSIGNED_KPO,
        payload: [],
      })
    }
  }
};
