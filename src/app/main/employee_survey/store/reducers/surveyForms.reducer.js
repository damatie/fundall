
import {
	INPUTTYPESELECTED,
	ADDNEWOPTION,
	DEFAULTOPTIONVALUE,
	REMOVEOPTION,
	UPDATEOPTION,
	UPDATEBODY,
	ADDSURVEYQUESTION,
	GET_SURVEY_QUESTIONS,
	DELETE_SURVEY_QUESTION,
	SETREQUIRED,
	EDIT_ONE_SURVEY_QUESTION,
	UPDATE_ONE_SURVEY_QUESTION,
	GET_ONE_SURVEY,
	DATA_LOADING
	
} from '../actions'

const initialState  = {
	isEdit: {
		status: false,
		id:null,
		index: null
	},
	selected: null,
	isLoading: false,
	inputType: null,
	isRequired: false,
	body:'Question',
	optionsArray:[],
	surveyId:null,
	getOneSurvey:{},
	getSurveyQuestions:[],
	getOneSurveyQuestion:{},
	surveyQuestion:[]
}


export const surveyFormsReducer = (state = initialState , action) =>{
	
	switch (action.type) {

		case DATA_LOADING: {
			return {
				...state,
				// getSurveyQuestions:[],
				isLoading:true,
			}
			break;  
		}

		case GET_ONE_SURVEY: {
			return{
				...state,
				getOneSurvey:action.payload,
				isLoading:false,
				surveyId:action.surveyId
			}
			break;  
		}

		case GET_SURVEY_QUESTIONS: {
			console.log(action.payload)
			return{
				...state,
				getSurveyQuestions:[],
				getSurveyQuestions:action.payload,
				isLoading:false,
			}
			break;  
		}
		case ADDSURVEYQUESTION: {
			return{
				...state,
				getSurveyQuestions:[...state.getSurveyQuestions,action.payload],
				optionsArray:[DEFAULTOPTIONVALUE],
				body:'Question',
				isRequired:false
			}
			break;  
		}

		case INPUTTYPESELECTED: {
			console.log(action.selected)
			return{
				...state,
				selected: action.inputType,
				inputType: action.inputType,
				optionsArray:[],
				optionsArray:[DEFAULTOPTIONVALUE],
				isRequired:false
			}
			break;  
		}
		case ADDNEWOPTION: {
		
			return{
				...state,
				optionsArray:[...state.optionsArray,DEFAULTOPTIONVALUE],
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
    	list[action.id] = action.value
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
		case EDIT_ONE_SURVEY_QUESTION: {
			// const  item= [...state.getSurveyQuestions]
			// item[action.index] ===action.index
			return{
				...state,
			
				isEdit: {
					id:action.id,
					index:action.index,
					status: true
				},

				selected:action.payload.type,
				isRequired:action.payload.required,
				body:action.payload.body,
				optionsArray:action.payload.options,
			}
			break;  
		}

		case UPDATE_ONE_SURVEY_QUESTION: {
			// const  item= [...state.getSurveyQuestions]
			// item[action.index]===action.index
			return{
				...state,
				isEdit: {
					id:null,
					index:null,
					status: !state.isEdit.status
				},
				selected:null,
				inputTypeIcon:null,
				// getSurveyQuestions:[...item],
				optionsArray:[DEFAULTOPTIONVALUE],
				body:'Question',
				isRequired:false

			}
			break;  
		}

		case DELETE_SURVEY_QUESTION: {
			const items = state.getSurveyQuestions;
			state.getSurveyQuestions.splice(action.payload,1)
			return{
				...state,
				getSurveyQuestions:[...state.getSurveyQuestions],
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