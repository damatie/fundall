import { combineReducers } from 'redux';
import activityReducer from './admin.reducers';

const reducer = combineReducers({
    activities: activityReducer,
});

export default reducer;