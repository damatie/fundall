import { fetchHeaders } from 'app/shared/fetchHeaders';

export const SEARCH_POST_ERROR = 'SEARCH_POST_ERROR';
export const SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS';
export const SEARCH_POST_LOADING = 'SEARCH_POST_LOADING';

const header = fetchHeaders();

export function submitSearch(term) {
	return dispatch => {
		dispatch({
			type: SEARCH_POST_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/posts/all/search?term=${term}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.success === true) {
          console.log(post)
					return dispatch({
            type: SEARCH_POST_SUCCESS,
            payload: post.data
					});
				} else {
					console.log(post);
					return dispatch({
						type: SEARCH_POST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			console.log(error);
			return dispatch({
				type: SEARCH_POST_ERROR,
				payload: error
			});
		});
	}
}
