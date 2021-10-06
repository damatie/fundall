import { combineReducers } from 'redux';
import spouseanddependant from './spouseanddependant.reducer';
import nextofkin from './nextofkin.reducer';
import emergencycontact from './emergencycontact.reducer';
import educationqualification from './educationqualification.reducer';
import employeeinformation from './employeeinformation.reducer';

const reducer = combineReducers({
    spouseanddependant,
    nextofkin,
    emergencycontact,
    educationqualification,
    employeeinformation
});

export default reducer;