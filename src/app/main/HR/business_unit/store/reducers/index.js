import { combineReducers } from 'redux';
import businessUnitsReducer from './businessUnits.reducer';
import businessUnitReducer from './businessUnit.reducer';
import entitiesReducer from './entities.reducer';
import entityReducer from './entity.reducer';

const reducer = combineReducers({
  businessUnits: businessUnitsReducer,
  businessUnit: businessUnitReducer,
  entities: entitiesReducer,
  entity: entityReducer,
});

export default reducer;