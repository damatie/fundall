import { useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl'
import { useAuth } from 'app/hooks/useAuth'

export const auth = useAuth

const newBaseUrl = 'https://agile-dawn-03556.herokuapp.com/api/v1/'

const baseAuthGet = (urlString) => axios.get( `${newBaseUrl}${urlString}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )
const baseAuthUpdate = (urlString) => axios.patch( `${newBaseUrl}${urlString}`,`${updateData}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )
// const baseAuthGetPaginatedSurveys = (urlString) => axios.get( `${newBaseUrl}${urlString}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )




// export function useAxiosGet (urlString,newData) {
//     // axios.get(`${getBaseUrl()}/department/all/2`, {
//     useEffect(()=>{
//         baseAuthGet(urlString)
//         .then(data => newData(data.data.data))
//         .catch(e => console.error(e));
//     },[urlString,newData])
// }?


export function useAxiosGetUpdate (urlString,updateData) {
    useEffect(() => {
        const fetchSurveys = async (urlString,updateData) => {
            const data = await baseAuthUpdate(urlString)
            // newData(data.data.data)
            console.log(data)
        }
        fetchSurveys(urlString,updateData)
    },[urlString,updateData])
}





export function useAxiosGet (urlString,newData,loading) {
    useEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            const data = await baseAuthGet(urlString)
            newData(data.data.data)
            loading(false)
        }
        fetchSurveys(urlString,newData,loading)
    },[urlString,newData,loading])
}


export function useAxiosGetSingleAudience (urlString,newData,loading,refreshInfo) {
    useEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            const data = await baseAuthGet(urlString,loading)
            newData(data.data.data)
            loading(false)
        }        
        fetchSurveys(urlString,newData,loading)
        console.log('hi')
    },[urlString,newData,loading,refreshInfo])
}

        // axios.get( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${i}`,
        // {headers: { Authorization: `JWT ${auth().getToken}` }} )
        // .then(data => {
        //     if(data.data.status === 200) setTestData(data.data.data)
        //     setOpenEditAudience(true)
        // })
        // .catch(e => console.error(e));



export function useAxiosGetAllSurveys (urlString,newData,page,loading,loadNum) {
    useEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            const data = await baseAuthGet(urlString)
            newData(data.data.message.rows)
            loadNum(data.data.message.count)
            loading(false)
        }
        fetchSurveys(urlString,newData,loading)
    },[urlString,page,newData,loading])
}



export function useAxiosGetAllMembers (urlString,newData,loading) {
    useEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            const res = await baseAuthGet(urlString)
            newData(res.data.data.allMembers)
            loading(false)
        }
        fetchSurveys(urlString,newData,loading)
    },[urlString,newData,loading])
}


