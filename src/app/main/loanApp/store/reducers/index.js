import { combineReducers } from 'redux';
import loansReducer from './loans.reducer';
import loanReducer from './loan.reducer';
import { salaryAdvanceReducers } from './salaryAdvance.reducers';
import { salaryAdvanceReducer } from './salaryAdvance.reducer';

const reducer = combineReducers({
  loans: loansReducer,
  loan: loanReducer,
  salaryAdvance: salaryAdvanceReducers,
  salaryAdvances: salaryAdvanceReducer,
});

export default reducer;