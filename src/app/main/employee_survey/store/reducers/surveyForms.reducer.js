
import {
	INPUTTYPESELECTED,
	ADDNEWOPTION,
	DEFAULTOPTIONVALUE,
	REMOVEOPTION,
	UPDATEOPTION,
	UPDATEBODY,
	ADDSURVEYQUESTION,
	GETSURVEYQUESTION,
	DELETESURVEYQUESTION,
	SETREQUIRED,
	EDITONESURVEYQUESTION,
	UPDATE_ONE_SURVEY_QUESTION
	
} from '../actions'

const initialState  = {
	isEdit: false,
	selected: null,
	inputType: '',
	isRequired: false,
	body:'Question',
	optionsArray:[],
	surveyQuestion:[]
}

export const surveyFormsReducer = (state = initialState , action) =>{
	
	switch (action.type) {
		case INPUTTYPESELECTED: {
			return{
				...state,
				selected: action.selected,
				inputType: action.inputType,
				optionsArray:[],
				optionsArray:[{name: DEFAULTOPTIONVALUE}],
				isRequired:false
			}
			break;  
		}
		case ADDNEWOPTION: {
		
			return{
				...state,
				optionsArray:[...state.optionsArray,{name:DEFAULTOPTIONVALUE}],
			}
			break;  
		}

		case REMOVEOPTION: {
			const items = state.optionsArray;
			if(items.length > 1){
				state.optionsArray.splice(action.payload,1)
				return{
					...state,
					optionsArray:[...state.optionsArray],
				}
			}
			return{
				...state
			}
			break;  
		}
		case UPDATEOPTION: {
			const  list = [...state.optionsArray]
    	list[action.id].name = action.value
			return{
				...state,
				optionsArray:[...list],
			}
			break;  
		}
		case UPDATEBODY: {
			return{
				...state,
				body:action.payload,
			}
			break;  
		}
		case ADDSURVEYQUESTION: {
			return{
				...state,
				surveyQuestion:[...state.surveyQuestion, action.payload],
				optionsArray:[{name:DEFAULTOPTIONVALUE}],
				body:'Question',
				isRequired:false
			}
			break;  
		}

		case GETSURVEYQUESTION: {
			return{
				...state,
				surveyQuestion:action.payload
			}
			break;  
		}
		case EDITONESURVEYQUESTION: {
			const  item= [...state.surveyQuestion]
			item[action.id].isEdit = action.value
			console.log(action.id, action.value)
			return{
				...state,
				isEdit:action.value,
				surveyQuestion:[...item]
			}
			break;  
		}

		case UPDATE_ONE_SURVEY_QUESTION: {
			const  item= [...state.surveyQuestion]
			item[action.id].isEdit = action.value
			return{
				...state,
				isEdit:action.value,
				surveyQuestion:[...item]
			}
			break;  
		}


		case DELETESURVEYQUESTION: {
			const items = state.surveyQuestion;
			console.log(state.surveyQuestion.isEdit)
			console.log(state.isEdit)
			if(items.length > 0){
				state.surveyQuestion.splice(action.payload,1)
				return{
					...state,
					surveyQuestion:[...state.surveyQuestion],
				}
			}
			return{
				...state
			}
			break;  
		}
		case SETREQUIRED: {
			return{
				...state,
				isRequired:action.payload
			}
			break;  
		}

			default: {
			return state
		}
		
	}
			
}

export default surveyFormsReducer;