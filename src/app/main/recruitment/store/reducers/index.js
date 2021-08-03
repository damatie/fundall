import { combineReducers } from 'redux';
import recruitment from './recruitment.reducer';
import candidate from './candidate.reducer';
import employeeInformation from './employees.reducer';

const reducer = combineReducers({
  recruitment,
  candidate,
  employeeInformation
});

export default reducer;