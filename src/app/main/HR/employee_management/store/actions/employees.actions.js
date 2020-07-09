import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';

export const GET_EMPLOYEES = 'GET EMPLOYEES';
export const SET_EMPLOYEES_SEARCH_TEXT = 'SET EMPLOYEES SEARCH TEXT';
export const UPDATE_EMPLOYEES = 'UPDATE EMPLOYEE';

const auth = useAuth
export function getEmployees() {

	return dispatch => {
      
      const request = axios.get('https://hris-cbit.herokuapp.com/api/v1/auth/employee/', {
        headers: {
          Authorization: `JWT ${auth().getToken}`
        }
      });
      request.then(res => {
        dispatch({
          type: GET_EMPLOYEES,
          payload: res.data.data
        })
      })
  }
}

export const deleteEmployee = id => {
  return dispatch => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/${id}`, {
          method: 'delete',
          headers: {
            Authorization: `JWT ${auth().getToken}`
          }
        }).then(res => res.json()).then(
          data => {
            if(data.success) {
              console.log(data);
            }
          }
        ).catch(e => console.error(e))
      }
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        setTimeout(() => {
          dispatch({
            type: UPDATE_EMPLOYEES
          })
        }, 2000)
        
      }
    })
  }
  
}

export function setEmployeesSearchText(event) {
	return {
		type: SET_EMPLOYEES_SEARCH_TEXT,
		searchText: event.target.value
	};
}