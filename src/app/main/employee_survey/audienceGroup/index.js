import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Cards from 'app/shared/cards/cards'
import { Link } from 'react-router-dom';
import EditAudience from './editAudience';
import CreateAudience from './createAudience';
import Swal from 'sweetalert2';
import { useAxiosGet } from '../hooks/useAxiosHook';
import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import AudienceCardLoader from '../utils/audienceCardLoader';

const AudienceGroupIndexPage = () => {

	const [openEditAudience, setOpenEditAudience] = useState(false)
	const [openCreateAudience, setOpenCreateAudience] = useState(false)

    const [audienceCard, setAudienceCard] = useState([])

    const [singleAudienceId,setSingleAudienceId] = useState()
    const [singleAudienceItem,setSingleAudienceItem] = useState()
    const [deleteModal, setDeleteModal] = useState(false)
    const [testData,setTestData] = useState({})
    const [loadingAudienceCard, setLoadingAudienceCard] = useState(false)
    const [deleteNotification, setDeleteNotification] = useState('')

    const deleteAudience = (i,id) => {
        const items = audienceCard;
        if (items.length > 0) {
          setAudienceCard(items.filter((item, index) => index !== i));
          axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${id}`,
          {headers: { Authorization: `JWT ${auth().getToken}` }} )
          .then(data => console.log(data))
          .catch(e => console.error(e));
        }
        setDeleteModal(false)
    }

    const auth = useAuth

    const openPopulate = (audienceCardItem,i) => {
        setSingleAudienceItem(audienceCardItem)
        setSingleAudienceId(i)
        axios.get( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${i}`,
                {headers: { Authorization: `JWT ${auth().getToken}` }} )
                .then(data => {
                    if(data.data.status === 200) setTestData(data.data.data)
                    setOpenEditAudience(true)
                })
                .catch(e => console.error(e));
    }


    useAxiosGet('surveyGroup',setAudienceCard,setLoadingAudienceCard)
    // useAxiosGet('surveyGroup',setAudienceCard,setLoadingAudienceCard)
    
	const confirmDeleteAudience = (audienceCardItem,i,id) => {
        let name = audienceCardItem.name
		Swal.fire({
			icon: 'info',
			title: 'Do you want to delete \n this Audience ?',
			html:
                `<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: `CONTINUE`,
			confirmButtonColor: '#19AC4B',
			cancelButtonColor: '#FA1C1C',
			customClass: {
				cancelButton: 'kpo-custom-swal-btn',
				confirmButton: 'kpo-custom-swal-btn',
				title: 'kpo-custom-swal-title',
				popup: 'kpo-custom-swal-popup',
				icon: 'kpo-custom-swal-icon'
			}
		}).then(result => {
			if (result.isConfirmed) {
                deleteAudience(i,id)
			}
		});
	};


    return (
        <>
           <>
                <div className="flex my-10 mb-32 items-center">
                    <h2 className="mr-8 text-2xl font-semibold capitalize">audience / groups</h2>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="py-8 px-60 text-12 cursor-pointer"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={()=>setOpenCreateAudience(true)}
                    >
                        Create Audience/Group
                    </Button>
                </div>
                {loadingAudienceCard ? (
                    <>
                        <AudienceCardLoader/>
                        <AudienceCardLoader/>
                        <AudienceCardLoader/>
                        <AudienceCardLoader/>
                    </>
                ) : (
                    <>
                    {
                    audienceCard.length > 0 ? (
                        audienceCard?.map((audienceCardItem,i)=>(
                            <Cards className="mb-44 px-12 py-8" key={audienceCardItem?.id}>
                                <div className="flex justify-end">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="px-20 py-6 text-12"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={() => openPopulate(audienceCardItem,audienceCardItem?.id)}
                                    >
                                        edit Group
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="px-20 py-6 text-12 bg-red-200 ml-10 cursor-pointer text-red-900"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => confirmDeleteAudience(audienceCardItem,i,audienceCardItem?.id)}
                                        // onClick={() => openDeleteModal(audienceCardItem,i)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="py-10 w-8/12">
                                    <Link to={'employee-survey/single-audience/' + audienceCardItem?.id } className="text-black hover:no-underline">
                                        <h3 className="text-2xl p-4 pb-0 border-b-2 border-gray-A100 font-bold">   {audienceCardItem?.name}
                                        </h3>
                                    </Link>
                                    <h5 className="py-10 text-16 w-full">{audienceCardItem?.description}</h5>
                                    <p className="text-blue-400 cursor-pointer text-18">
                                        {audienceCardItem?.totalMembers ? audienceCardItem?.totalMembers : 0} {audienceCardItem?.totalMembers > 1 ? 'members' : 'member'} in this group</p>
                                </div>
                            </Cards>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl p-10 text-black">There are no new audience(s)/group(s) yet.</h3>
                            <h3 className="text-2xl p-10 text-black">Click the button above to create an audience</h3>
                        </div>
                    )
                }
                    </>
                )}
            </>
                {openEditAudience && <EditAudience setOpenEditAudience={setOpenEditAudience} openEditAudience={openEditAudience} testData={testData} singleAudienceItem={singleAudienceItem} setSingleAudienceItem={setSingleAudienceItem} singleAudienceId={singleAudienceId} setSingleAudienceId={setSingleAudienceId} />}

                {openCreateAudience && <CreateAudience setOpenCreateAudience={setOpenCreateAudience} audienceCard={audienceCard} />  }


        </>
    )
}

export default AudienceGroupIndexPage
