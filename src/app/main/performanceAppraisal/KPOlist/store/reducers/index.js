import { combineReducers } from 'redux';
import employeeKpoList from './kpoList.reducers';
import kpoContentList from './kpoContent.reducers';

export default combineReducers({
  employeeKpoList,
  kpoContentList
});