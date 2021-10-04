import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const entityReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ENTITY: {
			return {
				...state,
                data: action.payload,
                loading: false,
                error: null,
			};
		}
		case Actions.CREATE_ENTITY: {
			return {
				...state,
                loading: false,
                error: null,
                success: true
			};
    }
    case Actions.ENTITY_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      }
    }
    case Actions.ENTITY_ERROR: {
			return {
				...state,
                loading: false,
                error: action.payload
			};
    }
    case Actions.UPDATE_ENTITY: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
		default: {
			return state;
		}
	}
};

export default entityReducer;
