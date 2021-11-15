
const initialState  = {
    selected:0
}

export const surveyFormsReducer = (state = initialState , action) =>{
	
	switch (action.type) {
		case `INPUTSELECTEDTYPE`: {
			console.log('reducer', state, action)
			console.log(state.selected+1)
			return{
				selected: state.selected+1
			}
			break;  
		}
			default: {
			return state
		}
		
	}
			
}

export default surveyFormsReducer;