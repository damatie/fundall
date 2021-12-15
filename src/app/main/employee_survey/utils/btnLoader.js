import { CircularProgress } from '@material-ui/core'
import SharedButton from 'app/shared/button/SharedButton'
import React from 'react'

function BtnLoader() {
    return (
        <SharedButton 
            variant="contained"
            color="primary"
            disabled
            className="relative py-8 px-44 my-24 mr-28 text-14 text-white font-normal"
        >
            <div className='absolute'>
                <CircularProgress />
            </div>
           <p className='text-14'>Submitting</p>    
        </SharedButton>
    )
}

export default BtnLoader
