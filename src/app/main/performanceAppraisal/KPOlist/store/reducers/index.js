import { combineReducers } from 'redux';
import employeeKpoList from './kpoList.reducers';
import kpoContentList from './kpoContent.reducers';
import kpoReview from './kpoReview.reducers';
import behaviouralAttribute from './behaviouralAttribute.reducer';

const reducer =  combineReducers({
  employeeKpoList,
  kpoContentList,
  kpoReview,
  behaviouralAttribute,
});

export default reducer;