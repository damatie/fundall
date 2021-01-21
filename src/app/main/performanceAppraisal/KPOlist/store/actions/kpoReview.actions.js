import api from "app/services/api";

export const GET_KPO_BY_DEPT = 'GET KPO BY DEPT';
export const GET_ASSIGNED_KPO = 'GET ASSIGNED KPO';
export const GET_ENTITIES = 'GET ENTITIES';

export const getKpoByDept = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data: { rows }, success }} = await api.get(`/appraisal/kpo/dept/${id}`);
      if(success) {
        dispatch({
          type: GET_KPO_BY_DEPT,
          payload: rows
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

export const getAssignedKpo = () => {
  return async (dispatch) => {
    try {
      const { data: { data: { rows }, success } } = await api.get(`/appraisal/kpo/get-review/`);
      if(success) {
        dispatch({
          type: GET_ASSIGNED_KPO,
          payload: rows,
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

export const getKpoByEntity = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data: { rows } }} = await api.get(`/appraisal/kpo/entity/${id}`);
      dispatch({
        type: GET_KPO_BY_DEPT,
        payload: rows
      });
    } catch (e) {
      dispatch({
        type: GET_KPO_BY_DEPT,
        payload: [],
      })
    }
  }
};

export const getEntities = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/entity/all');
      dispatch({
        type: GET_ENTITIES,
        payload: data
      });
      dispatch(getKpoByEntity(id));
    } catch(e) {
      dispatch({
        type: GET_ENTITIES,
        payload: []
      });
    }
  };
};
