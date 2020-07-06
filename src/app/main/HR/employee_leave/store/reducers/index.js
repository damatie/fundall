import { combineReducers } from 'redux';
import { allocateReducer } from './allocate.reducer';

const reducers = combineReducers({
  allocate: allocateReducer
});

export default reducers;