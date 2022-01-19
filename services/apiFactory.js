import { AxiosHost } from './axiosGlobal';

// Create company account
export const createAccount = (payload) =>{
  const url =`/api/v1/register`
  return AxiosHost.post(url,payload)
}


export const login = (payload) =>{
  const url =`/api/v1/login`
  return AxiosHost.post(url,payload)
}