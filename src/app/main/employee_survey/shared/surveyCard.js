import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



function SurveyCard({surveyCardItem,deleteSurvey,index,setOpenSurvey,populateSurvey}) {
    return (
        <div className="flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20">
            <Link to={'/employee-survey/survey-form/' + surveyCardItem?.id}  className="text-black hover:no-underline w-2/3">
                <h3 className="text-2xl font-bold">{surveyCardItem?.title}</h3>
                <h5 className="text-16 py-8 w-full">{surveyCardItem?.description}</h5>
                {surveyCardItem?.createdAt && 
                    <p className="text-blue-400 text-14">
                        <span>Created </span> <span>{moment(surveyCardItem?.createdAt).format('LLL')}
                        </span>
                    </p>
                }
            </Link>
            <div className="md:w-1/3 w-full space-y-4 flex flex-col justify-between">
                <p className="text-blue-400 text-14 pt-8 text-right">Survey sent to {surveyCardItem?.noOfRecipients ? surveyCardItem?.noOfRecipients : 0}</p>
                {surveyCardItem?.editable && (
                    <div className='flex justify-end space-x-8'>
                        <button
                            className="bg-blue-200 text-blue-700 cursor-pointer rounded-sm py-4 px-6"
                            onClick={() => populateSurvey(surveyCardItem,surveyCardItem?.id)}
                        >
                            <EditIcon  className="text-18" />
                        </button>
                        <button
                            className="bg-red-200 cursor-pointer rounded-sm py-4 px-6 text-red-700"
                            onClick={(id) => deleteSurvey(surveyCardItem,surveyCardItem?.id,index)}
                        >
                            <DeleteIcon className='text-18' />
                        </button>
                    </div>
                )}
                {/*  */}
                {/*  */}
                {/* onClick={(id) => deleteSurvey(surveyCardItem,surveyCardItem?.id,index)} */}
                {/* <p className="text-blue-400 text-14 pt-8 text-right">{surveyCardItem?.responseRate ? surveyCardItem?.responseRate : 0}% response rate</p> */}
            </div>
        </div>
    )
}

export default SurveyCard
