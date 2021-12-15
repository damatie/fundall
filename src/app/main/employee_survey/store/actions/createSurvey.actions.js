import { useAuth } from "app/hooks/useAuth";
import axios from "axios";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export const CREATE_SURVEY_LOADING = 'CREATE_SURVEY_LOADING'
export const CREATE_SURVEY_SUCCESS = 'CREATE_SURVEY_SUCCESS'
export const CREATE_SURVEY_ERROR = 'CREATE_SURVEY_ERROR'


// const history = useHistory()
const auth = useAuth

export function createSurvey(data, x) {
	return dispatch => {
		dispatch({
			type: CREATE_SURVEY_LOADING
		});
        // console.log(data)
		axios.post('https://agile-dawn-03556.herokuapp.com/api/v1/survey/create-survey', data,{headers: { Authorization: `JWT ${auth().getToken}` }}).then((response) => {
			console.log(response)
			const { success, message, token, data } = response.data;
			if (success) {
					Swal.fire({
						title: 'Created Survey Successfully',
						text: message,
						icon: 'success',
						timer: 3000,
					})
			} else {
				// console.log("inside else")
				Swal.fire({
					title: 'Create Survey',
					text: message,
					icon: 'error',
					timer: 3000,
				})
				return dispatch({
					type: CREATE_SURVEY_ERROR,
					payload: ''
				});
			}
		}).catch(error => {
			if (error === 'Network Error') {console.log('hello')}
			Swal.fire({
				title: 'Create Survey',
				text: error.response?.data.error || error.response?.data.message,
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: CREATE_SURVEY_ERROR,
				payload: error.response?.data.error || error.response?.data.message
			});
		});
	};
}
