import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Cards from 'app/shared/cards/cards'
import { Link } from 'react-router-dom';
import EditAudience from './editAudience';
import CreateAudience from './createAudience';
import Swal from 'sweetalert2';

const AudienceGroupIndexPage = () => {

	const [openEditAudience, setOpenEditAudience] = useState(false)
	const [openCreateAudience, setOpenCreateAudience] = useState(false)

    const [audienceCard, setAudienceCard] = useState([
        {
            title:"Employee Work Life Balance Survey Group",
            description:"This is a description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:0,
            participantDepartments:[
                {
                    label:"Human Resources",
                    value:1,
                    id:12
                },
            ],
            participantGroups:[
                {
                    label:"Company Policy Survey Group",
                    value:1,
                    id:10
                },
                {
                    label:"Manager Performance Survey Group",
                    value:2,
                    id:11
                },
                {
                    label:"Network Performance Survey Group",
                    value:3,
                    id:12
                },
                {
                    label:"Employee Work Life Balance Survey Group",
                    value:4,
                    id:13
                }
            ],
            participantIndividualEmail:["hello@email.co","hi@gmai.co"],
            recipientParticipantDepartments:[],
            recipientParticipantGroups:["Company Policy Survey Group"],
            recipientParticipantIndividualEmail:[],
        },
        {
            title:"Company Policy Survey Group",
            description:"This is a description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:1,
            participantDepartments:[
                {
                    label:"Human Resources",
                    value:1,
                    id:12
                },
                {
                    label:"Finance",
                    value:2,
                    id:13
                },
            ],
            participantGroups:[
                {
                    label:"Company Policy Survey Group",
                    value:1,
                    id:10
                },
                {
                    label:"Manager Performance Survey Group",
                    value:2,
                    id:11
                },
                {
                    label:"Network Performance Survey Group",
                    value:3,
                    id:12
                },
            ],
            participantIndividualEmail:[],
            recipientParticipantDepartments:[],
            recipientParticipantGroups:["Company Policy Survey Group"],
            recipientParticipantIndividualEmail:[],
        },
        {
            title:"Manager Performance Survey Group",
            description:"This is a description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:2,
            participantDepartments:[
                {
                    label:"Media",
                    value:3,
                    id:14
                },
                {
                    label:"Concierge",
                    value:4,
                    id:15
                }
            ],
            participantGroups:[],
            participantIndividualEmail:[],
            recipientParticipantDepartments:[],
            recipientParticipantGroups:["Company Policy Survey Group"],
            recipientParticipantIndividualEmail:[],
        },
        {
            title:"Network Performance Survey Group",
            description:"This is a description.",
            numberOfMembers:40,
            id:3,
            participantDepartments:[
                {
                    label:"Human Resources",
                    value:1,
                    id:12
                },
                {
                    label:"Media",
                    value:3,
                    id:14
                },
                {
                    label:"Concierge",
                    value:4,
                    id:15
                }
            ],
            participantGroups:[
                {
                    label:"Company Policy Survey Group",
                    value:1,
                    id:10
                },
                {
                    label:"Employee Work Life Balance Survey Group",
                    value:4,
                    id:13
                }
            ],
            participantIndividualEmail:["johndoe@email.co", "aceo@company.co"],
            recipientParticipantDepartments:["Human Resources", "Media"],
            recipientParticipantGroups:["Company Policy Survey Group"],
            recipientParticipantIndividualEmail:["johndoe@email.co", "hello@company.co"],
        },
    ])

    const [singleAudienceId,setSingleAudienceId] = useState()
    const [singleAudienceItem,setSingleAudienceItem] = useState()
    const [deleteModal, setDeleteModal] = useState(false)


    const deleteAudience = (id) => {
        console.log(id)
        const items = audienceCard;
        if (items.length > 0) {
            console.log(id)
          setAudienceCard(items.filter((item, index) => index !== id));
        }
        setDeleteModal(false)
    }

    const openPopulate = (audienceCardItem,i) => {
        setSingleAudienceItem(audienceCardItem)
        setSingleAudienceId(i)
        setOpenEditAudience(true)
    }

    // const openDeleteModal = (audienceCardItem,i) => {
    //     setSingleAudienceItem(audienceCardItem)
    //     setSingleAudienceId(i)
    //     setDeleteModal(true)
    // }

	const confirmDeleteAudience = (audienceCardItem,i) => {
        let title = audienceCardItem.title
        console.log(title)
		Swal.fire({
			icon: 'info',
			title: 'Do you want to delete \n this Audience ?',
			html:
                `<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${title}</span>.</h3>`,
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
                deleteAudience(i)
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
                {
                    audienceCard.length > 0 ? (
                        audienceCard?.map((audienceCardItem,i)=>(
                            <Cards className="mb-44 px-12 py-8">
                                <div className="flex justify-end">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="px-20 py-6 text-12"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={() => openPopulate(audienceCardItem,i)}
                                    >
                                        edit Group
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="px-20 py-6 text-12 bg-red-200 ml-10 cursor-pointer text-red-900"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => confirmDeleteAudience(audienceCardItem,i)}
                                        // onClick={() => openDeleteModal(audienceCardItem,i)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="py-10 w-8/12">
                                    <Link to={'employee-survey/single-audience/' + audienceCardItem?.id } className="text-black hover:no-underline">
                                        <h3 className="text-2xl p-4 pb-0 border-b-2 border-gray-A100 font-bold">   {audienceCardItem?.title}
                                        </h3>
                                    </Link>
                                    <h5 className="py-10 text-16 w-full">{audienceCardItem?.description}</h5>
                                    <p className="text-blue-400 cursor-pointer text-18">{audienceCardItem?.numberOfMembers} members in this group</p>
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
                {openEditAudience && <EditAudience setOpenEditAudience={setOpenEditAudience} openEditAudience={openEditAudience} singleAudienceItem={singleAudienceItem} setSingleAudienceItem={setSingleAudienceItem} singleAudienceId={singleAudienceId} setSingleAudienceId={setSingleAudienceId} />}

                {openCreateAudience && <CreateAudience setOpenCreateAudience={setOpenCreateAudience} audienceCard={audienceCard} />  }


        </>
    )
}

export default AudienceGroupIndexPage
