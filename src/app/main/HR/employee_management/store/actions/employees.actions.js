import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';

export const GET_EMPLOYEES = 'GET EMPLOYEES';
export const SET_EMPLOYEES_SEARCH_TEXT = 'SET EMPLOYEES SEARCH TEXT';

export function getEmployees() {
  const employees = [
    {
      id: 1,
      fullName: 'john doe',
      email: 'john@test.co',
      department: 'IT',
      entity: 'cbit',
      mobile: '08026944358',
      status: true,
    },
    {
      id: 2,
      fullName: 'john doe',
      email: 'john@test.co',
      department: 'IT',
      entity: 'cbit',
      mobile: '08026944358',
      status: true,
    },
    {
      id: 3,
      fullName: 'john doe',
      email: 'john@test.co',
      department: 'IT',
      entity: 'cbit',
      mobile: '08026944358',
      status: true,
    }
  ]

	return dispatch => {
      const request = axios.get('https://hris-cbit.herokuapp.com/api/v1/auth/employee/', {
        headers: {
          Authorization: `JWT ${useAuth().getToken}`
        }
      });
      request.then(res => {
        dispatch({
          type: GET_EMPLOYEES,
          payload: res.data.data
        })
        console.log(res)
      })
  }
}

export function setEmployeesSearchText(event) {
	return {
		type: SET_EMPLOYEES_SEARCH_TEXT,
		searchText: event.target.value
	};
}