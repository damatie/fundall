import { combineReducers } from 'redux';
import question from './question.reducer';
import checkList from './checkList.reducer';
import answer from './answer.reducer';

const reducer = combineReducers({
	question,
	checkList,
	answer
});

export default reducer;
