import { fetchHeaders } from "app/shared/fetchHeaders";

export const LOADING_SALARY_ADVANCE = 'LOADING SALARY ADVANCE';
export const GET_SALARY_ADVANCE = 'GET SALARY ADVANCE';
export const SALARY_ADVANCE_ERROR = 'SALARY ADVANCE ERROR';

const headers = fetchHeaders();
export const getSalaryAdvance = () => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_ADVANCE
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/salary-advance/all/log`, {
      ...headers.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_SALARY_ADVANCE,
            payload: data.salaryAdvanceData
          })
        } else {
          dispatch({
            type: SALARY_ADVANCE_ERROR
          })
        }
      }
    ).catch(e => console.error(e));
  }
}