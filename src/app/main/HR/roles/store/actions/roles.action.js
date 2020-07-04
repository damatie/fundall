import { useAuth } from "app/hooks/useAuth";
import Swal from 'sweetalert2'


export const GET_ROLES = 'GET ROLES';
export const LOADING_ROLES = 'LOADING ROLES';
export const SET_ROLES_SEARCH_TEXT = 'SET ROLES SEARCH TEXT';
export const SET_ROLES_SUCCESS = 'SET ROLES SUCCESS';
export const RESET_ROLES = 'REST ROLES';
export const DELETING_ROLES = 'DELETING_ROLES';
const auth = useAuth

export const getRoles = () => {
  
  return dispatch => {
    dispatch({
      type: LOADING_ROLES
    })

    fetch(`https://hris-cbit.herokuapp.com/api/v1/roles/`, {
      headers: {
        Authorization: `JWT ${auth().getToken}`
      }
    }).then(res => res.json()).then(data => {
      if(data.success) {
        dispatch({
          type: GET_ROLES,
          payload: data.data
        })
      }
    }).catch(e => console.error(e))
  }
};

const Fetch = id => {
  fetch(`https://hris-cbit.herokuapp.com/api/v1/roles/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `JWT ${auth().getToken}`
    }
  }).then(res => res.json()).then(data => {
    return data
  })
};

export const deleteRoles = data => {
  return dispatch => {
    dispatch({
      type: DELETING_ROLES
    });
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        for(const i of data) {
          Fetch(i);
        }
      }
      
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    dispatch({
      type: SET_ROLES_SUCCESS
    })
    setTimeout(() => {
      dispatch({
        type: RESET_ROLES
      })
    }, 3000)
  }
}


export function setRolesSearchText(event) {
	return {
		type: SET_ROLES_SEARCH_TEXT,
		searchText: event.target.value
	};
};