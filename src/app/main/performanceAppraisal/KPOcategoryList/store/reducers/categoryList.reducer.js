import * as Actions from '../actions';

const initialState = {
  open: false,
  category: {},
  title: 'New KPO category',
  type: 'new',
  data: [],
  loading: true,
}

const categoryListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.OPEN_kPO_CATEGORY_LIST_DIALOG:
      return {
        ...state,
        open: true,
        type: actions.payload.type,
        title: actions.payload.title
      }
    case Actions.CLOSE_KPO_CATEGORY_LIST_DIALOG:
      return {
        ...state,
        open: false,
      }
    case Actions.GET_KPO_CATEGORY:
      return {
        ...state,
        category: actions.payload
      }
    case Actions.GET_ALL_KPO_CATEGORY:
      return {
        ...state,
        data: actions.payload,
        loading: false
      }
    default: {
      return state
    }
  }
} ;

export default categoryListReducer;