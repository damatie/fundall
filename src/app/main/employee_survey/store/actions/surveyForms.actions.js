import Api from 'app/services/api';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
export const INPUT_TYPE_SELECTED ='INPUTTYPESELECTED'
export const ADD_NEW_OPTION ='ADDNEWOPTION'
export const DEFAULTOPTIONVALUE ='Option'
export const REMOVE_OPTION ='REMOVEOPTION' 
export const UPDATE_OPTION ='UPDATEOPTION' 
export const UPDATE_BODY ='UPDATEBODY' 
export const ADD_SURVEY_QUESTION ='ADDSURVEYQUESTION'  
export const GET_SURVEY_QUESTIONS ='GETSURVEYQUESTION'
export const DELETE_SURVEY_QUESTION ='DELETESURVEYQUESTION'
export const SET_REQUIRED ='SETREQUIRED' 
export const EDIT_ONE_SURVEY_QUESTION ='EDITONESURVEYQUESTION'
export const UPDATE_ONE_SURVEY_QUESTION ='UPDATE_ONE_SURVEY_QUESTION'
export const GET_ONE_SURVEY ='GET_ONE_SURVEY'
export const DATA_LOADING ='DATA_LOADING'
export const SHOW_NOTICE ='SHOWNOTICE'
export const SEND_SURVEY ='SENDSURVEY'


export function inputTypeSelected( inputTypeValue ) {
	return dispatch => {
		dispatch({
		  type: INPUT_TYPE_SELECTED,
			selected: inputTypeValue,
			inputType: inputTypeValue,
		
		});
	}
}
// Get one survey from list of surveys
export function getOneSurvey(id) {
	return async (dispatch) => { 
	
		dispatch({
			type: DATA_LOADING,
			payload:id,
		})
		const request = await Api.get(`survey/${id}`).then(res => {
			console.log(res)
			if(res){
				return dispatch({
          type: GET_ONE_SURVEY,
          payload: res.data.data.surveyInfo,
					surveyId:id
        });
			}
    })
  }
}
//  Get all questions for one survey
export function getSurveyQuestions(id) {
	return async (dispatch) => { 
		dispatch({
			type: DATA_LOADING,
		})
		const request = await Api.get(`survey/${id}/questions/`).then(res => {
			dispatch({
				type: GET_SURVEY_QUESTIONS,
				payload: res.data.data,
			})
		});
  }
}

export function addSurveyQuestion(id, newData) {
	console.log(id, newData)
	return async (dispatch) => {
	 
		 const request = await Api.post(`survey/${id}/questions/`,newData, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		dispatch({
		  type: ADD_SURVEY_QUESTION,
			payload: newData,
			message:request.data.message
		}); 

	// Refresh End point 
		await Api.get(`survey/${id}/questions/`).then(res => {
			dispatch({
				type: GET_SURVEY_QUESTIONS,
				payload: res.data.data,
			})
		});

		setTimeout(() => {
			dispatch({
				type: SHOW_NOTICE
			})
		}, 5000)
		// console.log(request.data.message)
	}

}

export function deleteSurveyQuestion(surveyId,questionId,index) {
	console.log(index)
	return async(dispatch) => {
		const request = await Api.delete(`survey/${surveyId}/questions/${questionId}`,{
			header: {
				Authorization: `JWT ${useAuth().getToken}`
			}
		})
		// console.log(request.data.success)
		dispatch({
			type: DELETE_SURVEY_QUESTION,
			payload:index,
			message:request.data.message
		});

		setTimeout(() => {
			dispatch({
				type: SHOW_NOTICE
			})
		}, 5000)
	
		// console.log(request.data)
	}
}

export function editOneSurveyQuestion(surveyId,questionId, index,) {
	console.log(questionId)
	return async(dispatch) => { 
		const request = await Api.get(`survey/${surveyId}/questions/${questionId}`,{
			header: {
				Authorization: `JWT ${useAuth().getToken}`
			}
		})
		const data = request.data.data
		dispatch({
			type: EDIT_ONE_SURVEY_QUESTION,
			id:questionId,
			index:index,
			payload:data
		});
	}
}

export function updateOneSurveyQuestion(index,surveyId,questionId,newData) {
	console.log(index,surveyId,questionId,newData)
	return async(dispatch) => { 
		const request = await Api.patch(`survey/${surveyId}/questions/${questionId}`,newData,{
			header: {
				Authorization: `JWT ${useAuth().getToken}`
			}
		})
		const data = request.data.data
		dispatch({
			type: UPDATE_ONE_SURVEY_QUESTION,
			value:newData,
			index:index,
			id:questionId,
			message:request.data.message
		});

		// Refresh End point 
		await Api.get(`survey/${surveyId}/questions/`).then(res => {
			dispatch({
				type: GET_SURVEY_QUESTIONS,
				payload: res.data.data,
			})
		});

		setTimeout(() => {
			dispatch({
				type: SHOW_NOTICE
			})
		}, 5000)
		
	}
}

export function addNewOption() {
	return dispatch => {
		dispatch({
		  type: ADD_NEW_OPTION,
			payload:DEFAULTOPTIONVALUE
		
		});
	}
}

export function removeOption(id) {
	return dispatch => {
		dispatch({
		  type: REMOVE_OPTION,
			payload:id
		
		});
	}
}

export function updateOption(value,id) {
	return dispatch => {
		dispatch({
		  type: UPDATE_OPTION,
			value:value,
			id:id
		
		});
	}

}
export function updateBody(value) {
	return dispatch => {
		dispatch({
		  type: UPDATE_BODY,
			payload:value,
		});
	}

}
export function setIsRequired(value) {
	return dispatch => {
		dispatch({
			type: SET_REQUIRED,
			payload:value
		});
	}
}



