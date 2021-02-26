import * as Actions from '../actions';

const initialState = {
    loading: true,
    data: [],
    departmentList: {},
    companyList: {}
};

const Activities = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_DEPARTMENT_EXIT_LIST: {
            return {
                ...state,
                loading: true,
                departmentList: action.payload
            }
        }
        case Actions.GET_COMPANY_EXIT_LIST: {
            return {
                ...state,
                loading: true,
                companyList: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default Activities;