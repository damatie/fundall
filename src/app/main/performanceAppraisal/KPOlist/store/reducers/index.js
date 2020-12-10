import { combineReducers } from 'redux';
import employeeKpoList from './kpoList.reducers';
import kpoContentList from './kpoContent.reducers';
import kpoReview from './kpoReview.reducers';

const reducer =  combineReducers({
  employeeKpoList,
  kpoContentList,
  kpoReview,
});

export default reducer;