import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {Link} from "react-router-dom"
import { Redirect, useHistory } from "react-router"
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';
import { useAxiosGet } from '../hooks/useAxiosHook';
import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import Swal from 'sweetalert2';
import BtnLoader from '../utils/btnLoader';




function CreateAudience({ setOpenCreateAudience,audienceCard,setAudienceCard }) {

    const [name, setName] = useState("")
    const [description, setDescription] =  useState("")
    const [department,setDepartment] = useState([])
    const [departments, setDepartments] = useState([])
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [groups, setGroups] = useState([])
    const [audienceParticipants, setAudienceParticipants] = useState([])
    const [individuals, setIndividuals] = useState("")
    const [loadingDepartment, setLoadingDepartment] = useState(false)
    const [audienceFormData, setAudienceFormData] = useState({
        name:'',
        description:'',
        deptIds:[],
        emails:[]
    })

    useAxiosGet('department/all/1',setDepartment,setLoadingDepartment)
    const auth = useAuth


    const handleName  = (e)  =>  {
        setAudienceFormData({...audienceFormData,name:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setAudienceFormData({...audienceFormData,description:e.target.value})
    }

    const handleChange = (event) => {
        setDepartments(event.target.value);
        // setAudienceFormData({...audienceFormData, participantDepartments:event.target.value})
        setAudienceFormData({...audienceFormData, deptIds:event.target.value})
    };


    const handleChangeIndividuals = (e) => {
        setIndividuals(e.target.value)
    }

    const onKeyDownIndividuals = (e) => {
        const { keyCode }  =  e
        const trimmedIndividualInput = individuals.trim()

        if ( keyCode === 13 && trimmedIndividualInput.length && !audienceParticipants.includes(trimmedIndividualInput) ) {
            e.preventDefault()
            setAudienceParticipants((prevState) => [...prevState, trimmedIndividualInput])
            // setAudienceFormData({...audienceFormData,participantIndividualEmail:([...audienceParticipants,trimmedIndividualInput])})
            setAudienceFormData({...audienceFormData,emails:([...audienceParticipants,trimmedIndividualInput])})
            setIndividuals('')
        }
    }

    const deleteTag = (id) => {
        const items = audienceParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setAudienceParticipants(result)
            // setAudienceFormData({...audienceFormData,participantIndividualEmail:result})
            setAudienceFormData({...audienceFormData,emails:result})
        }
    }



    const history = useHistory()

    const [postAudience, setPostAudience] = useState(false)


    const submitAudienceForm  =   (e)  =>  {
        e.preventDefault();

        setPostAudience(true)
        
        // axios.post('https://vast-river-34476.herokuapp.com/https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup',audienceFormData,{headers: { Authorization: `JWT ${auth().getToken}` }}).then((response) => {
        axios.post('https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup',audienceFormData,{headers: { Authorization: `JWT ${auth().getToken}` }}).then((response) => {
            setPostAudience(false)
            console.log(response)
            const { success, message, token, data } = response.data;
            if (success) {
                let groupId = data.newGroup.id
                // setAudienceCard.push(...audienceCard,audienceFormData)
                Swal.fire({
                        title: 'Created Audience/Group Successfully',
                        text: message,
                        icon: 'success',
                        // timer: 3000,
                    })
                    .then((result)=>{
                        // console.log('result',result)
                            if(result.isConfirmed) {
                                history.push('/employee-survey/single-audience/' + groupId)
                            }
                    }
                    )
                    setOpenCreateAudience(false)
            } else {
                Swal.fire({
                    title: 'Sorry could not create Audience/Group',
                    text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                    icon: 'error',
                    timer: 3000,
                })
                setOpenCreateAudience(false)
            }
        }).catch(error => {
            Swal.fire({
                title: 'Sorry could not create Audience/Group',
                text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                icon: 'error',
                timer: 3000,
            })
            setOpenCreateAudience(false)
        });
        // window.location.reload()
        // setTimeout(()=>{window.location.reload()},0)
    }
    

    const closeCreateAudienceModal = () =>{
        setOpenCreateAudience(false)
    }

    function SubmitButton(){
        if (audienceFormData.name && audienceFormData.description){
          return (
            <SharedButton
                variant="contained"
                color="primary"
                className="py-8 px-44 my-24 mr-28 text-14 text-white font-normal"
                onClick={(e)=>submitAudienceForm(e)}
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



    return (
        <SideModal title="Create Audience" open={open} handleClose={()=>setOpenCreateAudience(false)}>
            <h3 className="pb-20 pt-16 w-11/12 mx-auto text-2xl font-bold">Create New Audience/Group</h3>
            <div className="bg-white w-11/12 mt-8 mx-auto shadow mb-56 rounded-20">
                <form className="p-28" >
                    <TextField
                        label="Group Name"
                        id="outlined-margin-normal"
                        defaultValue=""
                        className="inline-block p-1 mb-12"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>handleName(e)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        className="mb-12"
                        defaultValue=""
                        variant="outlined"
                        onChange={(e)=>handleDescription(e)}
                    />
                    <div className="pb-10">
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
                                {department.map((ag) => (
                                    <MenuItem key={ag.id} value={ag.id}>{ag.departmentName}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField id="outlined-basic" label="Individual's email" value={individuals} variant="outlined" onChange={handleChangeIndividuals} onKeyDown={onKeyDownIndividuals} fullWidth className="mb-24" />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8 font-bold">members</h4>
                            <div className="border-gray-400 border-1 px-16 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36 bg-grey-200">
                                <div className="flex flex-wrap">
                                    {departments.map((single,i) => {
                                        let deptChoices = ( department.find( ({ label,value,id }) => id === single ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{deptChoices.departmentName}</h5>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {audienceParticipants?.map((item,i)=>(
                                        <div key={i} className="flex text-white bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between">
                                            <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            <CloseRoundedIcon onClick={()=> deleteTag(i)} className="text-18 cursor-pointer font-semibold" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-start">
                        {postAudience ? <BtnLoader/> :<SubmitButton/> }
                        <Button
                            variant="contained"
                            className="py-8 px-44 my-24 text-black bg-gray-300 text-14 font-bold"
                            onClick={closeCreateAudienceModal}
                        >
                            cancel
                        </Button>
                    </div>
                </form>
            </div>
        </SideModal>
    )
}

export default CreateAudience
