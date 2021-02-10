import { combineReducers } from 'redux';
import educationReducer from './education.reducer';
import travelReducer from './travel.reducer';
import trainingReducer from './training.reducer';
import emergencyContactReducer from './emergencyContact.reducer';
import spouseDependantReducer from './spouseDependant.reducer'
import employeeInfoReducer from './employeeInfo.reducer';

const reducer = combineReducers({
  education: educationReducer,
  travel: travelReducer,
  training: trainingReducer,
  emergencyContact: emergencyContactReducer,
  spouseDependant: spouseDependantReducer,
  employeeInfo: employeeInfoReducer,
});

export default reducer