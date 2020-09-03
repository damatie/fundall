import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import swal from 'sweetalert2';

export const GET_ALL_OPEN_POSITIONS_LOADING = 'GET ALL OPEN POSITIONS LOADING';
export const GET_ALL_OPEN_POSITIONS_SUCCESS = 'GET ALL OPEN POSITIONS SUCCESS';
export const GET_ALL_OPEN_POSITIONS_ERROR = 'GET ALL OPEN POSITIONS ERROR';

export const CREATE_OPENING_LOADING = 'CREATE OPENING LOADING';
export const CREATE_OPENING_SUCCESS = 'CREATE OPENING SUCCESS';
export const CREATE_OPENING_ERROR = 'CREATE OPENING ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllOpenPositions() {
	return dispatch => {
		dispatch({
			type: GET_ALL_OPEN_POSITIONS_LOADING
		});
		fetch(`${basUrl()}/recruitment/all`, {...headers.getRegHeader()})
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success) {
					dispatch({
            type: GET_ALL_OPEN_POSITIONS_SUCCESS,
            payload: data.data
          })
				} else {
					dispatch({
						type: GET_ALL_OPEN_POSITIONS_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_ALL_OPEN_POSITIONS_ERROR,
					payload: [],
				})
			})
	}
}

export function createOpening(model) {
	return dispatch => {
		dispatch({
			type: CREATE_OPENING_LOADING
		});
		fetch(`${basUrl()}/recruitment/new`, {...headers.reqHeader('post', model)})
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success) {
					dispatch({
						type: CREATE_OPENING_SUCCESS,
          })
          // .then(() => {
          //   dispatch(getAllOpenPositions())
          // });
          swal.fire({
            title: data.message,
            timer: 3000,
            icon: 'success'
          })
          .then(function(){
            window.location.href = "/recruitment";
          });
				} else {
          swal.fire({
            title: data.message,
            timer: 3000,
            icon: 'error'
          })
					dispatch({
						type: CREATE_OPENING_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: CREATE_OPENING_ERROR,
					payload: [],
        })
        swal.fire({
          title: err.message,
          text: 'Oops! Something went wrong. Check your network',
          timer: 3000,
          icon: 'error'
        })
			})
	}
}
