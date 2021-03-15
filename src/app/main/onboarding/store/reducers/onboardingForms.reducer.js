import { ONBOARDING_FORMS } from '../actions';

const initialState = {
  forms: {},
  loading: true,
}
const onboardingFromReducer = (state = initialState , actions) => {
  switch(actions.type) {
    case ONBOARDING_FORMS:
      return {
        ...state,
        forms: actions.payload,
        loading: false,
      }
    default:
      return state;
  }
};



export default onboardingFromReducer;