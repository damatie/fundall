import { combineReducers } from 'redux';
import { resourcesReducer } from './resources.reducer';
import { resourceReducer } from './resource.reducer';


const reducers = combineReducers({
  resources: resourcesReducer,
  resource: resourceReducer
});

export default reducers;