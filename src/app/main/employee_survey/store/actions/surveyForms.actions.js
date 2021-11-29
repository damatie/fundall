
export const INPUTTYPESELECTED ='INPUTTYPESELECTED'
export const ADDNEWOPTION ='ADDNEWOPTION'
export const DEFAULTOPTIONVALUE ='Option'
export const REMOVEOPTION ='REMOVEOPTION' 
export const UPDATEOPTION ='UPDATEOPTION' 
export const UPDATEBODY ='UPDATEBODY' 
export const ADDSURVEYQUESTION ='ADDSURVEYQUESTION'  
export const GETSURVEYQUESTION ='GETSURVEYQUESTION'
export const DELETESURVEYQUESTION ='DELETESURVEYQUESTION'
export const SETREQUIRED ='SETREQUIRED' 
export const EDITONESURVEYQUESTION ='EDITONESURVEYQUESTION'
export const UPDATE_ONE_SURVEY_QUESTION ='UPDATE_ONE_SURVEY_QUESTION'
export const GET_ONE_SURVEY ='GET_ONE_SURVEY'

export function getOneSurvey(id) {

	return async (dispatch) => {
      const data = await Api.get(`survey/${id}`);
        dispatch({
          type: GET_ONE_SURVEY,
          payload: data
        })
  }
}
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

export function addSurveyQuestion(newData) {
	return dispatch => {
		dispatch({
		  type: ADDSURVEYQUESTION,
			payload: newData
		});
	}

}

export function getSurveyQuestion() {
	return dispatch => {
		dispatch({
			type: GETSURVEYQUESTION,
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



