import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Button, Paper } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from 'react-select'
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {Link} from "react-router-dom"
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';



const department = [
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
];

const group = [
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
]

const recipientGroup = [
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
]



function CreateSurvey({setCreateSurveyModal,setSurveyCard,surveyCard}) {

    const [name, setName] = useState("")
    const [description, setDescription] =  useState("")
    const [departments, setDepartments] = useState([])
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [recipientDepartments, setRecipientDepartments] = useState([])
    const [recipientPickedDepartments, setRecipientPickedDepartments] = useState([])
    const [groups, setGroups] = useState([])
    const [recipientGroups, setRecipientGroups] = useState([])
    const [surveyParticipants, setSurveyParticipants] = useState([])
    const [recipientSurveyParticipants, setRecipientSurveyParticipants] = useState([])
    const [individuals, setIndividuals] = useState("")
    const [recipientIndividuals, setRecipientIndividuals] = useState("")
    const [listOfDepartments,setListOfDepartments] = useState([])
    const [surveyFormData, setSurveyFormData] = useState({
        name:'',
        description:'',
        participantDepartments:[],
        participantGroups: [],
        participantIndividualEmail:[],
        reportingGroups: [],
        reportingIndividualEmail:[],
    })



    const handleName  = (e)  =>  {
        setSurveyFormData({...surveyFormData,name:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setSurveyFormData({...surveyFormData,description:e.target.value})
    }


    const handleChangeRecipient = (event) => {
        setRecipientDepartments(event.target.value)
        setRecipientPickedDepartments(event.target.value)
        setSurveyFormData({...surveyFormData,reportingDepartments:event.target.value})
    }

    const handleChangeGroup = (event) => {
        setGroups(event.target.value)
        setSurveyFormData({...surveyFormData,participantGroups:event.target.value})
    }

    const handleChangeGroupRecipient = (event) => {
        setRecipientGroups(event.target.value)
        setSurveyFormData({...surveyFormData,reportingGroups:event.target.value})
    }

    const handleChangeIndividualsRecipient = (e) => {
        setRecipientIndividuals(e.target.value)
    }


    const onKeyDownIndividualsRecipient = (e) => {
        const { keyCode }  =  e
        const trimmedIndividualInput = recipientIndividuals.trim()

        if ( keyCode === 13 && trimmedIndividualInput.length && !recipientSurveyParticipants.includes(trimmedIndividualInput) ) {
            e.preventDefault()
            setRecipientSurveyParticipants((prevState) => [...prevState, trimmedIndividualInput])
            setSurveyFormData({...surveyFormData,reportingIndividualEmail:([...recipientSurveyParticipants,trimmedIndividualInput])})
            setRecipientIndividuals('')
        }
    }

    const deleteTagRecipient = (id) => {
        const items = recipientSurveyParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setRecipientSurveyParticipants(result)
            setSurveyFormData({...surveyFormData,reportingIndividualEmail:result})
        }
    }



    const handleChangeIndividuals = (e) => {
        setIndividuals(e.target.value)
    }

    const onKeyDownIndividuals = (e) => {
        const { keyCode }  =  e
        const trimmedIndividualInput = individuals.trim()

        if ( keyCode === 13 && trimmedIndividualInput.length && !surveyParticipants.includes(trimmedIndividualInput) ) {
            e.preventDefault()
            setSurveyParticipants((prevState) => [...prevState, trimmedIndividualInput])
            setSurveyFormData({...surveyFormData,participantIndividualEmail:([...surveyParticipants,trimmedIndividualInput])})
            setIndividuals('')
        }
    }

    const deleteTag = (id) => {
        const items = surveyParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setSurveyParticipants(result)
            setSurveyFormData({...surveyFormData,participantIndividualEmail:result})
        }
    }

    const submitSurveyForm  =   (e)  =>  {
        e.preventDefault();
        console.log(surveyFormData)
    }



    const handleChangeDepartments = (event) => {
      setDepartments(event.target.value);
      setSurveyFormData({...surveyFormData,participantDepartments:event.target.value})
    };




    return (
        <SideModal title="Create Survey" open={open} handleClose={()=>setCreateSurveyModal(false)}>
            <div className="h-full w-11/12 mt-8 mx-auto">
                <form className=" p-28 rounded-lg" >
                    <TextField
                        label="Survey Name"
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
                    <div className="pb-10 border-gray-400 border-b-1 ">
                        <h4 className="text-14 text-grey-700 pb-4 mb-6 font-semibold border-gray-400 border-b-1 ">Who do you intend to send this survey to?</h4>
                        <div className="w-full flex items-center justify-between mb-16">
                            <FormControl className="w-1/3">
                                <InputLabel id="demo-group-name-label">Department</InputLabel>
                                <Select
                                    value={departments}
                                    onChange={handleChangeDepartments}
                                    displayEmpty
                                    multiple
                                    className=""
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                {department.map((ag) => (
                                    <MenuItem key={ag.id} value={ag.id}>{ag.label}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl className="w-1/3">
                                <InputLabel id="group-label">Groups</InputLabel>
                                <Select
                                    value={groups}
                                    onChange={handleChangeGroup}
                                    displayEmpty
                                    multiple
                                    className=""
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                {group.map((groupItem) => (
                                    <MenuItem key={groupItem.id} value={groupItem.id}>
                                        {groupItem.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField id="outlined-basic" label="Individual's email" value={individuals} variant="outlined" onChange={handleChangeIndividuals} onKeyDown={onKeyDownIndividuals} fullWidth className="mb-24" />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8">survey participants</h4>
                            <div className="border-gray-400 border-1  py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                <div className="flex flex-wrap">
                                    {departments.map((single,i) => {
                                        let deptChoices = ( department.find( ({ label,value,id }) => id === single ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{deptChoices.label}</h5>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {groups?.map((item,i)=> {
                                        let groupChoices = (group.find(({ label,value,id }) => id === item ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{groupChoices.label}</h5>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {surveyParticipants?.map((item,i)=>(
                                        <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                            <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            <CloseRoundedIcon onClick={()=> deleteTag(i)} className="text-18 cursor-pointer font-semibold" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-10 mt-24">
                        <h4 className="text-14 text-grey-700 pb-4 mb-6 font-semibold border-gray-400 border-b-1 ">Who can see response/reporting?</h4>
                        <div className="w-full flex items-center justify-between mb-16">
                            <FormControl className="w-full">
                                <InputLabel id="group-label">Groups</InputLabel>
                                <Select
                                multiple
                                value={recipientGroups}
                                onChange={handleChangeGroupRecipient}
                                >
                                {recipientGroup.map((groupItem) => (
                                    <MenuItem key={groupItem.id} value={groupItem.id}>
                                        {groupItem.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField id="outlined-basic" label="Individual's email" value={recipientIndividuals} variant="outlined" onChange={handleChangeIndividualsRecipient} onKeyDown={onKeyDownIndividualsRecipient} fullWidth className="mb-24" />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8">survey participants</h4>
                            <div className="border-gray-400 border-1 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                <div className="flex flex-wrap">
                                    {recipientGroups?.map((item,i)=> {
                                        let recipientGroupChoices = (recipientGroup.find(({ label,value,id }) => id === item ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{recipientGroupChoices.label}</h5>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {recipientSurveyParticipants?.map((item,i)=>(
                                        <div key={i} className="flex bg-blue-500 text-white my-8 mx-8 rounded-md px-12 py-6 items-center justify-between">
                                            <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            <CloseRoundedIcon onClick={()=> deleteTagRecipient(i)} className="text-18 cursor-pointer font-semibold" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <SharedButton
                            variant="contained"
                            color="primary"
                            className="py-8 px-44 my-24 text-14 text-white font-normal"
                            onClick={(e)=>submitSurveyForm(e)}
                        >
                            submit
                        </SharedButton>
                    </div>
                </form>
            </div>
        </SideModal>
    )
}

export default CreateSurvey
