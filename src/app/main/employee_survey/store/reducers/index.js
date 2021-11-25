import { combineReducers } from 'redux';
import {surveyFormsReducer,optionsArrayReducer} from './surveyForms.reducer'

const reducer =  combineReducers({
    surveyFormsReducer,
    // optionsArrayReducer
    
});

export default reducer;