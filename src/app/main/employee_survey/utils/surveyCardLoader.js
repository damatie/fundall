import React from 'react'

function SurveyCardLoader({classes}) {
    return (
        <div className={`flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20 ${classes}`}>
            <div className="w-2/3">
                <h3 className="text-2xl font-bold bg-grey-300 p-12 w-full mb-10"></h3>
                <h5 className="text-16 py-8 w-full mb-6 bg-grey-200"></h5>
                <h5 className="text-16 py-8 w-10/12 mb-6 bg-grey-200"></h5>
                <p className="text-blue-400 text-14 w-5/12 py-6 bg-blue-200"></p>
            </div>
            <div className="w-1/3 flex flex-col items-end">
                <p className="text-blue-400 py-10 text-14 pt-8 w-7/12 bg-blue-200 mb-10"></p>
                <p className="text-blue-400 py-10 text-14 pt-8 w-7/12 bg-blue-200"></p>
            </div>
        </div>
    )
}

export default SurveyCardLoader
