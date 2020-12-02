import auth from 'app/auth/store/reducers';
import blog from 'app/main/blog_app/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import { employeeListReducer } from './employeeList.reducer';
import { leavesReducer } from './leaves.reducers';
import { leaveDetailsReducers } from './leaveDetails.reducers';
import { profileReducers } from './profile.reducers';
import { regionsReducer } from './regions.reducers';
import { roleListReducer } from './roles.reducers';
import { entityListReducer } from './entities.reducers';
import { departmentReducer } from './departments.reducers';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		blog,
		fuse,
		...asyncReducers,
		employeeList: employeeListReducer,
		leaveRequest: leavesReducer,
		leaveRequestDetails: leaveDetailsReducers,
		profile: profileReducers,
		regions: regionsReducer,
		roles: roleListReducer,
		entities: entityListReducer,
		departments: departmentReducer
	});

export default createReducer;
