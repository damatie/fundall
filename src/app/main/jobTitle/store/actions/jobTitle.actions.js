
export const OPEN_JOB_TITLE_MODAL = 'OPEN JOB TITLE MODAL';
export const CLOSE_JOB_TITLE_MODAL = 'CLOSE JOB TITLE MODAL';
export const GET_ALL_JOB_TITLE = 'GET ALL JOB TITLE';
export const GET_ONE_JOB_TITLE = 'GET ONE JOB TITLE';

const data = [
  {
    name: 'test',
    description: 'lorem hfhrhrhyrhhr',
    id: 1,
    updateAt: new Date()
  }
];

const singledata = {
  name: 'test',
  description: 'lorem hfhrhrhyrhhr',
  id: 1,
  updateAt: new Date()
}

export const getAllJobTitle = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_JOB_TITLE,
      payload: data
    });
  }
};

export const getOneJobTitle = (data) => {
  return (dispatch) => {
    dispatch({
      tyoe: GET_ONE_JOB_TITLE,
      payload: data
    });
  }
};