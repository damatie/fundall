import { combineReducers } from 'redux';
import { employeeInfoReducer } from './employeeInfo.reducers';

const reducer = combineReducers({
  employeeInfo: employeeInfoReducer,
});

export default reducer;