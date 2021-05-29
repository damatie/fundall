import { combineReducers } from 'redux';
import employeesReducer from './employees.reducer';

const reducer = combineReducers({
  employees: employeesReducer,
});

export default reducer;