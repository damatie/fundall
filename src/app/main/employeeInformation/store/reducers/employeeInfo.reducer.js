import { OPEN_SHARED_MODAL, 
  CLOSE_SHARED_MODAL,
  EMPLOYEE_DATA,
} from '../actions';

const initialState = {
  open: false,
  title: '',
  info: {},
  loading: true,
};

const employeeInfoReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_SHARED_MODAL:
      return {
        ...state,
        title: actions.payload,
        open: true
      }
    case CLOSE_SHARED_MODAL:
      return {
        ...state,
        open: false,
        title: '',
      }
    case EMPLOYEE_DATA:
      return {
        ...state,
        loading: false,
        info: {
          ...actions.payload,
          info: null,
          ...actions.payload.info
        }
      }
    case 'clear_info':
      return {
        ...state,
        loading: true,
        info: { }
      }
    default:
      return state;
  }
};

export default employeeInfoReducer