import { combineReducers } from 'redux';
import employeeKpoList from './kpoList.reducers';
import kpoContentList from './kpoContent.reducers';
import kpoReview from './kpoReview.reducers';
import behaviouralAttribute from './behaviouralAttribute.reducer';
import entities from 'app/main/HR/business_unit/store/reducers/businessUnits.reducer';
import departments from 'app/main/HR/business_unit/department/store/reducers/departments.reducer';

const reducer =  combineReducers({
  employeeKpoList,
  kpoContentList,
  kpoReview,
  behaviouralAttribute,
  entities,
  departments
});

export default reducer;