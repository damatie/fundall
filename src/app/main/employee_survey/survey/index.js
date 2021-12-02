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
    console.log(surveyCard  )
    // console.log(Math.ceil((noOfPages / 10)))
    
    return (
        <div className="">
            <h2 className="my-10 mb-32  text-2xl font-semibold capitalize">surveys</h2>
            
            <div className="w-full flex items-center justify-center my-28 py-28">
                <Pagination count={Math.ceil((noOfPages / 10))} color="primary" size="large" onChange={handleChange}  />
            </div>
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
                        {
                            surveyCard?.length ? (
                                surveyCard?.map((surveyCardItem,i)=>(
                                <Link to={'employee-survey/survey-form/' + surveyCardItem?.id}  className="text-black hover:no-underline" key={surveyCardItem?.id} >
                                    <SurveyCard surveyCardItem={surveyCardItem} />
                                </Link>
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
        </div>
    )
}

export default SurveyIndexPage
