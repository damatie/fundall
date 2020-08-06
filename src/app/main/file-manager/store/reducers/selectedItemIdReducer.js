import * as Actions from '../actions';

const initialState = {
	data: [],
	id: '0'
  }
const selectedItemIdReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_SELECTED_ITEM_ID:
			return {
				...state,
				id: action.id,
				selectedItem: action.payload
			  }
		default:
			return state;
	}
};

export default selectedItemIdReducer;
