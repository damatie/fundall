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
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';



const department = [
    "Human Resources",
    "Finance",
    "Media",
    "Concierge"
];

const group = [
    "Company Policy Survey Group",
    "Manager Performance Survey Group",
    "Network Performance Survey Group",
    "Employee Work Life Balance Survey Group",
]


const recipientDepartment = [
    "Human Resources",
    "Finance",
    "Media",
    "Concierge"
];

const recipientGroup = [
    "Company Policy Survey Group",
    "Manager Performance Survey Group",
    "Network Performance Survey Group",
    "Employee Work Life Balance Survey Group",
]

function CreateAudience({ setOpenCreateAudience }) {

    const [name, setName] = useState("")
    const [description, setDescription] =  useState("")
    const [departments, setDepartments] = useState([])
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [groups, setGroups] = useState([])
    const [audienceParticipants, setAudienceParticipants] = useState([])
    const [individuals, setIndividuals] = useState("")
    const [audienceFormData, setAudienceFormData] = useState({
        name:'',
        description:'',
        participantDepartments:[],
        participantGroups: [],
        participantIndividualEmail:[],
    })



    const handleName  = (e)  =>  {
        setAudienceFormData({...audienceFormData,name:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setAudienceFormData({...audienceFormData,description:e.target.value})
    }

    const handleChange = (event) => {
        setDepartments(event.target.value);
        setAudienceFormData({...audienceFormData, participantDepartments:event.target.value})
      };

    const handleChangeGroup = (event) => {
        setGroups(event.target.value)
        setAudienceFormData({...audienceFormData,participantGroups:event.target.value})
    }

    const handleChangeIndividuals = (e) => {
        setIndividuals(e.target.value)
    }

    const onKeyDownIndividuals = (e) => {
        const { keyCode }  =  e
        const trimmedIndividualInput = individuals.trim()

        if ( keyCode === 13 && trimmedIndividualInput.length && !audienceParticipants.includes(trimmedIndividualInput) ) {
            e.preventDefault()
            setAudienceParticipants((prevState) => [...prevState, trimmedIndividualInput])
            setAudienceFormData({...audienceFormData,participantIndividualEmail:([...audienceParticipants,trimmedIndividualInput])})
            setIndividuals('')
        }
    }

    const deleteTag = (id) => {
        const items = audienceParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setAudienceParticipants(result)
            setAudienceFormData({...audienceFormData,participantIndividualEmail:result})
        }
    }

    const submitAudienceForm  =   (e)  =>  {
        e.preventDefault();
        console.log(audienceFormData)
        // closeCreateAudienceModal()
    }

    const closeCreateAudienceModal = () =>{
        setOpenCreateAudience(false)
    }


    return (
        <SideModal title="Create Audience" open={open} handleClose={()=>setOpenCreateAudience(false)}>
            <h3 className="pb-20 pt-16 w-11/12 mx-auto text-2xl font-bold">Create New Audience/Groups</h3>
            <div className="bg-white w-11/12 mt-8 mx-auto shadow mb-56 rounded-20">
                <form className="p-28" >
                    <TextField
                        label="Group Name"
                        id="outlined-margin-normal"
                        defaultValue=""
                        className="inline-block p-1 mb-24"
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
                        className="mb-16"
                        defaultValue=""
                        variant="outlined"
                        onChange={(e)=>handleDescription(e)}
                    />
                    <div className="pb-10">
                        <h4 className="text-14 text-grey-700 pb-4 font-bold border-gray-400 border-b-1">Fill in members you want to be in this group</h4>
                        <div className="w-full pt-16 flex items-center justify-between mb-16">
                            <FormControl className="w-1/3">
                                <InputLabel id="demo-group-name-label">Department</InputLabel>
                                <Select
                                labelId="demo-group-name-label"
                                id="demo-mutiple-name"
                                multiple
                                value={departments}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                div
                                >
                                {department.map((dept) => (
                                    <MenuItem key={dept} value={dept}>
                                        <Checkbox checked={departments.indexOf(dept) > -1} />
                                        <ListItemText primary={dept} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl className="w-1/3">
                                <InputLabel id="group-label">Groups</InputLabel>
                                <Select
                                labelId="group-label"
                                id="demo-group-checkbox"
                                multiple
                                value={groups}
                                onChange={handleChangeGroup}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                div
                                >
                                {group.map((groupItem) => (
                                    <MenuItem key={groupItem} value={groupItem}>
                                    <Checkbox checked={groups.indexOf(groupItem) > -1} />
                                    <ListItemText primary={groupItem} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField id="outlined-basic" label="Individual's email" value={individuals} variant="outlined" onChange={handleChangeIndividuals} onKeyDown={onKeyDownIndividuals} fullWidth className="mb-24" />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8 font-bold">members</h4>
                            <div className="border-gray-400 border-1 px-16 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                <div className="flex flex-wrap">
                                    {departments?.map((item,i)=>(
                                        <div key={i} className="flex text-white bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between">
                                            <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap">
                                    {groups?.map((item,i)=>(
                                        <div key={i} className="flex text-white bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between">
                                            <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                        </div>
                                    ))}
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
                        <SharedButton variant="contained" color="primary" type="submit" 
                            className="py-8 px-44 my-24 mr-28 text-14 font-bold"
                            onClick={(e)=>submitAudienceForm(e)}
                        >
                        Submit
                        </SharedButton>
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
