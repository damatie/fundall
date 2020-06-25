import { combineReducers } from 'redux';
import leaveOptionsReducer from './leaveOptions.reducer';
import leaveOptionReducer from './leaveOption.reducer';

const reducer = combineReducers({
  leaveOptions: leaveOptionsReducer,
  leaveOption: leaveOptionReducer
});

export default reducer;