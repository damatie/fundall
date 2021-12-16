import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';
import { useAxiosGet, useAxiosGetDept, useAxiosGetUpdate } from '../hooks/useAxiosHook';
import { useHistory, useParams } from 'react-router';
import { useAuth } from 'app/hooks/useAuth';
import axios from 'axios';
import BtnLoader from '../utils/btnLoader';
import Swal from 'sweetalert2';


// const department = [
//     {
//         label:"Human Resources",
//         value:1,
//         id:12
//     },
//     {
//         label:"Finance",
//         value:2,
//         id:13
//     },
//     {
//         label:"Media",
//         value:3,
//         id:14
//     },
//     {
//         label:"Concierge",
//         value:4,
//         id:15
//     }
// ]

function AddMembers({openAddMembers,setOpenAddMembers,clickedAudience,addInfo,setAddInfo}) {
    
    const [updateGroupData,setUpdateGroupData] = useState({
        existingGroupInfo:{
            description:'',
            groupId:null,
            groupName:'',
        },
        emailMembers:[],
        deptMembers:[]
    })
    
    const [loadingGroupData, setLoadingGroupData] = useState(false)
    // useAxiosGet(`surveyGroup/${singleAudienceId}`,setUpdateGroupData,setLoadingGroupData)
    const [name, setName] = useState(addInfo?.groupInfo?.groupName)
    const [description, setDescription] =  useState(addInfo?.groupInfo?.description)
    const [department,setDepartment] = useState([])
    const [departments, setDepartments] = useState(addInfo?.deptMembers?.map(singleDep => singleDep.deptId))
    const [surveyParticipants, setSurveyParticipants] = useState(addInfo?.emailMembers?.map(singleEmail => singleEmail.email))
    const [individuals, setIndividuals] = useState("")
    const [loadingEditDept, setLoadingEditDept] = useState()
    const [newUpdatedFormData, setNewUpdatedFormData] = useState({
        name,
        description,
        deptIds:departments,
        emails:surveyParticipants
    })
    // console.log(addInfo?.emailMembers.map((singleEmail) => console.log(singleEmail.email)))



    useAxiosGet('department/all/1',setDepartment,setLoadingEditDept)

    const handleName  = (e)  =>  {
        setNewUpdatedFormData({...newUpdatedFormData,name:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setNewUpdatedFormData({...newUpdatedFormData,description:e.target.value})
    }

    const handleChange = (event) => {
        setDepartments(event.target.value);
        // setSurveyFormData({...surveyFormData, participantDepartments:event.target.value})
        setNewUpdatedFormData({...newUpdatedFormData, deptIds:event.target.value})
    };

    const handleChangeIndividuals = (e) => {
        setIndividuals(e.target.value)
    }

    const onKeyDownIndividuals = (e) => {
        const { keyCode }  =  e
        const trimmedIndividualInput = individuals.trim()

        if ( keyCode === 13 && trimmedIndividualInput.length && !surveyParticipants.includes(trimmedIndividualInput) ) {
            e.preventDefault()
            setSurveyParticipants((prevState) => [...prevState, trimmedIndividualInput])
            setNewUpdatedFormData({...newUpdatedFormData,emails:([...surveyParticipants, trimmedIndividualInput])})
            setIndividuals('')
        }
    }

    const deleteTag = (id) => {
        const items = surveyParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setSurveyParticipants(result)
            setNewUpdatedFormData({...newUpdatedFormData,emails:result})
        }
    }

    const auth = useAuth        
    const history = useHistory()
    const [editAudience, setEditAudience] = useState(false)


    // console.log(addInfo)
    

    const submitUpdateGroupForm  = async (e)  =>  {
        e.preventDefault();
        setEditAudience(true)
        console.log(newUpdatedFormData)
        // ********************/
        try {
            const res = await axios.patch(
                        `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${addInfo?.groupInfo?.groupId}`,
                    newUpdatedFormData,
                            {headers: { Authorization: `JWT ${auth().getToken}` }
                        })
                        // .then((response) => {
                        // setEditAudience(false)
                        const { success, message, token, data } = res.data;
                        console.log(res)
                        if (success) {
                                Swal.fire({
                                    title: 'Edited Audience/Group Successfully',
                                    text: message,
                                    icon: 'success',
                                    // timer: 2000,
                                })
                                .then((result)=>{
                                    // console.log('result',result)
                                    if(result.isConfirmed) {
                                        history.push('/employee-survey')
                                        history.push(`/employee-survey/single-audience/${addInfo?.groupInfo?.groupId}`)
                                    }
                                    // if(result.isConfirmed) {
                                    //     history.push('/')
                                    // }
                                }
                                )
                                setOpenAddMembers(false)
                            } else {
                                Swal.fire({
                                    title: 'Sorry could not edit this Audience/Group',
                                    text: error.response?.data.error || error.response?.data.message,
                                    icon: 'error',
                                    timer: 3000,
                                })
                                setOpenAddMembers(false)
                        }
                    // .catch(error => {
                    //     Swal.fire({
                    //         title: 'Sorry could not create Audience/Group',
                    //         text: error.response?.data.error || error.response?.data.message,
                    //         icon: 'error',
                    //         timer: 3000,
                    //     })
                    //     setOpenEditAudience(false)
                    // });
                    // window.location.reload()
        } catch (error) {
            Swal.fire({
                title: 'Sorry could not edit Audience/Group',
                text: 'Check your internet connection',
                icon: 'error',
                timer: 3000,
            })
            setOpenAddMembers(false)
        }
        //****************** */

            // window.location.reload()
            // try {
            //     const resp = await axios.patch(
            //         `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${addInfo?.groupInfo?.groupId}`,
            //         newUpdatedFormData,
            //         {headers: { Authorization: `JWT ${auth().getToken}` }}
            //         );
            //         if(resp.status === 201) setOpenEditAudience(false)
            //         // console.log(response)
            //         window.location.reload()
            // } catch (err) {
            //     console.error(err);
            // }
    }


    function SubmitButton(){
        if (newUpdatedFormData.name && newUpdatedFormData.description){
          return (
            <SharedButton
                variant="contained"
                color="primary"
                className="py-8 px-28 my-24 text-white font-normal"
                onClick={(e)=>submitUpdateGroupForm(e)}
            >
                submit
            </SharedButton>
        )
        } else {
            return (
                <SharedButton
                        variant="contained"
                        color="primary"
                        className="py-8 px-44 my-24 mr-28 text-14 text-white font-normal"
                        disabled
                    >
                        submit
                </SharedButton>
        )};
      };

      
    //   console.log(addInfo)


    return (
        <SideModal title="Add Members" open={open} handleClose={() => setOpenAddMembers(false)}>
            <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Edit members for {addInfo?.groupInfo?.groupName}</h3>
            <div className='flex justify-between flex-wrap w-11/12 mx-auto space-x-40'>
                <div className='flex-1 mb-10 shadow-2 rounded-8 bg-white pt-32 pb-48 px-28'>
                    <h3 className='font-bold uppercase mb-12 text-20'>Group Name</h3>
                    <h4 className='text-20'>{addInfo?.groupInfo?.groupName}</h4>
                </div>
                <div className='flex-1 mb-10 shadow-2 rounded-8 bg-white pt-32 pb-48 px-28'>
                    <h3 className='font-bold uppercase mb-12 text-20'>Description</h3>
                    <h4 className='text-20'>{addInfo?.groupInfo?.description}</h4>
                </div>
            </div>
            <div className="bg-white w-11/12 mt-8 mx-auto shadow mb-56 rounded-20">
                <form className="p-28">
                    {/* <TextField
                        label="Group Name"
                        id="outlined-margin-normal"
                        className="inline-block p-1 mb-24"
                        defaultValue={addInfo?.groupInfo?.groupName}
                        variant="outlined"
                        fullWidth
                        name="name"
                        onChange={(e)=>handleName(e)}
                    />               
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        defaultValue={addInfo?.groupInfo?.description}
                        multiline
                        rows={4}
                        fullWidth
                        className="mb-16"
                        variant="outlined"
                        onChange={(e)=>handleDescription(e)}
                    /> */}
                    <div className="pb-10 border-gray-400 border-b-1 ">
                        <h4 className="text-14 text-grey-700 pb-4 font-bold border-gray-400 border-b-1">Fill in members you want to be in this group</h4>
                        <div className="w-full pt-16 flex items-center justify-between mb-16">
                            <FormControl className="w-full">
                                <InputLabel id="demo-group-name-label">Department</InputLabel>
                                <Select
                                    value={departments}
                                    onChange={handleChange}
                                    displayEmpty
                                    multiple
                                    className=""
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {department.map((ag) => {
                                        return (
                                            <MenuItem key={ag?.id} value={ag?.id}>{ag?.departmentName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField id="outlined-basic" label="Individual's email" value={individuals} variant="outlined" onChange={handleChangeIndividuals} onKeyDown={onKeyDownIndividuals} fullWidth className="mb-24" />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8 font-bold">members</h4>
                            <div className="border-gray-400 border-1 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                <div className="flex flex-wrap">
                                    {departments?.map((single,i) => {
                                        let deptChoices = ( department.find( ({ label,value,id }) => id === single ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{deptChoices?.departmentName}</h5>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {surveyParticipants?.map((item,i)=>(
                                        <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                            <h5 className='pr-12 text-14 font-semibold'>{item?.email ? item?.email : item}</h5>
                                            <CloseRoundedIcon onClick={()=> deleteTag(i)} className="text-18 cursor-pointer font-semibold" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {editAudience ? <BtnLoader/> : <SubmitButton/>}
                    </div>
                </form>
            </div>
        </SideModal>
    )
}

export default AddMembers


