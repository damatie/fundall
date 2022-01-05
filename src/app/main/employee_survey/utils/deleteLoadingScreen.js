import { CircularProgress } from '@material-ui/core'
import SideModal from 'app/shared/modal/SideModal'
import React from 'react'

function DeleteLoadingScreen({setDeleteAudience}) {
    return (
        <SideModal>
            <div   className='flex items-center'>
                <CircularProgress/>
            </div>
        </SideModal>
    )
}

export default DeleteLoadingScreen
