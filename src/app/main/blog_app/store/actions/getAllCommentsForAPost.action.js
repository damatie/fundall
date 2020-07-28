import { fetchHeaders } from 'app/shared/fetchHeaders';

export const GET_ALL_COMMENTS_FOR_A_POST_ERROR = 'GET_ALL_COMMENTS_FOR_A_POST_ERROR';
export const GET_ALL_COMMENTS_FOR_A_POST_SUCCESS = 'GET_ALL_COMMENTS_FOR_A_POST_SUCCESS';
export const GET_ALL_COMMENTS_FOR_A_POST_LOADING = 'GET_ALL_COMMENTS_FOR_A_POST_LOADING';

const header = fetchHeaders();

export function getAllCommentsForAPost(id) {
	return dispatch => {
		dispatch({
			type: GET_ALL_COMMENTS_FOR_A_POST_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/all/${id}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.success === true) {
					return dispatch({
						type: GET_ALL_COMMENTS_FOR_A_POST_SUCCESS,
						payload: post.data
					});
				} else {
					return dispatch({
						type: GET_ALL_COMMENTS_FOR_A_POST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: GET_ALL_COMMENTS_FOR_A_POST_ERROR,
				payload: error
			});
		});
	}
}