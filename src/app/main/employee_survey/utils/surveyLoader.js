import React from 'react'

function SurveyLoader() {
    return (
        <div className={`flex animate-pulse justify-between w-full bg-white  mb-40 py-16 px-36 rounded-20`}>
            <div className="w-2/3">
                <h5 className="text-sm font-bold bg-grey-300 p-12 w-full mb-10"></h5>
                <h5 className="text-16 py-8 w-full mb-6 bg-grey-200"></h5>
                <h5 className="text-16 py-8 w-10/12 mb-6 bg-grey-200"></h5>
            </div>
        </div>
    )
}

export default SurveyLoader
