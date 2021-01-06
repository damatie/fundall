import api from "app/services/api";
import swal from 'sweetalert2';

export const GET_ALL_ROLES = 'GET ALL ROLES';
export const GET_ALL_PERMISSION_FOR_A_ROLE = 'GET ALL PERMISSION FOR A ROLE';
export const SUBMITTING_ROLE_PERMISSIONS = 'SUBMITTING ROLE PERMISSIONS';
export const ROLE_PERMISSIONS_SUBMITTED = 'ROLE PERMISSIONS SUBMITTED';
export const ROLE_ID = 'ROLE ID';

export const getAllRoles = (saveId) => {
  return async (dispatch) => {
    try {
      const { data: { success, data }} = await api.get('roles');
      if(success) {
        dispatch({
          type: GET_ALL_ROLES,
          payload: data || [],
          id: saveId ? data[0]['id'] : '',
        });
      }
    } catch (e) {
      dispatch({
        type: GET_ALL_ROLES,
        payload: []
      });
    }
  };
};

export const getAllRolePermissions = (id) => {
  return async (dispatch) => {
    try {
      const { data: { success, data }} = await api.get(`permissions/${id}`);
      // if(success) {
        dispatch({
          type: GET_ALL_PERMISSION_FOR_A_ROLE,
          payload: data || {}
        });
      // }
    } catch (e) {
      dispatch({
        type: GET_ALL_PERMISSION_FOR_A_ROLE,
        payload: {}
      });
    }
  };
};

export const submitRolePermission = ({id, payload}) => {
  return async (dispatch) => {
    dispatch({
      type: SUBMITTING_ROLE_PERMISSIONS
    });
    try {
      const { data: { message, success } } = await api.post('permissions/', payload);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        });
        dispatch({
          type: ROLE_PERMISSIONS_SUBMITTED
        });
        // dispatch(getAllRolePermissions(id));
      }
    } catch (e) {
      swal.fire({
        text: e?.response?.data.message || e?.response?.data.error || 'Service unavailable',
        icon: 'error',
      });
    }
  };
};

export const updateRolePermission = ({id, payload}) => {
  return async (dispatch) => {
    dispatch({
      type: SUBMITTING_ROLE_PERMISSIONS
    });
    try {
      const { data: { message, success } } = await api.patch(`permissions/${id}`, payload);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        });
        dispatch({
          type: ROLE_PERMISSIONS_SUBMITTED
        });
        dispatch(getAllRolePermissions(payload.roleId));
      }
    } catch (e) {
      swal.fire({
        text: e?.response?.data.message || e?.response?.data.error || 'Service unavailable',
        icon: 'error',
      });
    }
  };
};