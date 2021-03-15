import api from 'app/services/api';

export const ONBOARDING_FORMS = 'ONBOARDING FORMS';

export const getOwnOnboardingForms = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await api.get('/onboarding/employee/docs');
      dispatch({
        type: ONBOARDING_FORMS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ONBOARDING_FORMS,
        payload: [],
      });
    }
  }
};