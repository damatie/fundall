import { useAuth } from "app/hooks/useAuth";
import Swal from 'sweetalert2'


export const GET_RESOURCES = 'GET RESOURCES';
export const LOADING_RESOURCES = 'LOADING RESOURCES';
export const SET_RESOURCES_SEARCH_TEXT = 'SET RESOURCES SEARCH TEXT';
export const SET_RESOURCES_SUCCESS = 'SET RESOURCES SUCCESS';
export const RESET_RESOURCES = 'REST RESOURCES';
export const DELETING_RESOURCES = 'DELETING_RESOURCES';
const auth = useAuth

export const getResources = () => {
  
  return dispatch => {
    dispatch({
      type: LOADING_RESOURCES
    })

    fetch(`https://hris-cbit.herokuapp.com/api/v1/resources/`, {
      headers: {
        Authorization: `JWT ${auth().getToken}`
      }
    }).then(res => res.json()).then(data => {
      if(data.success) {
        dispatch({
          type: GET_RESOURCES,
          payload: data.data
        })
      }
    }).catch(e => console.error(e))
  }
};


export const deleteResources = id => {
  return dispatch => {
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
        fetch(`https://hris-cbit.herokuapp.com/api/v1/resources/${id}`, {
          method: 'delete',
          headers: {
            Authorization: `JWT ${auth().getToken}`
          }
        }).then(res => res.json()).then(data => {
          if(data.success) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            dispatch({
              type: DELETING_RESOURCES
            })
          } else {
            Swal.fire(
              'Deleted!',
              'Something went wrong.',
              'error'
            )
          }
        })
      }
      
    })
  }
};



export function setResourcesSearchText(event) {
	return {
		type: SET_RESOURCES_SEARCH_TEXT,
		searchText: event.target.value
	};
};