import { combineReducers } from 'redux';
import { profileReducer } from './profile.reducer';

const reducer = combineReducers({
  employeeProfile: profileReducer,
});

export default reducer;