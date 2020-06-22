import { combineReducers } from 'redux';
import employees from './employees.reducer';

const reducer = combineReducers({
  employees,
});

export default reducer;