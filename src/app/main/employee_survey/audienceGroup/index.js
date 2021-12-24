import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Cards from 'app/shared/cards/cards'
import { Link } from 'react-router-dom';
import EditAudience from './editAudience';
import CreateAudience from './createAudience';
import Swal from 'sweetalert2';
import { useAxiosGet, useAxiosGetAll, useAxiosGetGroup } from '../hooks/useAxiosHook';
// import Pagination from '@material-ui/lab/Pagination';
// import PaginationItem from '@material-ui/lab/PaginationItem';
import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import AudienceCardLoader from '../utils/audienceCardLoader';
import Pagination from '../shared/pagination';
import BtnLoader from '../utils/btnLoader';
import { CircularProgress } from '@material-ui/core';
import { Redirect, useHistory } from "react-router"
import DeleteLoadingScreen from '../utils/deleteLoadingScreen';

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

    const history = useHistory()
    const [deleteAudienceGroup,setDeleteAudienceGroup] = useState(false)

    const deleteAudience = (i,id) => {
        const items = audienceCard;
        if (items.length > 0) {
            //   setAudienceCard(items.filter((item, index) => index !== i));
            //   axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${id}`,
            //   {headers: { Authorization: `JWT ${auth().getToken}` }} )
            //   .then(data => console.log(data))
            //   .catch(e => console.error(e));
            // setDeleteAudienceGroup(true)
            axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${id}`,
          {headers: { Authorization: `JWT ${auth().getToken}` }} ).then((response) => {
              // setPostAudience(false)
              setDeleteAudienceGroup(false)
              const { success, message, token, data } = response.data;
              if (success) {
                  setAudienceCard(items.filter((item, index) => index !== i));
                  Swal.fire({
                        title: 'Deleted Audience/Group Successfully',
                        text: message,
                        icon: 'success',
                        // timer: 3000,
                    })
                    // .then((result)=>{
                    //     setAudienceCard(items.filter((item, index) => index !== i));
                    //     // console.log('result',result)
                    //     if(result.isConfirmed) {
                    //         history.push('/')
                    //         history.push('/employee-survey')
                    //         // return <Redirect to='/' />
                    //     }
                    // }
                    // )
                    // setOpenCreateAudience(false)
            } else {
                Swal.fire({
                    title: 'Sorry could not delete Audience/Group',
                    text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                    icon: 'error',
                    // timer: 3000,
                })
                // setOpenCreateAudience(false)
            }
            }).catch(error => {
            Swal.fire({
                title: 'Sorry could not delete Audience/Group',
                text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                icon: 'error',
                timer: 3000,
            })
            // setOpenCreateAudience(false)
        });
        }
        setDeleteModal(false)
    }

    // LOADING EDIT INFO
    const [loadingEditInfo, setLoadingEditInfo] = useState(false)
    const auth = useAuth
    // Uncomment when done
    // const openPopulate = (audienceCardItem,i) => {
    //     setSingleAudienceItem(audienceCardItem)
    //     setSingleAudienceId(i)
    //     setLoadingEditInfo(true)
    //     // axios.get( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${i}`,
    //     //         {headers: { Authorization: `JWT ${auth().getToken}` }} )
    //     //         .then(data => {
    //     //             console.log(data)
    //     //             setLoadingEditInfo(false)
    //     //             if(data.data.status === 200) setTestData(data.data.data)
    //     //             setOpenEditAudience(true)
    //     //         })
    //     //         .catch(e => console.error(e));

    //     axios.get(
    //          `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${i}`,
    //          {headers: { Authorization: `JWT ${auth().getToken}` }} )
    //          .then((response) => {
    //         setLoadingEditInfo(false)
    //         const { success, message, token, data } = response.data;
    //         if (success) {
    //                 Swal.fire({
    //                     title: 'Opened Edit form Successfully',
    //                     text: message,
    //                     icon: 'success',
    //                     timer: 2000,
    //                 })
    //                 setTestData(response.data.data)
    //                 setOpenEditAudience(true)
    //                 // setOpenCreateAudience(false)
    //         } else {
    //             Swal.fire({
    //                 title: 'Sorry could not open an edit form for this Audience/Group',
    //                 text: 'Check your internet connection',
    //                 icon: 'error',
    //                 timer: 2000,
    //             })
    //             // setOpenCreateAudience(false)
    //         }
    //     }).catch(error => {
    //         Swal.fire({
    //             title: 'Sorry could not open an edit form for this Audience/Group',
    //             text: error.response?.data.error || error.response?.data.message,
    //             icon: 'error',
    //             timer: 2000,
    //         })
    //         // setOpenCreateAudience(false)
    //     });
    // }
    // Uncomment when done
    ///////////////////////
    const openPopulate = (audienceCardItem,i) => {
        setSingleAudienceItem(audienceCardItem)
        setSingleAudienceId(i)
        setLoadingEditInfo(true)
        let name = audienceCardItem.name
        Swal.fire({
            title:`<h3 class="py-20">Click on open to proceed to edit this ${name}</h3>`,
            showCancelButton: true,
            confirmButtonText: 'Open',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return axios.get(`https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${i}`,
                            {headers: { Authorization: `JWT ${auth().getToken}` }} )
                            .then((response) => {
                             setLoadingEditInfo(false)
                            const { success, message, token, data } = response.data;
                            if (success) {
                                // Swal.fire({
                                //     title: `Opened edit form for ${name} successfully`,
                                //     text: message,
                                //     icon: 'success',
                                //     timer: 2000,
                                // })
                                setTestData(response.data.data)
                                setOpenEditAudience(true)
                            } else {
                                Swal.fire({
                                    title: 'Sorry could not open the edit form for ${name}',
                                    text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                                    icon: 'error',
                                    timer: 3000,
                                })
                            }
                            })
                            .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                            })
            },
            ////////////////////////
            allowOutsideClick: () => !Swal.isLoading()
          })
        //********************************** */
    }
    //////////////////////

