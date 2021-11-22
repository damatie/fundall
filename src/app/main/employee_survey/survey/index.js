import React, { useState,useEffect } from 'react'
import { useAxiosGetAllSurveys } from '../hooks/useAxiosHook'
import Cards from 'app/shared/cards/cards'

const SurveyIndexPage = () => {

	const [surveyCard, setSurveyCard] = useState([])
    
    useAxiosGetAllSurveys('survey',setSurveyCard)
    

    return (
        <div className="">
            <h2 className="my-10 mb-32  text-2xl font-semibold capitalize">surveys</h2>
            <Cards className="w-9/12 mx-auto px-16">
                <h2 className="text-xl mb-16 font-semibold capitalize">survey list</h2>

                {
                    surveyCard?.length ? (
                        surveyCard?.map((surveyCardItem,i)=>(
                        <div className="flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20">
                            <div className="w-2/3">
                                <h3 className="text-2xl font-bold">{surveyCardItem?.title}</h3>
                                <h5 className="text-16 py-8 w-full">{surveyCardItem?.description}</h5>
                                <p className="text-blue-400 text-14">Created {surveyCardItem?.date ? surveyCardItem?.date : "12/10/2021"}</p>
                            </div>
                            <div className="w-1/3">
                                <p className="text-blue-400 text-14 pt-8 text-right">Survey sent to {surveyCardItem?.noOfRecipients}</p>
                                <p className="text-blue-400 text-14 pt-8 text-right">{surveyCardItem?.responseRate ? surveyCardItem?.responseRate : 0}% response rate</p>
                            </div>
                        </div>
                    )) 
                    ) : (
                        <div className="p-20 text-center w-10/12 mx-auto">
                            <h3 className="text-black text-24">There is currently no survey. Click the button above to create a survey.</h3>
                        </div>
                    )
                }
            </Cards>
        </div>
    )
}

export default SurveyIndexPage
