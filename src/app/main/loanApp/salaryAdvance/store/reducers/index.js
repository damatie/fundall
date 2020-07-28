import { combineReducers } from 'redux';
import { salaryAdvanceLoansReducers } from './salaryAdvanceLoans.reducers';

const reducers = combineReducers({
  salaryAdvance: salaryAdvanceLoansReducers
});

export default reducers;