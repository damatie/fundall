import { useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl'
import { useAuth } from 'app/hooks/useAuth'

export const auth = useAuth

const newBaseUrl = 'https://agile-dawn-03556.herokuapp.com/api/v1/'

const baseAuthGet = (urlString) => axios.get( `${newBaseUrl}${urlString}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )

export function useAxiosGet (urlString,newData) {
    // axios.get(`${getBaseUrl()}/department/all/2`, {
    useEffect(()=>{
        baseAuthGet(urlString)
        .then(data => newData(data.data.data))
        .catch(e => console.error(e));
    },[urlString,newData])
}

export function useAxiosGetAllSurveys (urlString,newData) {
    useEffect(() => {
        baseAuthGet(urlString)
        .then(data => newData(data.data.message))
        .catch(e => console.error(e));
    },[urlString,newData])
}

