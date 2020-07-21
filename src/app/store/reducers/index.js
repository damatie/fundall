import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import { employeeListReducer } from './employeeList.reducer';
import { leavesReducer } from './leaves.reducers';
import { leaveDetailsReducers } from './leaveDetails.reducers';
import { profileReducers } from './profile.reducers';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		...asyncReducers,
		employeeList: employeeListReducer,
		leaveRequest: leavesReducer,
		leaveRequestDetails: leaveDetailsReducers,
		profile: profileReducers
	});

export default createReducer;
