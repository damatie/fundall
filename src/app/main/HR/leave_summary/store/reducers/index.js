import { combineReducers } from 'redux';
import { summaryReducers } from './summary.reducers';
import { leaveSummaryReducers } from './leaveSummary.reducers';

const reducers = combineReducers({
  leaveSummary: summaryReducers,
  summary: leaveSummaryReducers
});

export default reducers;