// Edited
// useAxiosGet('surveyGroup',setAudienceCard,setLoadingAudienceCard)
    // const [loadingAudienceCard, setLoadingAudienceCard] = useState(false)
    const [page,setPage] = useState(0)
    const [noOfPages, setNoOfPages] = useState(0)

    // const auth = useAuth


    const handleChange = (event,value) => {
        setPage(value - 1)
    }
    // useAxiosGetAll(`surveyGroup?page=${page}`,setAudienceCard,page,setLoadingAudienceCard,setNoOfPages)
    // Edited
    const [currentPage, setCurrentPage] = useState(1)
    const [audienceCardPerPage, setAudienceCardPerPage] = useState(10)
    const [clicked, setClicked] = useState(false)

    const indexOfLastPost = currentPage * audienceCardPerPage;
    const indexOfFirstPost = indexOfLastPost - audienceCardPerPage;
    const currentPosts = audienceCard?.slice(indexOfFirstPost,indexOfLastPost)

    useAxiosGetGroup('surveyGroup',setAudienceCard,setLoadingAudienceCard)
    // console.log(audienceCard)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        setClicked(true)
    }
    
	// const confirmDeleteAudience = (audienceCardItem,i,id) => {
    //     let name = audienceCardItem.name
	// 	Swal.fire({
	// 		icon: 'info',
	// 		title: 'Do you want to delete \n this Audience ?',
	// 		html:
    //             `<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
	// 		showConfirmButton: true,
	// 		showCancelButton: true,
	// 		confirmButtonText: `CONTINUE`,
	// 		confirmButtonColor: '#19AC4B',
	// 		cancelButtonColor: '#FA1C1C',
	// 		customClass: {
	// 			cancelButton: 'kpo-custom-swal-btn',
	// 			confirmButton: 'kpo-custom-swal-btn',
	// 			title: 'kpo-custom-swal-title',
	// 			popup: 'kpo-custom-swal-popup',
	// 			icon: 'kpo-custom-swal-icon'
	// 		}
	// 	}).then(result => {
    //         // setDeleteAudienceGroup(true)
    //         console.log('i',i)
    //         console.log('id',id)
	// 		if (result.isConfirmed) {
    //             deleteAudience(i,id)
	// 		}
	// 	});
	// };
	const confirmDeleteAudience = (audienceCardItem,i,id) => {
        const items = audienceCard;
        let name = audienceCardItem.name
        Swal.fire({
            title:`<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
            // html:
            //     `<h3 class="py-20">Note that by clicking on continue, you will delete <span class="font-bold">${name}</span>.</h3>`,
            // input: 'text',
            // inputAttributes: {
            //   autocapitalize: 'off'
            // },
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return   axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${id}`,
              {headers: { Authorization: `JWT ${auth().getToken}` }} ).then((response) => {
                  // setPostAudience(false)
                  const { success, message, token, data } = response.data;
                  if (success) {
                    if (items.length > 0) {
                      setAudienceCard(items.filter((item, index) => index !== i));
                    }
                    Swal.fire({
                        title: 'Deleted Audience/Group Successfully',
                        text: message,
                        icon: 'success',
                        timer: 3000,
                    })
                } else {
                    Swal.fire({
                        title: 'Sorry could not delete Audience/Group',
                        text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                        icon: 'error',
                        timer: 3000,
                    })
                }
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            ////////////////////////
            allowOutsideClick: () => !Swal.isLoading()
          })
	};

    // console.log('audience card',audienceCard)
    // console.log(deleteAudienceGroup)

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
                {/* <div className="w-full flex items-center justify-center my-28 py-28">
                    <Pagination count={Math.ceil((noOfPages / 10))} color="primary" size="large" onChange={handleChange}  />
                </div> */}
                    {/* <div className="w-full flex items-center justify-center my-28 py-28">
                        <Pagination postsPerPage={audienceCardPerPage} totalCards={audienceCard?.length} paginate={paginate} clicked={clicked} />
                    </div> */}
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
                    audienceCard?.length ? (
                        audienceCard?.sort((a,b) => (new Date(b?.createdAt) - (new Date(a?.createdAt)) ))?.map((audienceCardItem,i)=>(
                            <Cards className="mb-44 px-12 py-8" key={audienceCardItem?.id}>
                                <div className='flex justify-end space-x-8'>
                                    <button
                                        className="bg-blue-200 text-blue-700 cursor-pointer rounded-sm py-4 px-6"
                                        onClick={() => openPopulate(audienceCardItem,audienceCardItem?.id)}
                                    >
                                        <EditIcon  className="text-18" />
                                    </button>
                                    <button
                                        className="bg-red-200 cursor-pointer rounded-sm py-4 px-6 text-red-700"
                                        onClick={() => confirmDeleteAudience(audienceCardItem,i,audienceCardItem?.id)}
                                    >
                                        <DeleteIcon className='text-18' />
                                    </button>
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
                {
                    openEditAudience && <EditAudience 
                                            setOpenEditAudience={setOpenEditAudience}
                                            openEditAudience={openEditAudience}
                                            testData={testData}
                                            setTestData={setTestData}
                                            singleAudienceItem={singleAudienceItem} 
                                            setSingleAudienceItem={setSingleAudienceItem} 
                                            singleAudienceId={singleAudienceId} 
                                            setSingleAudienceId={setSingleAudienceId} 
                                        />
                }

                {openCreateAudience && <CreateAudience setOpenCreateAudience={setOpenCreateAudience} audienceCard={audienceCard} setAudienceCard={setAudienceCard} /> }

                {/* {deleteAudienceGroup && <DeleteLoadingScreen setDeleteAudienceGroup={setDeleteAudienceGroup} deleteAudienceGroup={deleteAudienceGroup} />} */}


        </>
    )
}

export default AudienceGroupIndexPage
