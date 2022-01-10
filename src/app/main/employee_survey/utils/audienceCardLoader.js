import { Button } from '@material-ui/core'
import Cards from 'app/shared/cards/cards'
import React from 'react'

function AudienceCardLoader() {
    return (
        <Cards className="mb-44 px-12 py-8">
            <div className='flex justify-end space-x-8'>
                <button className="bg-blue-200 text-blue-700 cursor-pointer rounded-sm py-12 px-12"></button>
                <button className="bg-red-200 cursor-pointer rounded-sm py-12 px-12 text-red-700"></button>
            </div>
            <div className="py-10 w-8/12">
                <h3 className="text-xl p-10 bg-grey-400 mb-10 font-bold"></h3>
                <h5 className="py-8 bg-grey-300 text-16 mb-10 w-10/12"></h5>
                <h6 className="bg-blue-300 text-18 w-3/12"></h6>
            </div>
        </Cards>
    )
}

export default AudienceCardLoader
