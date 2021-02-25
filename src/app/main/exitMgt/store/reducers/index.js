import { combineReducers } from 'redux';
import activityReducer from './exit.reducers';

const reducer = combineReducers({
    Exit: activityReducer,
});

export default reducer;