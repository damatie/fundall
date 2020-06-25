import { combineReducers } from 'redux';
import businessUnitsReducer from './businessUnits.reducer';
import businessUnitReducer from './businessUnit.reducer';

const reducer = combineReducers({
  businessUnits: businessUnitsReducer,
  businessUnit: businessUnitReducer,
});

export default reducer;