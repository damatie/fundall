import axios from 'axios';

export const GET_COUNTRIES = '[EMPLOYEE] GET COUNTRIES';
export const GET_STATES = '[EMPLOYEE] GET STATES';
export const GET_CITIES = '[EMPLOYEE] GET CITIES';

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await axios.get('https://cbit-location.herokuapp.com/api/v1/location/');
      dispatch({
        type: GET_COUNTRIES,
        payload: data
      });
    } catch (e) {
      dispatch({
        type: GET_COUNTRIES,
        payload: []
      });
    }
  }
};

export const getStates = (code) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await axios.get(`https://cbit-location.herokuapp.com/api/v1/location/regions?country=${code}`);
      dispatch({
        type: GET_STATES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: GET_STATES,
        payload: [],
      });
    }
  }
};

export const getCities = (code, city) => {
  return async (dispatch) => {
    try {
      const { data: { data } } = await axios.get(`https://cbit-location.herokuapp.com/api/v1/location/location/city/${code}/?region=${city}`);
      dispatch({
        type: GET_CITIES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: GET_CITIES,
        payload: [],
      });
    }
  }
};