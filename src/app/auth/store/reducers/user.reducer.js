import * as Actions from '../actions';

let initialState = JSON.parse(localStorage.getItem('user_data'));

if(!initialState) {
	initialState = {
		role: [], // guest
		id: 0,
		data: {
			displayName: 'John Doe',
			photoURL: 'assets/images/avatars/Velazquez.jpg',
			email: 'johndoe@withinpixels.com',
			shortcuts: ['calendar', 'mail', 'contacts', 'todo']
		}
	};
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			const user = {
				...initialState,
				...action.payload
			}
			
			return user;
			
		}
		case Actions.REMOVE_USER_DATA: {
			localStorage.removeItem('user_data');
			return {
				...initialState
			};
		}
		case Actions.USER_LOGGED_OUT: {
			localStorage.removeItem('user_data');
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default user;
