import SharedButton from 'app/shared/button/SharedButton'
import Cards from 'app/shared/cards/cards'
import React, { useState } from 'react'

const SurveyIndexPage = () => {


	const [surveyCard, setSurveyCard] = useState([
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88,
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88,
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88
        },
    ])


    return (
        <div className="">
            <h2 className="my-10 mb-32  text-2xl font-semibold capitalize">surveys</h2>
            <Cards className="w-9/12 mx-auto px-16">
                <h2 className="text-xl mb-16 font-semibold capitalize">survey list</h2>
                {
                    surveyCard?.map((surveyCardItem,i)=>(
                        <div className="flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20">
                            <div className="w-2/3">
                                <h3 className="text-2xl font-bold">{surveyCardItem?.title}</h3>
                                <h5 className="text-16 py-8 w-full">{surveyCardItem?.description}</h5>
                                <p className="text-blue-400 text-14">Created {surveyCardItem?.date}</p>
                            </div>
                            <div className="w-1/3">
                                <p className="text-blue-400 text-14 pt-8 text-right">Survey sent to {surveyCardItem?.numberOfPeople}</p>
                                <p className="text-blue-400 text-14 pt-8 text-right">{surveyCardItem?.responseRate}% response rate</p>
                            </div>
                        </div>
                    ))
                }
            </Cards>
        </div>
    )
}

export default SurveyIndexPage
