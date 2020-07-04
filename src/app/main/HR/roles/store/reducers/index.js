import { combineReducers } from 'redux';
import { roleReducer } from './role.reducer';
import { rolesReducer } from './roles.reducer';

const reducers = combineReducers({
  role: roleReducer,
  roles: rolesReducer,
});

export default reducers;