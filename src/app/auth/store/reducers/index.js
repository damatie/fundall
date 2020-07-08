import { combineReducers } from 'redux';
import login from './login.reducer';
import register from './register.reducer';
import user from './user.reducer';
import forgotPassword from './forgotPassword.reducer';
import resetPassword from './resetPassword.reducer';

const authReducers = combineReducers({
	user,
	login,
	register,
	forgotPassword,
	resetPassword
});

export default authReducers;
