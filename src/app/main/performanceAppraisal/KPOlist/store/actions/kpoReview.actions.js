import api from "app/services/api";
import catchErrorMsg from 'utils/catchErrorMsg';
import loading from 'utils/loading';
import swal from 'sweetalert2';

export const GET_KPO_BY_DEPT = 'GET KPO BY DEPT';
export const GET_ASSIGNED_KPO = 'GET ASSIGNED KPO';
export const GET_ENTITIES = 'GET ENTITIES';
export const GET_ALL_ENITIES = 'GET ALL ENITIES';
export const GET_KPO_BY_ROLE = 'GET KPO BY ROLE';
export const OPEN_REQUEST_KPO_MODAL = 'OPEN REQUEST KPO MODAL';
export const CLOSE_REQUEST_KPO_MODAL = 'CLOSE REQUEST KPO MODAL';
export const GET_ONE_KPO_REQUEST  = 'GET ONE KPO REQUEST';

const getApprovedKpo = (data) => {
  return data.filter((item) => item.status !== 'requested' && item.status !== 'rejected');
};

export const getKpoByDept = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data: { rows }, success }} = await api.get(`/appraisal/kpo/dept/${id}`);
      if(success) {
        dispatch({
          type: GET_KPO_BY_DEPT,
          payload: getApprovedKpo(rows)
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
          payload: getApprovedKpo(rows),
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
        payload: getApprovedKpo(rows)
      });
    } catch (e) {
      dispatch({
        type: GET_KPO_BY_DEPT,
        payload: [],
      })
    }
  }
};

export const getAllEntities = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/entity');
      if(success) {
        dispatch({
          type: GET_ALL_ENITIES,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ALL_ENITIES,
        payload: []
      })
    }
  };
};

export const getEntities = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/entity/');
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

export const getKpoByStatus = ({status, requested}) => {
  return async (dispatch) => {
    try {
      const { data: { data: { rows } } } = await api.get(`/appraisal/kpo/?status=${status}`);
      if(requested) {
        dispatch({
          type: GET_KPO_BY_ROLE,
          payload: rows
        });
      }
    } catch {
      dispatch({
        type: GET_KPO_BY_ROLE,
        payload: []
      });
    }
  }
};

export const kpoReq = ({id, type}) => {
  return async (dispatch) => {
    try {
      loading(type === 'approve' ? 'Approving...' : 'Rejection...');
      const { data: { message } } = await api.patch(`/appraisal/kpo/create/request/${type}/${id}`);
      swal.fire({
        text: message,
        icon: 'success',
      });
      dispatch(getKpoByStatus({
        status: 'requested',
        requested: true
      }));
      dispatch({
        type: CLOSE_REQUEST_KPO_MODAL
      })
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
      });
    }
  }
}
