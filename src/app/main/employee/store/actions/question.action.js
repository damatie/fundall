import { showMessage } from 'app/store/actions/fuse';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export function getQuestions(params) {
	const request = axios.get('/api/academy-app/course', { params });

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_QUESTIONS,
				payload: response.data
			})
		);
}

export function saveCourse(data) {
	const request = axios.post('/api/academy-app/course/save', data);

	return dispatch =>
		request.then(response => {
			dispatch(showMessage({ message: 'Course Saved' }));

			return dispatch({
				type: SAVE_ANSWER,
				payload: response.data
			});
		});
}

export function updateAnswer(data) {
	return (dispatch, getState) => {
		const { id } = getState().academyApp.course;
		const request = axios.post('/api/academy-app/course/update', { id, ...data });

		request.then(response => {
			dispatch(showMessage({ message: 'Course Updated' }));

			return dispatch({
				type: UPDATE_ANSWER,
				payload: response.data
			});
		});
	};
}