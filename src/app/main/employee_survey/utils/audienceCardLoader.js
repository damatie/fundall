import { Button } from '@material-ui/core'
import Cards from 'app/shared/cards/cards'
import React from 'react'

function AudienceCardLoader() {
    return (
        <Cards className="mb-44 px-12 py-8">
            <div className="flex justify-end">
                <Button
                    variant="contained"
                    color="secondary"
                    className="py-10 px-20 text-12 bg-blue-400 ml-10 cursor-pointer"
                >
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className="py-10 px-20 text-12 bg-red-200 ml-10 cursor-pointer"
                >
                </Button>
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
