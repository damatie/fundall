import * as Actions from '../actions';

const initialState = {
    loading: true,
    data: [],
    activities: [],
    activity: {}
};

const Activities = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_ACTIVITIES: {
            return {
                ...state,
                loading: true,
                activities: action.payload
            }
        }
        case Actions.GET_ACTIVITY: {
            return {
                ...state,
                loading: true,
                activity: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default Activities;