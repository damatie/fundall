import api from "app/services/api";
import swal from 'sweetalert2';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';

export const OPEN_ADD_NEW_EMPLOYEE_MODAL = 'OPEN ADD NEW EMPLOYEE MODAL';
export const CLOSE_ADD_NEW_EMPLOYEE_MODAL = 'CLOSE ADD NEW EMPLOYEE MODAL';
export const GET_EMPLOYEES = 'GET EMPLOYEES';
export const GET_ENITIES = 'GET ENTITIES';
export const GET_DEPARTMENTS = 'GET DEPARTMENTS';
export const GET_ROLES = 'GET ROLES';
export const EMPLOYEE_GRADES = 'EMPLOYEE GRADES';

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/auth/employee/');
      if(success) {
        dispatch({
          type: GET_EMPLOYEES,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_EMPLOYEES,
        payload: []
      })
    }
  };
};

export const getEntities = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/entity/all');
      if(success) {
        dispatch({
          type: GET_ENITIES,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ENITIES,
        payload: []
      })
    }
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/roles');
      if(success) {
        dispatch({
          type: GET_ROLES,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ROLES,
        payload: []
      })
    }
  };
};

export const getDept = (id) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get(`/department/all/${id}`);
      if(success) {
        dispatch({
          type: GET_DEPARTMENTS,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_DEPARTMENTS,
        payload: []
      })
    }
  };
};

export const getGrades = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/employee-grade');
      if(success) {
        dispatch({
          type: EMPLOYEE_GRADES,
          payload: data.rows || []
        })
      }
    } catch (e) {
      dispatch({
        type: EMPLOYEE_GRADES,
        payload: []
      })
    }
  };
};

export const addEmployee = (data) => {
  return async (dispatch) => {
    try {
      loading('Adding Employee...');
      const { data: { success, message } } = await api.post('/auth/employee/add-employee', data);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success'
        });
        dispatch(getEmployees());
        return;
      }
      swal.fire({
        text: message,
        icon: 'error'
      });
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  }
};

export const filterEmployees = (term) => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/auth/employee/');
      if(success) {
        dispatch({
          type: GET_EMPLOYEES,
          payload: data || []
        })
      }
    } catch (e) {
      dispatch({
        type: GET_EMPLOYEES,
        payload: []
      })
    }
  };
};

export const deleteEmployee = (id) => {
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
          loading('Deleting Employee...');
          const { data: { message } } = await api.delete(`/auth/employee/`, {
            data: {
              id
            }
          });
          swal.fire({
            text: message,
            icon: 'success',
          });
          dispatch(getEmployees());
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