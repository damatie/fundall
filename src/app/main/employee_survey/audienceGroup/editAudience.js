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
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';



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

//////////////////////////////////////


// const group = [
//     {
//         label:"Company Policy Survey Group",
//         value:1,
//         id:10
//     },
//     {
//         label:"Manager Performance Survey Group",
//         value:2,
//         id:11
//     },
//     {
//         label:"Network Performance Survey Group",
//         value:3,
//         id:12
//     },
//     {
//         label:"Employee Work Life Balance Survey Group",
//         value:4,
//         id:13
//     }
// ]
//////////////////////////////////////


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



function EditAudience({openEditAudience,setOpenEditAudience,item,singleAudienceId,singleAudienceItem,setSingleAudienceItem}) {

    const [name, setName] = useState(singleAudienceItem?.title)
    const [description, setDescription] =  useState(singleAudienceItem?.description)
    const [departments, setDepartments] = useState(singleAudienceItem?.participantDepartments.map(singleDep => singleDep.id))
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [recipientDepartments, setRecipientDepartments] = useState(singleAudienceItem?.recipientParticipantDepartments)
    const [recipientPickedDepartments, setRecipientPickedDepartments] = useState([])
    const [recipientGroups, setRecipientGroups] = useState(singleAudienceItem?.recipientParticipantGroups)
    const [surveyParticipants, setSurveyParticipants] = useState(singleAudienceItem?.participantIndividualEmail)
    const [recipientSurveyParticipants, setRecipientSurveyParticipants] = useState(singleAudienceItem?.recipientParticipantIndividualEmail)
    const [individuals, setIndividuals] = useState("")
    const [recipientIndividuals, setRecipientIndividuals] = useState("")
    const [surveyFormData, setSurveyFormData] = useState({
        name,
        description,
        participantDepartments:departments,
        participantIndividualEmail:surveyParticipants
    })



    const handleName  = (e)  =>  {
        setSurveyFormData({...surveyFormData,name:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setSurveyFormData({...surveyFormData,description:e.target.value})
    }

    const handleChange = (event) => {
        setDepartments(event.target.value);
        setSurveyFormData({...surveyFormData, participantDepartments:event.target.value})
      };

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
            // newArr = [...surveyParticipants]
            setSurveyParticipants((prevState) => [...prevState, trimmedIndividualInput])
            // setSurveyParticipants(newArr)
            setSurveyFormData({...surveyFormData,participantIndividualEmail:([...surveyParticipants, trimmedIndividualInput])})
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



    return (
        <SideModal title="Audience/Groups" open={open} handleClose={() => setOpenEditAudience(false)} >
            <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Edit {singleAudienceItem?.title}</h3>
            <div className="bg-white w-11/12 mt-8 mx-auto shadow mb-56 rounded-20">
                <form className="p-28">
                    <TextField
                        label="Group Name"
                        id="outlined-margin-normal"
                        className="inline-block p-1 mb-24"
                        defaultValue={singleAudienceItem?.title}
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>handleName(e)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        defaultValue={singleAudienceItem?.description}
                        multiline
                        rows={4}
                        fullWidth
                        className="mb-16"
                        variant="outlined"
                        onChange={(e)=>handleDescription(e)}
                    />
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
                                            <MenuItem key={ag.id} value={ag.id}>{ag.label}</MenuItem>
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
                                    {departments.map((single,i) => {
                                        let deptChoices = ( department.find( ({ label,value,id }) => id === single ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{deptChoices?.label}</h5>
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
                    <div className="w-full flex items-center justify-center">
                        <SharedButton
                            variant="contained"
                            color="primary"
                            className="py-8 px-28 my-24 text-white font-normal"
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

export default EditAudience
