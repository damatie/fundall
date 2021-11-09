export const  OPEN_EMPLOYEE_SURVEY_MODAL = 'OPEN EMPLOYEE SURVEY MODAL';



export const getExample = () => {
    // console.log(open)
    return async (dispatch) => {
        try {
            dispatch({ type: OPEN_EMPLOYEE_SURVEY_MODAL })
            console.log(123)
        } catch (e) {
            console.log(123)
        }
    }
}

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
