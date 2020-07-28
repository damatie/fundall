import  { combineReducers } from 'redux';
import { notificationsReducers } from './notifications.reducers';

const reducers = combineReducers({
  notifications: notificationsReducers
});

export default reducers;