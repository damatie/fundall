import { combineReducers } from 'redux';
import entity from './entity.reducer';
import recruitment from './recruitment.reducer';
import candidate from './candidate.reducer';

const reducer = combineReducers({
  entity,
  recruitment,
  candidate,
});

export default reducer;