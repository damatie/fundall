import axios from 'axios';

export const getCountries = async () => {
  try {
    const { data: { data } } = await axios.get('https://cbit-location.herokuapp.com/api/v1/location/');
    const modifiedData = data.map((item) => ({
      id: item.code,
      name: item.name
    }))
    return modifiedData;
  } catch (e) {
    return [];
  }
}

export const getStates = async (code) => {
  try {
    const { data: { data } } = await axios.get(`https://cbit-location.herokuapp.com/api/v1/location/regions?country=${code}`);
    const modifiedData = data.map((item) => ({
      id: item.region,
      name: item.region
    }))
    return modifiedData;
  } catch (e) {
    return [];
  }
}

export const getCities = async (code, state) => {
  try {
    const { data: { data } } = await axios.get(`https://cbit-location.herokuapp.com/api/v1/location/city/${code}/?region=${state}`);
    const modifiedData = data.map((item) => ({
      id: item.id,
      name: item.city
    }))
    return modifiedData;
  } catch (e) {
    return [];
  }
}