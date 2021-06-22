import api from "app/services/api";
import swal from 'sweetalert2';

export const GET_ALL_ROLES = 'GET ALL ROLES';
export const GET_ALL_MENUS = 'GET ALL MENU';
export const GET_ALL_PERMISSION_FOR_A_ROLE = 'GET ALL PERMISSION FOR A ROLE';
export const SUBMITTING_ROLE_PERMISSIONS = 'SUBMITTING ROLE PERMISSIONS';
export const ROLE_PERMISSIONS_SUBMITTED = 'ROLE PERMISSIONS SUBMITTED';
export const ROLE_ID = 'ROLE ID';

export const getAllRoles = () => {
  return async (dispatch) => {
    try {
      const { data: { success, data }} = await api.get('roles');
      if(success) {
        dispatch({
          type: GET_ALL_ROLES,
          payload: data || []
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

export const getAllMenus = () => {
  return async (dispatch) =>{
    try{
        const {data: { success, data }} = await api.get('menu/all');
        if(success){
          dispatch({
            type: GET_ALL_MENUS,
            payload: data || []
          })
        }else{
          dispatch({
            type: GET_ALL_MENUS,
            payload: []
          })
        }
    }catch(e) {
      dispatch({
        type: GET_ALL_MENUS,
        payload: []
      })
    }
  }
}

export const assignPermission = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: SUBMITTING_ROLE_PERMISSIONS
    });
    try {
      swal.fire({
        title: 'Granting Permission ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const { data: { message, success } } = await api.post('menu/permission', payload);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        }).then(function() {
          Promise.all([
            dispatch({
              type: ROLE_PERMISSIONS_SUBMITTED
            })
          ]).then(() => {
            dispatch(getAllMenus());
          })
        });
      }
    } catch (e) {
      swal.fire({
        text: e?.response?.data.message || e?.response?.data.error || 'Service unavailable',
        icon: 'error',
      });
    }
  };
};
