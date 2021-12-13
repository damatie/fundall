import Api from 'app/services/api';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
export const INPUTTYPESELECTED ='INPUTTYPESELECTED'
export const ADDNEWOPTION ='ADDNEWOPTION'
export const DEFAULTOPTIONVALUE ='Option'
export const REMOVEOPTION ='REMOVEOPTION' 
export const UPDATEOPTION ='UPDATEOPTION' 
export const UPDATEBODY ='UPDATEBODY' 
export const ADDSURVEYQUESTION ='ADDSURVEYQUESTION'  
export const GET_SURVEY_QUESTIONS ='GETSURVEYQUESTION'
export const DELETESURVEYQUESTION ='DELETESURVEYQUESTION'
export const SETREQUIRED ='SETREQUIRED' 
export const EDITONESURVEYQUESTION ='EDITONESURVEYQUESTION'
export const UPDATE_ONE_SURVEY_QUESTION ='UPDATE_ONE_SURVEY_QUESTION'
export const GET_ONE_SURVEY ='GET_ONE_SURVEY'
export const DATA_LOADING ='DATA_LOADING'

// Get one survey from list of surveys
export function getOneSurvey(id) {
	return async (dispatch) => { 
	
		dispatch({
			type: DATA_LOADING,
		})
		const request = await Api.get(`survey/${id}`).then(res => {
			console.log(res)
			if(res){
				return dispatch({
          type: GET_ONE_SURVEY,
          payload: res.data.message
        });
			}
    })
  }
}
//  Get all questions for one survey
export function getSurveyQuestions(id) {
	console.log(id)
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
		dispatch({
		  type: ADDSURVEYQUESTION,
		});  
		const request = await Api.post(`survey/${id}/questions/`,newData, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		console.log(request.data)

	}

}

// 
export function inputTypeSelected(selectedValue, inputTypeValue ) {
	return dispatch => {
		dispatch({
		  type: INPUTTYPESELECTED,
			selected: selectedValue,
			inputType: inputTypeValue,
		
		});
	}
}

export function addNewOption() {
	return dispatch => {
		dispatch({
		  type: ADDNEWOPTION,
			payload:DEFAULTOPTIONVALUE
		
		});
	}
}

export function removeOption(id) {
	return dispatch => {
		dispatch({
		  type: REMOVEOPTION,
			payload:id
		
		});
	}
}

export function updateOption(value,id) {
	return dispatch => {
		dispatch({
		  type: UPDATEOPTION,
			value:value,
			id:id
		
		});
	}

}
export function updateBody(value) {
	return dispatch => {
		dispatch({
		  type: UPDATEBODY,
			payload:value,
		});
	}

}

export function deleteSurveyQuestion(id) {
	return dispatch => {
		dispatch({
			type: DELETESURVEYQUESTION,
			payload:id
		});
	}
}

export function editOneSurveyQuestion(id, value) {
	return dispatch => {
		dispatch({
			type: EDITONESURVEYQUESTION,
			value:value,
			id:id
		});
	}
}

export function updateOneSurveyQuestion(id,value) {
	return dispatch => {
		dispatch({
			type: UPDATE_ONE_SURVEY_QUESTION,
			value:value,
			id:id
		});
	}
}


export function setIsRequired(value) {
	return dispatch => {
		dispatch({
			type: SETREQUIRED,
			payload:value
		});
	}
}



