import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

function SurveyCard({surveyCardItem}) {
    return (
        <div className="flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20">
            <div className="w-2/3">
                <h3 className="text-2xl font-bold">{surveyCardItem?.title}</h3>
                <h5 className="text-16 py-8 w-full">{surveyCardItem?.description}</h5>
                {surveyCardItem?.createdAt && 
                    <p className="text-blue-400 text-14">
                        <span>Created </span> <span>{moment(surveyCardItem?.createdAt).format('LLL')}
                        </span>
                    </p>
                }
            </div>
            <div className="w-1/3">
                <p className="text-blue-400 text-14 pt-8 text-right">Survey sent to {surveyCardItem?.noOfRecipients ? surveyCardItem?.noOfRecipients : 0}</p>
                {/* <p className="text-blue-400 text-14 pt-8 text-right">{surveyCardItem?.responseRate ? surveyCardItem?.responseRate : 0}% response rate</p> */}
            </div>
        </div>
    )
}

export default SurveyCard
