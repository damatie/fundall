
export const INPUTTYPESELECTED ='INPUTTYPESELECTED'
export const ADDNEWOPTION ='ADDNEWOPTION'
export const DEFAULTOPTIONVALUE ='Option'
export const REMOVEOPTION ='REMOVEOPTION' 
export const UPDATEOPTION ='UPDATEOPTION' 
export const UPDATEBODY ='UPDATEBODY' 
export const ADDSURVEYQUESTION ='ADDSURVEYQUESTION'  
export const GETSURVEYQUESTION ='GETSURVEYQUESTION'

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



