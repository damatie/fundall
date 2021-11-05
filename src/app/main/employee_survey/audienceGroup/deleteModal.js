import { Button } from '@material-ui/core'
import Cards from 'app/shared/cards/cards'
import React from 'react'

function DeleteModal({setDeleteModal,deleteAudience,singleAudienceId,singleAudienceItem}) {

    return (
        <div className="fixed top-0 right-0 w-full h-full overflow-y-hidden bg-opacity-75 bg-black">
            <div className="pt-64 flex-col-scroll flex top-0 right-0 mx-auto w-full top-2/4 absolute">
                <Cards className="w-1/2 mx-auto mt-96 p-32 py-56 text-center flex-col items-center">
                    <h3 className="text-xl font-semibold py-20">Are you sure you want to delete {singleAudienceItem?.title}</h3>
                    <div className="w-10/12 mx-auto my-20 flex items-center justify-between">
                        <Button className="px-20 py-6 text-12 font-semibold bg-red-200 cursor-pointer text-red-900" onClick={() => deleteAudience(singleAudienceId)}>Yes, I want to delete</Button>
                        <Button className="px-20 py-6 text-12 font-semibold text-white cursor-pointer bg-green-700" onClick={() => setDeleteModal(false)}>Cancel</Button>
                    </div>
                </Cards>
            </div>
        </div>
    )
}

export default DeleteModal
