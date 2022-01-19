import axios from 'axios';

const $API_HOST = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const $AuthHeader = {
  Accept: 'application/json',
  authorization: '',
 
};

export const AxiosHost = axios.create({
  baseURL: $API_HOST,
  headers: $AuthHeader,
});