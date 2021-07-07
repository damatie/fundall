import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";

export const GET_COUNTRIES = 'GET COUNTRIES';
export const GET_STATES = 'GET SATES';
export const GET_CITIES = 'GET CITIES';

export const formatData = (data, field) => {
  const arr = [];
  for(const i of data) {
    arr.push({
      id: i[field],
      name: i[field]
    });
  }
  return arr;
};

const getToken = async () => {
  try {
    const state = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
      headers: {
        "Accept": "application/json",
        "api-token": "lo2LK-_VEMtCokzaWOq1p-HD0w1t5xbAISccGip9-80R5bcLasU6fKjC_QXOxmXS93o",
        "user-email": "chinweike89@gmail.com"
      }
    });
    const stateData = state.json();
    return stateData;
  } catch (e) {
    console.error(e);
  }
};

export const getCountries = () => {
  return dispatch => {
    getToken().then(token => {
      fetch('https://www.universal-tutorial.com/api/countries/', {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token.auth_token}`,
        }
      }).then(res => handleResponse(res)).then(
        data => {
          dispatch({
            type: GET_COUNTRIES,
            payload: formatData(data, 'country_name'),
          })
        }
      )
    })
    
  }
};

export const getStates = country => {
  return dispatch => {
    getToken().then(token => {
      fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token.auth_token}`,
        }
      }).then(res => handleResponse(res)).then(
        data => {
          dispatch({
            type: GET_STATES,
            payload: formatData(data, 'state_name')
          })
        }
      )
    })
  }
};

export const getCitites = (state, name) => {
  return dispatch => {
    getToken().then(token => {
      fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token.auth_token}`,
        }
      }).then(res => handleResponse(res)).then(
        data => {
          // console.log(data);
          dispatch({
            type: GET_CITIES,
            payload: formatData(data, 'city_name')
          })
        }
      )
    })
  }
};