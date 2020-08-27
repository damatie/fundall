import { combineReducers } from 'redux';
import disciplinaryCase from './disciplinaryCase.reducer';
import disciplinaryAction from './disciplinaryAction.reducer';
import employees from './employees.reducer';

const reducer = combineReducers({
	disciplinaryCase,
	disciplinaryAction,
	employees
});

export default reducer;
