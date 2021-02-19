import api from 'app/services/api';
import swal from 'sweetalert2';
import catchErrorMsg from 'utils/catchErrorMsg';

export const OPEN_EMPLPYEE_GRADE_MODAL = 'OPEN EMPLOYEE GRADE MODAL';
export const CLOSE_EMPLOYEE_GRADE_MODAL = 'CLOSE EMPLOYEE GRADE MODAL';
export const GET_ALL_EMPLOYEE_GRADE = 'GET ALL EMPLOYEE GRADE';
export const GET_ONE_EMPLOYEE_GRADE = 'GET ONE EMPLOYEE GRADE';
export const GET_ENTITY = 'GET ENTITY';
export const FILTER_EMPLOYEE_GRADE = 'FILTER EMPLOYEE GRADE';

export const getAllEmployeeGrade = ({offset, limit}) => {
  return async (dispatch) => {
    try {
      const { data: { data }} = await api.get(`/employee-grade?offset=${offset}&limit=${limit}`);
      dispatch({
        type: GET_ALL_EMPLOYEE_GRADE,
        payload: {
          rows: data.rows,
          pagination: {
            offset,
            limit,
            count: data.count,
          }
        }
      })
    } catch (e) {
      dispatch({
        type: GET_ALL_EMPLOYEE_GRADE,
        payload: {
          rows: [],
          pagination: {
            offset,
            limit,
            count: 0
          }
        }
      })
    }
  }
};

export const createEmployeeGrade = ({pagination, model}) => {
  return async (dispatch) => {
    swal.fire({
      text: 'Creating...',
      allowOutsideClick: false
    })
    swal.showLoading();
    try {
      const { data: { success, message } } = await api.post('/employee-grade/', model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        })
        dispatch(getAllEmployeeGrade({...pagination}));
        dispatch({
          type: CLOSE_EMPLOYEE_GRADE_MODAL
        })
      }
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  };
};

export const updateEmployeeGrade = ({id, model, pagination}) => {
  return async (dispatch) => {
    swal.fire({
      text: 'Updating...',
      allowOutsideClick: false
    })
    swal.showLoading();
    try {
      const { data: { success, message } } = await api.patch(`/employee-grade/${id}`, model);
      if(success) {
        swal.fire({
          text: message,
          icon: 'success',
        })
        dispatch(getAllEmployeeGrade({...pagination}));
        dispatch({
          type: CLOSE_EMPLOYEE_GRADE_MODAL
        })
      }
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  };
};

export const deleteEmployeeGrade = ({id, pagination}) => {
  return async (dispatch) => {
    try {
      swal.fire({
        text: 'Deleting...',
        allowOutsideClick: false
      })
      swal.showLoading();
      const { data: { message } } = await api.delete('/employee-grade/all/selected', { data: { id } } );
      swal.fire({
        text: message,
        icon: 'success',
      })
      window.location.reload();
      dispatch(getAllEmployeeGrade({...pagination}));
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
      })
    }
  };
};

export const getEntity = () => {
  return async (dispatch) => {
    try {
      const { data: { data, success } } = await api.get('/entity/all');
      if(success) {
        dispatch({
          type: GET_ENTITY,
          payload: data
        })
      }
    } catch(e) {
      dispatch({
        type: GET_ENTITY,
        payload: []
      })
    }
  }
};

export const filterEmployeeGrade = ({ term, offset, limit}) => {
  return async (dispatch) => {
    try {
      const { data: { data: { count, rows } }} = await api.get(`/employee-grade?offset=${offset}&limit=${limit}&term=${term}`);
      dispatch({
        type: FILTER_EMPLOYEE_GRADE,
        payload: {
          rows,
          term,
          pagination: {
            offset,
            limit,
            count,
          }
        }
      })
    } catch (e) {
      dispatch({
        type: FILTER_EMPLOYEE_GRADE,
        payload: {
          rows: [],
          term,
          pagination: {
            offset,
            limit,
            count: 0
          }
        }
      })
    }
  }
}