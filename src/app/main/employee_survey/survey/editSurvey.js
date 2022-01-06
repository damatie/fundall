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
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';
import { useAxiosGet, useAxiosGetAll, useAxiosGetGroup } from '../hooks/useAxiosHook';
import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl'
import { useAuth } from 'app/hooks/useAuth'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import SingleAudienceLoader from '../utils/singleAudienceLoader';
import * as createSurveyActions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ProgressBtn from 'app/shared/progressBtn';
import BtnLoader from '../utils/btnLoader';









function EditSurvey({setSurveyCard,surveyCard,setOpenSurvey,testData,singleSurvey,singleSurveyId}) {

    // console.log(testData)
    const [name, setName] = useState(testData?.surveyInfo?.title)
    const [description, setDescription] =  useState(testData?.surveyInfo?.description)
    // const [departments, setDepartments] = useState([])
    const [departments, setDepartments] = useState(testData?.surveyRecipients?.deptRecipients?.map(singleDep => singleDep.department.id))
    // const [reDepts, setReDepts] = useState([])
    const [reDepts, setReDepts] = useState(testData?.authorizedViewers?.deptViewers?.map(singleDep => singleDep.departmentId))
    const [pickedDepartments, setPickedDepartments] = useState([])
    const [recipientDepartments, setRecipientDepartments] = useState([])
    const [recipientPickedDepartments, setRecipientPickedDepartments] = useState([])
    const [groups, setGroups] = useState(testData?.surveyRecipients?.groupRecipients?.map(singleDep => singleDep.surveyGroup?.id))
    // const [groups, setGroups] = useState([])
    const [recipientGroups, setRecipientGroups] = useState([])
    // const [surveyParticipants, setSurveyParticipants] = useState([])
    const [surveyParticipants, setSurveyParticipants] = useState(testData?.surveyRecipients?.emailRecipients?.map(singleEmail => singleEmail.email))
    const [recipientSurveyParticipants, setRecipientSurveyParticipants] = useState(testData?.authorizedViewers?.emailViewers?.map(singleEmail => singleEmail.email))
    // const [recipientSurveyParticipants, setRecipientSurveyParticipants] = useState([])
    const [individuals, setIndividuals] = useState("")
    const [recipientIndividuals, setRecipientIndividuals] = useState("")
    const [listOfDepartments,setListOfDepartments] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingGroup, setLoadingGroup] = useState(false)
    const [loadingDept, setLoadingDept] = useState(false)
    const [dept,setDept] = useState([])
    const [recipientDept,setRecipientDept] = useState([])
    const [group,setGroup] = useState([])
    const [surveyFormData, setSurveyFormData] = useState({
        title:name,
        description,
        departmentIds:departments,
        groupIds:groups,
        emails:surveyParticipants,
        authorizedViewersDeptIds:reDepts,
        authorizedViewersEmails:recipientSurveyParticipants
    })

    const [loadingSelectGroup, setLoadingSelectGroup] = useState(false)
    const [page,setPage] = useState(0)
    const [noOfPages, setNoOfPages] = useState(0)

    useAxiosGet('department/all/1',setDept,setLoadingDept)
    useAxiosGet('department/all/1',setRecipientDept,setLoadingDept)
    useAxiosGetGroup('surveyGroup',setGroup,setLoadingGroup)
    // useAxiosGetAll(`surveyGroup?page=${page}`,setGroup,page,setLoadingSelectGroup,setNoOfPages)
    // console.log(group)
        // const [loadingAudienceCard, setLoadingAudienceCard] = useState(false)
    
        // const auth = useAuth
    
    
        const handleChange = (event,value) => {
            setPage(value - 1)
        }

    const [errorName, setErrorName] = useState(false)

    const handleName  = (e)  =>  {
        setSurveyFormData({...surveyFormData,title:e.target.value})
    }

    const handleDescription  = (e)  =>  {
        setSurveyFormData({...surveyFormData,description:e.target.value})
    }

    // const handleChangeRecipient = (event) => {
    //     setRecipientDepartments(event.target.value)
    //     setRecipientPickedDepartments(event.target.value)
    //     setSurveyFormData({...surveyFormData,reportingDepartments:event.target.value})
    // }

    const handleChangeGroup = (event) => {
        setGroups(event.target.value)
        // setSurveyFormData({...surveyFormData,participantGroups:event.target.value})
        // setSurveyFormData({...surveyFormData,addGroups:event.target.value})
        setSurveyFormData({...surveyFormData,groupIds:event.target.value})
    }

    const handleChangeDepartmentRecipient = (event) => {
        // setRecipientGroups(event.target.value)
        setReDepts(event.target.value)
        // setSurveyFormData({...surveyFormData,reportingGroups:event.target.value})
        setSurveyFormData({...surveyFormData,authorizedViewersDeptIds:event.target.value})
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
            // setSurveyFormData({...surveyFormData,reportingIndividualEmail:([...recipientSurveyParticipants,trimmedIndividualInput])})
            setSurveyFormData({...surveyFormData,authorizedViewersEmails:([...recipientSurveyParticipants,trimmedIndividualInput])})
            setRecipientIndividuals('')
        }
    }

    const deleteTagRecipient = (id) => {
        const items = recipientSurveyParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setRecipientSurveyParticipants(result)
            // setSurveyFormData({...surveyFormData,reportingIndividualEmail:result})
            setSurveyFormData({...surveyFormData,authorizedViewersEmails:result})
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
            // setSurveyFormData({...surveyFormData,participantIndividualEmail:([...surveyParticipants,trimmedIndividualInput])})
            setSurveyFormData({...surveyFormData,emails:([...surveyParticipants,trimmedIndividualInput])})
            setIndividuals('')
        }
    }

    const deleteTag = (id) => {
        const items = surveyParticipants;
        if (items.length > 0) {
            const result = items.filter(item => item !== items[id])
            setSurveyParticipants(result)
            // setSurveyFormData({...surveyFormData,participantIndividualEmail:result})
            setSurveyFormData({...surveyFormData,emails:result})
        }
    }

    const auth = useAuth

    const history = useHistory()

    const dispatch = useDispatch()
    
    const [editSurvey, setEditSurvey] = useState(false)

	// useSelector((data) => console.log(data));
    const [postSurvey,setPostSurvey] = useState(false)
    const submitSurveyForm  =  async (e)  =>  {
        e.preventDefault();
        // console.log(surveyFormData)
        setEditSurvey(true)
        try {
            const res = await axios.patch(`https://agile-dawn-03556.herokuapp.com/api/v1/survey/${testData?.surveyInfo?.id}`,surveyFormData,
            {headers: { Authorization: `JWT ${auth().getToken}` }
            })
            // .then((response) => {
            setEditSurvey(false)
            const { success, message } = res.data;
            console.log(res)
            if (success) {
                    Swal.fire({
                        title: 'Edited Survey Successfully',
                        text: message,
                        icon: 'success',
                        // timer: 2000,
                    })
                    .then((result)=>{
                        console.log('result',result)
                        history.push(`/employee-survey/survey-form/${testData?.surveyInfo?.id}`)
                        // if(result.isConfirmed) {
                        //     history.push('/')
                        // }
                    }
                    )
                    setOpenSurvey(false)
            } else {
                Swal.fire({
                    title: 'Sorry could not edit this survey',
                    text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                    icon: 'error',
                    timer: 3000,
                })
                setOpenSurvey(false)
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Sorry could not edit Survey',
                text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                icon: 'error',
                timer: 3000,
            })
            setOpenSurvey(false)
        }
    }

