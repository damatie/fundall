import { OPEN_kPO_CATEGORY_LIST_DIALOG, CLOSE_KPO_CATEGORY_LIST_DIALOG, GET_KPO_CATEGORY } from '../actions';

const initialState = {
  open: false,
  category: {},
  title: 'New KPO category',
  type: 'new'
}

const categoryListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_kPO_CATEGORY_LIST_DIALOG:
      return {
        ...state,
        open: true,
        type: actions.payload.type,
        title: actions.payload.title
      }
    case CLOSE_KPO_CATEGORY_LIST_DIALOG:
      return {
        ...state,
        open: false,
      }
    case GET_KPO_CATEGORY:
      return {
        ...state,
        category: actions.payload
      }
    default: {
      return state
    }
  }
} ;

export default categoryListReducer;