import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const businessUnitReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_BUSINESS_UNIT: {
			return {
				...state,
        data: action.payload,
        loading: false,
        error: null,
			};
		}
		case Actions.SAVE_BUSINESS_UNIT: {
			return {
				...state,
        loading: false,
        error: null,
        success: true
			};
    }
    case Actions.BUSINESS_UNIT_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      }
    }
    case Actions.BUSINESS_UNIT_ERROR: {
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

export default businessUnitReducer;
