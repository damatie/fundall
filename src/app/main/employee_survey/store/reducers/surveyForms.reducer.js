
import {
	INPUTTYPESELECTED,
	ADDNEWOPTION,
	DEFAULTOPTIONVALUE,
	REMOVEOPTION,
	UPDATEOPTION,
	ADDSURVEYQUESTION,
	GETSURVEYQUESTION,
	UPDATEBODY
} from '../actions'

const initialState  = {
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

			default: {
			return state
		}
		
	}
			
}

export default surveyFormsReducer;