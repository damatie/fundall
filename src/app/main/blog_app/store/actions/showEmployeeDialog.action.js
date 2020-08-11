import { fetchHeaders } from 'app/shared/fetchHeaders';

export const SHOW_EMPLOYEE_DIALOG_ERROR = 'SHOW_EMPLOYEE_DIALOG_ERROR';
export const SHOW_EMPLOYEE_DIALOG_SUCCESS = 'SHOW_EMPLOYEE_DIALOG_SUCCESS';
export const HIDE_EMPLOYEE_DIALOG_LOADING = 'HIDE_EMPLOYEE_DIALOG_LOADING';
export const SHOW_EMPLOYEE_DIALOG_LOADING = 'SHOW_EMPLOYEE_DIALOG_LOADING';
export const FILTER_EMPLOYEE = 'FILTER_EMPLOYEE';

const header = fetchHeaders();

export function showEmployeeDialog(value) {
	return dispatch => {
    // const name = value.substring(
    //   value.lastIndexOf("@") + 1, 
    //   value.lastIndexOf(" ")
    // );
    // console.log(name);
    // if(name.length > 0) {
    //   return dispatch({
    //     type: FILTER_EMPLOYEE,
    //     payload: name
    //   })
    // }
    const letter = value.split('')
    if (value[letter.length - 1] === '@') {
      dispatch({
        type: SHOW_EMPLOYEE_DIALOG_LOADING
      })
      fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee', {
        ...header.getRegHeader()
      }).then(res => res.json()).then(
        post => {
          if(post.success === true) {
            console.log(post)
            return dispatch({
              type: SHOW_EMPLOYEE_DIALOG_SUCCESS,
              payload: post.data
            });
          } else {
            console.log(post);
            return dispatch({
              type: SHOW_EMPLOYEE_DIALOG_ERROR,
              payload: ''
            });
          }
        }
      )
      .catch(error => {
        console.log(error);
        return dispatch({
          type: SHOW_EMPLOYEE_DIALOG_ERROR,
          payload: error
        });
      });
    } else {
      dispatch({
        type: HIDE_EMPLOYEE_DIALOG_LOADING
      })
    }
	}
}
