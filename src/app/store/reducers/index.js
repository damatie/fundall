import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import { employeeListReducer } from './employeeList.reducer';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		...asyncReducers,
		employeeList: employeeListReducer
	});

export default createReducer;
