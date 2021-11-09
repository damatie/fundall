import { Button } from '@material-ui/core'
import Cards from 'app/shared/cards/cards'
import CenterModal from 'app/shared/modal/CenterModal'
import React from 'react'

function DeleteModal({setDeleteModal,deleteAudience,singleAudienceId,singleAudienceItem}) {

    return (
        <CenterModal open={open} handleClose={() => setDeleteModal(false)} className="w-full mx-auto mt-96 p-32 py-56 text-center flex-col items-center">
                <h3 className="text-xl font-semibold py-20">Are you sure you want to delete {singleAudienceItem?.title}</h3>
                <div className="w-11/12 flex-wrap mx-auto my-20 flex items-center justify-between">
                    <Button className="px-20 py-6 text-12 font-semibold mb-10 bg-red-200 cursor-pointer text-red-900" onClick={() => deleteAudience(singleAudienceId)}>Yes, I want to delete</Button>
                    <Button className="px-20 py-6 text-12 font-semibold mb-10 text-white cursor-pointer bg-green-700" onClick={() => setDeleteModal(false)}>Cancel</Button>
                </div>
        </CenterModal>
    )
}

export default DeleteModal
