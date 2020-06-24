import { combineReducers } from 'redux';
import { indexTabReducer } from './index.reducer';

const reducer = combineReducers({
  indexTab: indexTabReducer,
});

export default reducer;