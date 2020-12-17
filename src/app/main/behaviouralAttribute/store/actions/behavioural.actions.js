import swal from 'sweetalert2';

export const OPEN_BEHAVIOURAL_MODAL = 'OPEN BEHAVIOURAL MODAL';
export const CLOSE_BEHAVIOURAL_MODAL = 'CLOSE BEHAVIOURAL MODAL';
export const GET_ALL_BEHAVIOURAL_ATTRIBUTE = 'GET ALL BEHAVIOURAL ATTRIBUTE';
export const GET_ONE_BEHAVIOURAL_ATTRIBUTE = 'GET ONE BEHAVIOURAL ATTRIBUTE';

export const getAllBehaviouralAttribute = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
        payload: [
          {
            name: 'Commitment and Leadership',
            description: 'lorem lorem lorem lorem',
            updatedAt: new Date(),
            id: 1
          },
          {
            name: 'Integrity',
            description: 'lorem lorem lorem lorem',
            updatedAt: new Date(),
            id: 1
          }
        ]
      })
    }, 1500);
  }
};

export const createBehaviouralAttribute = (model) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Created',
        icon: 'success'
      })
    }, 1500)
  }
};

export const updateBehaviouralAttribute = ({id, model}) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Update',
        icon: 'success'
      })
    }, 1500)
  }
};

export const deleteBehaviouralAttribute = (id) => {
  return (dispatch) => {
    swal.showLoading();
    setTimeout(() => {
      swal.fire({
        text: 'Deleted',
        icon: 'success'
      })
    }, 1500)
  }
}