import { combineReducers } from 'redux';
import employeeKpoList from './kpoList.reducers';
import kpoContentList from './kpoContent.reducers';

const reducer =  combineReducers({
  employeeKpoList,
  kpoContentList
});

export default reducer;