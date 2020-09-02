import { combineReducers } from 'redux';
import entity from './entity.reducer';
import recruitment from './recruitment.reducer';

const reducer = combineReducers({
  entity,
  recruitment,
});

export default reducer;