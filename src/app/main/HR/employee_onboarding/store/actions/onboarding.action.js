import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';

export const GET_ONBOARDINGS = 'GET ONBOARDINGS';
export const ONBOARDINGS_LOADING = 'ONBOARDING LOADING';

export const getOnboardings = () => {
  return dispatch => {
    dispatch({
      type: ONBOARDINGS_LOADING
    })
    const request = axios.get('https://hris-cbit.herokuapp.com/api/v1/onboarding', {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
    request.then(res => {
      console.log(res)
      return dispatch({
        type: GET_ONBOARDINGS,
        payload: res.data.data
      })
    })
  };
};