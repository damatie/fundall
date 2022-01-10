import { useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl'
import { useAuth } from 'app/hooks/useAuth'
import Swal from 'sweetalert2';

export const auth = useAuth

const newBaseUrl = 'https://agile-dawn-03556.herokuapp.com/api/v1/'
// https://agile-dawn-03556.herokuapp.com/api/v1/survey?page=1

const baseAuthGet = (urlString) => axios.get( `${newBaseUrl}${urlString}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )
const baseAuthUpdate = (urlString) => axios.patch( `${newBaseUrl}${urlString}`,`${updateData}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )
const baseAuthPost = (urlString,submitData) => axios.post( `${newBaseUrl}${urlString}`,`${submitData}`, {headers: { Authorization: `JWT ${auth().getToken}` }} )
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




export function useAxiosGetGroup (urlString,newData,loading) {
    useLayoutEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            const data = await baseAuthGet(urlString)
            newData(data.data.data.rows)
            loading(false)
        }
        fetchSurveys(urlString,newData,loading)
    },[urlString,newData,loading])
}
// export function useAxiosGetGroup (urlString,newData,loading) {
//     useEffect(() => {
//         const fetchSurveys = async (urlString,newData,loading) => {
//             loading(true)
//             const data = await baseAuthGet(urlString)
//             newData(data.data.data.rows)
//             loading(false)
//         }
//         fetchSurveys(urlString,newData,loading)
//     },[urlString,newData,loading])
// }


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


//************************ */
// export function useAxiosGetAllSurveys (urlString,newData,page,loading,loadNum) {
//     useLayoutEffect(() => {
//         const fetchSurveys = async (urlString,newData,loading) => {
//             loading(true)
//             const data = await baseAuthGet(urlString)
//             newData(data.data.message.rows)
//             loadNum(data.data.message.count)
//             loading(false)
//         }
//         fetchSurveys(urlString,newData,loading)
//     },[urlString,page,newData,loading])
// }

//*************** */

export function useAxiosGetAllSurveys (urlString,newData,page,loading,loadNum) {
    useLayoutEffect(() => {
        const fetchSurveys = async (urlString,newData,loading) => {
            loading(true)
            try {
                const data = await baseAuthGet(urlString)
                const {success, message: {count,rows}} = await data.data
                // console.log('Hello')
                if (success) {
                    loading(false)
                    newData(rows)
                    loadNum(count)
                    window.scrollTo(0,0)
                } else {
                    loading(false)
                    // console.log('network')
                    Swal.fire({
                        title: 'Sorry could not load survey',
                        text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                        icon: 'error',
                        // timer: 3000,
                    })
                }
            } catch(e) {
                loading(false)
                // console.log(e)
                // console.log('hi')
                console.log(e)
            //    // Swal.fire({
            //    //     title:`<h3 class="py-20">Could not fetch the survey data successfully.</h3>`,
            //    //     showCancelButton: true,
            //    //     confirmButtonText: 'Try again',
            //    //     showLoaderOnConfirm: true,
            //    //     preConfirm: () => {
            //    //       return  fetchSurveys(urlString,newData,loading) 
            //    //     },
            //    //     ////////////////////////
            //    //     allowOutsideClick: () => !Swal.isLoading()
            //    //   })
            }
            // loading(false)
        }
        // console.log(loading)
        fetchSurveys(urlString,newData,loading)
    },[urlString,page,newData,loading])
}



export function useAxiosGetAll (urlString,newData,page,loading,loadNum) {
    useEffect(() => {
        const fetchData = async (urlString,newData,loading) => {
            loading(true)
            const data = await baseAuthGet(urlString)
            newData(data.data.data.rows)
            loadNum(data.data.data.count)
            loading(false)
        }
        fetchData(urlString,newData,loading)
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



export function useAxiosCreate (urlString,submitData,loading) {
    console.log(submitData)
    const postSurvey = async (urlString,submitData,loading) => {
        loading(true)
        const res = await baseAuthPost(urlString,submitData)
        console.log(res)
        loading(false)
    }
    postSurvey(urlString,submitData,loading)
}


