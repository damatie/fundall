import { combineReducers } from 'redux';
import educationReducer from './education.reducer';
import travelReducer from './travel.reducer';
import trainingReducer from './training.reducer';
import emergencyContactReducer from './emergencyContact.reducer';
import spouseDependantReducer from './spouseDependant.reducer'
import employeeInfoReducer from './employeeInfo.reducer';
import organizationReducer from 'app/main/employeeManagement/store/reducers/employees.reducer';
import compensationColumnsReducer from 'app/main/compensationColumns/store/reducer/compensation.reducer';
import nextOfKinReducer from './nextOfKin.reducer';

const reducer = combineReducers({
  education: educationReducer,
  travel: travelReducer,
  training: trainingReducer,
  emergencyContact: emergencyContactReducer,
  spouseDependant: spouseDependantReducer,
  employeeInfo: employeeInfoReducer,
  organization: organizationReducer,
  compensationColumns: compensationColumnsReducer,
  nextOfKin: nextOfKinReducer
});

export default reducer