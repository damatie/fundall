import * as Actions from '../actions';
const initialState = {
  loading: true,
  loadingRoles: true,
  loadingPermission: true,
  roles: [],
  data: [],
  submitting: false,
  id: '',
}

const permissionReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_ALL_ROLES:
      return {
        ...state,
        loading: false,
        loadingRoles: false,
        roles: actions.payload,
        id: actions.id
      };
    case Actions.GET_ALL_MENUS:
      return {
        ...state,
        loading: false,
        loadingPermission: false,
        data: actions.payload
      };
    case Actions.SUBMITTING_ROLE_PERMISSIONS:
      return {
        ...state,
        submitting: true
      };
    case Actions.ROLE_PERMISSIONS_SUBMITTED:
      return {
        ...state,
        submitting: false
      }
    default:
      return {
        ...state
      };
  }
};

export default permissionReducer;