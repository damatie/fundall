import { combineReducers } from 'redux';
import departmentsReducer from './departments.reducer';
import departmentReducer from './department.reducer';

const reducer = combineReducers({
  departments: departmentsReducer,
  department: departmentReducer
});

export default reducer;