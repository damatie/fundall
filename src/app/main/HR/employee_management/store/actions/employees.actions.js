import axios from 'axios';

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

	return dispatch =>
			dispatch({
				type: GET_EMPLOYEES,
				payload: employees
			})
}

export function setEmployeesSearchText(event) {
	return {
		type: SET_EMPLOYEES_SEARCH_TEXT,
		searchText: event.target.value
	};
}