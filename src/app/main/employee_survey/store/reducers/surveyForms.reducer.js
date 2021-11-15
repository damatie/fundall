
const initialState  = {
  selected: null,
	inputType: ''
}

export const surveyFormsReducer = (state = initialState , action) =>{
	
	switch (action.type) {
		case `INPUTTYPESELECTED`: {
			console.log('reducer', state, action)
			console.log(state.selected+1)
			return{
				selected: action.selected,
				inputType: action.inputType

			}
			break;  
		}
			default: {
			return state
		}
		
	}
			
}

export default surveyFormsReducer;