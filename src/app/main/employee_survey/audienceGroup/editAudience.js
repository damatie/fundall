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



function EditAudience({openEditAudience,setOpenEditAudience,item,singleAudienceId,singleAudienceItem,setSingleAudienceItem}) {

    const [name, setName] = useState(singleAudienceItem?.title)
    const [description, setDescription] =  useState(singleAudienceItem?.description)
    const [departments, setDepartments] = useState(singleAudienceItem?.participantDepartments)
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [recipientDepartments, setRecipientDepartments] = useState(singleAudienceItem?.recipientParticipantDepartments)
    const [recipientPickedDepartments, setRecipientPickedDepartments] = useState([])
    const [groups, setGroups] = useState(singleAudienceItem?.participantGroups)
    const [recipientGroups, setRecipientGroups] = useState(singleAudienceItem?.recipientParticipantGroups)
    const [surveyParticipants, setSurveyParticipants] = useState(singleAudienceItem?.participantIndividualEmail)
    const [recipientSurveyParticipants, setRecipientSurveyParticipants] = useState(singleAudienceItem?.recipientParticipantIndividualEmail)
    const [individuals, setIndividuals] = useState("")
    const [recipientIndividuals, setRecipientIndividuals] = useState("")
    const [surveyFormData, setSurveyFormData] = useState({
        name,
        description,
        participantDepartments:departments,
        participantGroups:groups,
        participantIndividualEmail:surveyParticipants,
        reportingDepartments:recipientDepartments,
        reportingGroups: recipientGroups,
        reportingIndividualEmail:recipientSurveyParticipants
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
        <div className="fixed top-0 right-0 w-full h-full overflow-y-hidden bg-opacity-75 bg-black">
            <div className="bg-white pb-48 flex-col overflow-y-scroll flex h-full right-0 top-10 absolute w-7/12 pt-64">
                <div className="bg-blue-900 text-3xl text-white flex justify-between items-center p-20">
                    <h3 className="text-2xl">Audience/Groups</h3>
                    <CloseRoundedIcon className="cursor-pointer" onClick={() => setOpenEditAudience(false)} />
                </div>
                <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Edit {singleAudienceItem?.title}</h3>
                <div className="bg-white w-11/12 mt-8 mx-auto shadow-2xl rounded-20">
                    <form className=" p-28 rounded-lg" >
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
                            <h4 className="text-14 text-grey-700 pb-4 mb-6 font-semibold border-gray-400 border-b-1 ">Who do you intend to send this survey to?</h4>
                            <div className="w-full flex items-center justify-between mb-16">
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
                                <h4 className="capitalize text-14 text-grey-700 pb-8">survey participants</h4>
                                <div className="border-gray-400 border-1 px-16 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                    <div className="flex flex-wrap">
                                        {departments?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
                                                <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {groups?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
                                                <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {surveyParticipants?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
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
                                <FormControl className="w-1/3">
                                    <InputLabel id="response-dept-label">Departments</InputLabel>
                                    <Select
                                    labelId="response-dept-label"
                                    id="response-dept-label"
                                    multiple
                                    value={recipientDepartments}
                                    onChange={handleChangeRecipient}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    div
                                    >
                                    {recipientDepartment.map((dept) => (
                                        <MenuItem key={dept} value={dept}>
                                            <Checkbox checked={recipientDepartments.indexOf(dept) > -1} />
                                            <ListItemText primary={dept} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="w-1/3">
                                    <InputLabel id="group-label">Groups</InputLabel>
                                    <Select
                                    labelId="group-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={recipientGroups}
                                    onChange={handleChangeGroupRecipient}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    div
                                    >
                                    {recipientGroup.map((groupItem) => (
                                        <MenuItem key={groupItem} value={groupItem}>
                                            <Checkbox checked={recipientGroups.indexOf(groupItem) > -1} />
                                            <ListItemText primary={groupItem} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField id="outlined-basic" label="Individual's email" value={recipientIndividuals} variant="outlined" onChange={handleChangeIndividualsRecipient} onKeyDown={onKeyDownIndividualsRecipient} fullWidth className="mb-24" />
                            <div className="">
                                <h4 className="capitalize text-14 text-grey-700 pb-8">survey participants</h4>
                                <div className="border-gray-400 border-1 px-16 py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                    <div className="flex flex-wrap">
                                        {recipientDepartments?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
                                                <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {recipientGroups?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
                                                <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {recipientSurveyParticipants?.map((item,i)=>(
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-gray-100">
                                                <h5 className='pr-12 text-14 font-semibold'>{item}</h5>
                                                <CloseRoundedIcon onClick={()=> deleteTagRecipient(i)} className="text-18 cursor-pointer font-semibold" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <Button
                                variant="contained"
                                className="py-8 px-44 my-24 bg-blue-900 text-16 text-white font-normal"
                                onClick={(e)=>submitSurveyForm(e)}
                            >
                                submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditAudience
