import swal from 'sweetalert2';

export const OPEN_EMPLPYEE_GRADE_MODAL = 'OPEN EMPLOYEE GRADE MODAL';
export const CLOSE_EMPLOYEE_GRADE_MODAL = 'CLOSE EMPLOYEE GRADE MODAL';
export const GET_ALL_EMPLOYEE_GRADE = 'GET ALL EMPLOYEE GRADE';
export const GET_ONE_EMPLOYEE_GRADE = 'GET ONE EMPLOYEE GRADE';

export const getAllEmployeeGrade = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: GET_ALL_EMPLOYEE_GRADE,
        payload: [{
          name: 'GL8',
          description: 'lorem lorem lorem lorem',
          pip: true,
          id: 1
        },{
          name: 'GL9',
          description: 'lorem lorem lorem lorem',
          pip: false,
          id: 2
        }]
      })
    }, 1500)
  }
};

export const createEmployeeGrade = (model) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Created',
        icon: 'success'
      })
    }, 1500)
  };
};

export const updateEmployeeGrade = ({id, model}) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Updated',
        icon: 'success'
      })
    }, 1500)
  };
};

export const deleteEmployeeGrade = (id) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Deleted',
        icon: 'success'
      })
    }, 1500)
  };
};
