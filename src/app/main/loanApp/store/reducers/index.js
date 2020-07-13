import { combineReducers } from 'redux';
import { loansReducer } from './loans.reducer';
import { loanReducer } from './loan.reducer';

const reducer = combineReducers({
  loans: loansReducer,
  loan: loanReducer
});

export default reducer;