///////////////////////////////////////////
//////////////////////////////////////////

    const handleChangeDepartments = (event) => {
      setDepartments(event.target.value);
    //   setSurveyFormData({...surveyFormData,participantDepartments:event.target.value})
    //   setSurveyFormData({...surveyFormData,addNewDepartments:event.target.value})
      setSurveyFormData({...surveyFormData,departmentIds:event.target.value})
    };

    const { register, handleSubmit } = useForm();

    function SubmitButton(){
        if (surveyFormData.title && surveyFormData.description && (surveyFormData.departmentIds.length > 0 || surveyFormData.groupIds.length > 0 || surveyFormData.emails.length > 0 )){
          return (
            <SharedButton
                variant="contained"
                color="primary"
                className="py-8 px-44 my-24 text-14 text-white font-normal"
                onClick={(e)=>submitSurveyForm(e)}
            >
                submit
            </SharedButton>
        )
    } else {
        return (
            <SharedButton
                    variant="contained"
                    color="primary"
                    className="py-8 px-44 my-24 text-14 text-white font-normal"
                    disabled
                >
                    submit
                </SharedButton>
            )};
      };


    return (
        <SideModal title="Edit Survey" open={open} handleClose={()=>setOpenSurvey(false)}>
            <div className="h-full w-11/12 mt-8 mx-auto">
                <form className=" p-28 rounded-lg">
                    <div className="mb-24">
                        <TextField
                            label="Survey Name"
                            id="outlined-margin-normal"
                            defaultValue={testData?.surveyInfo?.title}
                            className="inline-block p-1"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>handleName(e)}
                        />
                    </div>
                    <div className="mb-24">
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            defaultValue={testData?.surveyInfo?.description}
                            variant="outlined"
                            onChange={(e)=>handleDescription(e)}
                        />
                    </div>
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
                                    {dept?.map((ag) => (
                                        <MenuItem key={ag.id} value={ag.id}>{ag.departmentName}</MenuItem>
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
                                {group?.map((groupItem) => (
                                    <MenuItem key={groupItem.id} value={groupItem.id}>
                                        {groupItem.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Individual's email"
                            value={individuals}
                            variant="outlined"
                            className="mb-24"
                            onChange={handleChangeIndividuals}
                            onKeyDown={onKeyDownIndividuals}
                            fullWidth
                        />
                        <div className="">
                            <h4 className="capitalize text-14 text-grey-700 pb-8">survey participants</h4>
                            <div className="border-gray-400 border-1  py-14 rounded-md flex items-start overflow-y-scroll flex-wrap min-h-36">
                                <div className="flex flex-wrap">
                                    {departments.map((single,i) => {
                                        let deptChoices = ( dept.find( ({ label,value,id }) => id === single ))
                                        return (
                                            <>
                                                {deptChoices?.departmentName && (
                                                    <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                        <h5 className='text-14 font-semibold'>{deptChoices?.departmentName}</h5>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap">
                                    {groups?.map((item,i)=> {
                                        let groupChoices = (group.find(({ label,value,id }) => id === item ))
                                        return (
                                            <>
                                                {groupChoices?.name && (
                                                    <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                        <h5 className='text-14 font-semibold'>{groupChoices?.name}</h5>
                                                    </div>
                                                )}
                                            </>
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
                                <InputLabel id="group-label">Departments</InputLabel>
                                <Select
                                multiple
                                value={reDepts}
                                onChange={handleChangeDepartmentRecipient}
                                >
                                {recipientDept?.map((groupItem) => (
                                    <MenuItem key={groupItem?.id} value={groupItem?.id}>
                                        {groupItem?.departmentName}
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
                                    {reDepts?.map((item,i)=> {
                                        let recipientDeptChoices = (recipientDept?.find(({ label,value,id }) => id === item ))
                                        return (
                                            <div key={i} className="flex bg-blue-500 my-8 mx-8 rounded-md px-12 py-6 items-center justify-between text-white">
                                                <h5 className='text-14 font-semibold'>{recipientDeptChoices?.departmentName}</h5>
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
                        {postSurvey ? <BtnLoader/> : <SubmitButton/>}
                    </div>
                </form>
            </div>
        </SideModal>
    )
}

export default EditSurvey
