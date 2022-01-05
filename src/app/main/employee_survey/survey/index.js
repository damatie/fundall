import React, { useState,useEffect } from 'react'
import { useAxiosGetAllSurveys } from '../hooks/useAxiosHook'
import Cards from 'app/shared/cards/cards'
import SurveyCardLoader from '../utils/surveyCardLoader'
// import { Pagination } from '@material-ui/lab'
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import moment from 'moment';
import SurveyCard from '../shared/surveyCard';
import newCandidateTab from 'app/main/recruitment/tabs/newCandidateTab';
import Swal from 'sweetalert2';
import EditSurvey from './editSurvey';

const SurveyIndexPage = () => {

	const [surveyCard, setSurveyCard] = useState([])
    const [loadingSurveyCard, setLoadingSurveyCard] = useState(false)
    const [page,setPage] = useState(0)
    const [noOfPages, setNoOfPages] = useState(0)

    const auth = useAuth
    
    
    const handleChange = (event,value) => {
        setPage(value - 1)
        // console.log('value',value)
        // console.log('page',page)
        // axios.get( `https://agile-dawn-03556.herokuapp.com/api/v1/survey?page=${page}`,
        // {headers: { Authorization: `JWT ${auth().getToken}` }} )
        // .then(data => setSurveyCard(data.data.message))
        // .catch(e => console.error(e));
    }
    
    // const loadSurveys = async () => {
    //     const data = await axios.get( `https://agile-dawn-03556.herokuapp.com/api/v1/survey?page=${page}`,
    //     {headers: { Authorization: `JWT ${auth().getToken}` }} )
    //     setSurveyCard(data.data.message)
    //     // .catch(e => console.error(e));
    // }
    
    // useEffect(() => {
    //     loadSurveys()
    // },[page])
    useAxiosGetAllSurveys(`survey?page=${page}`,setSurveyCard,page,setLoadingSurveyCard,setNoOfPages)    
    // console.log(loadingSurveyCard)

    // console.log(surveyCard  )
    // console.log(Math.ceil((noOfPages / 10)))
    // console.log(surveyCard)
    const confirmDeleteSurvey = (survey,surveyId,i) => {
        const items = surveyCard;
        let name = survey?.title
        Swal.fire({
            title:`<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
            // html:
            //     `<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
            // input: 'text',
            // inputAttributes: {
            //   autocapitalize: 'off'
            // },
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return   axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/survey/${surveyId}`,
              {headers: { Authorization: `JWT ${auth().getToken}` }} ).then((response) => {
                  // setPostAudience(false)
                  const { success, message, token, data } = response.data;
                  if (success) {
                    if (items.length > 0) {
                      setSurveyCard(items.filter((item, index) => index !== i));
                    }
                    Swal.fire({
                        title: 'Deleted Survey Successfully',
                        text: message,
                        icon: 'success',
                        timer: 3000,
                    })
                } else {
                    Swal.fire({
                        title: 'Sorry could not delete Survey',
                        text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                        icon: 'error',
                        timer: 3000,
                    })
                }
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            ////////////////////////
            allowOutsideClick: () => !Swal.isLoading()
          })
	};

    const [openSurvey, setOpenSurvey] = useState(false)

    const [loadingEditInfo, setLoadingEditInfo] = useState(false)

    const [singleSurvey, setSingleSurvey] = useState()
    const [singleSurveyId, setSingleSurveyId] = useState()
    const [testData, setTestData] = useState()
    const [getSurveyInfo, setGetSurveyInfo] = useState()
    const [getSurveyRecipients, setGetSurveyRecipients] = useState()

    const populateSurvey = (survey,surveyId) => {
        setSingleSurvey(survey)
        setSingleSurveyId(surveyId)
        setLoadingEditInfo(true)
        let name = survey.title
        // // console.log(survey)
        // console.log(singleSurvey)
        // console.log(singleSurveyId)
        // console.log(loadingEditInfo)
        // console.log(name)
        Swal.fire({
            title:`<h3 class="py-20">Click on open to proceed to edit this ${name}</h3>`,
            showCancelButton: true,
            confirmButtonText: 'Open',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return axios.get(`https://agile-dawn-03556.herokuapp.com/api/v1/survey/${surveyId}`,
                            {headers: { Authorization: `JWT ${auth().getToken}` }} )
                            .then((response) => {
                                // console.log(response)
                            setLoadingEditInfo(false)
                            const { success, message, token, data } = response.data;
                            if (success) {
                                // Swal.fire({
                                //     title: `Opened edit form for ${name} successfully`,
                                //     text: message,
                                //     icon: 'success',
                                //     timer: 2000,
                                // })
                                setTestData(response.data.data)
                                setOpenSurvey(true)
                            } else {
                                Swal.fire({
                                    title: 'Sorry could not open the edit form for ${name}',
                                    text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                                    icon: 'error',
                                    timer: 3000,
                                })
                            }
                            })
                            .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                            })
            },
            ////////////////////////
            allowOutsideClick: () => !Swal.isLoading()
          })
        //********************************** */
    }



    return (
        <>
            <div className="">
                <h2 className="my-10 mb-32  text-2xl font-semibold capitalize">surveys</h2>
                <Cards className="w-9/12 mx-auto px-16">
                    <h2 className="text-xl mb-16 font-semibold capitalize">survey list</h2>
                    {loadingSurveyCard ? (
                        <>
                            <SurveyCardLoader/>
                            <SurveyCardLoader/>
                            <SurveyCardLoader/>
                        </>
                    ) : (
                        <>
                                {/* surveyCard?.sort((a,b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((surveyCardItem,i)=>( */}
                            {
                                surveyCard?.length ? (
                                    surveyCard?.map((surveyCardItem,i)=>(
                                    <div key={surveyCardItem?.id} >
                                        <SurveyCard surveyCardItem={surveyCardItem} deleteSurvey={confirmDeleteSurvey} index={i} setOpenSurvey={setOpenSurvey} populateSurvey={populateSurvey} />
                                    </div>
                                )) 
                                ) : (
                                    <div className="p-20 text-center w-10/12 mx-auto">
                                        <h3 className="text-black text-24">There is currently no survey. Click the button above to create a survey.</h3>
                                    </div>
                                )
                            }
                        </>    
                                
                    )}
                </Cards>
                <div className="w-full flex items-center justify-center my-28 py-28">
                    <Pagination count={Math.ceil((noOfPages / 10))} color="primary" size="large" onChange={handleChange}  />
                </div>
            </div>
            {
                openSurvey &&   <EditSurvey 
                                    setOpenSurvey={setOpenSurvey}
                                    testData={testData}
                                    setTestData={setTestData}
                                    singleSurvey={singleSurvey} 
                                    setSingleSurvey={setSingleSurvey} 
                                    singleSurveyId={singleSurveyId} 
                                    setSingleSurveyId={setSingleSurveyId}  
                                />
            }
        </>
    )
}

export default SurveyIndexPage
