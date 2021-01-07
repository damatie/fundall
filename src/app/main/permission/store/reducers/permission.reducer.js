import * as Actions from '../actions';
const initialState = {
  loading: true,
  loadingPermission: true,
  permissions: {},
  roles: [],
  submitting: false,
  id: '',
}

const permissionReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_ALL_PERMISSION_FOR_A_ROLE:
      return {
        ...state,
        loadingPermission: false,
        permissions: actions.payload,
      };
    case Actions.GET_ALL_ROLES:
      return {
        ...state,
        loading: false,
        roles: actions.payload,
        id: actions.id
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
    case Actions.ROLE_ID:
      return {
        ...state,
        id: actions.payload,
        permissions: {},
        loadingPermission: true,
      }
    default:
      return {
        ...state
      };
  }
};

export default permissionReducer;