import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SideModal from 'app/shared/modal/SideModal';
import SharedButton from 'app/shared/button/SharedButton';
import { useAxiosGet } from '../hooks/useAxiosHook';
import { useHistory, useParams } from 'react-router';
import { useAuth } from 'app/hooks/useAuth';
import axios from 'axios';


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

function EditAudience({openEditAudience,setOpenEditAudience,testData,item,singleAudienceId,singleAudienceItem,setSingleAudienceItem}) {
    // console.log(singleAudienceItem)

    // const { id } = useParams()

    // let paramsId = id

    const [updateGroupData,setUpdateGroupData] = useState({
        existingGroupInfo:{
            description:'',
            groupId:null,
            groupName:'',
        },
        emailMembers:[],
        deptMembers:[]
    })
    console.log(testData)
    useAxiosGet(`surveyGroup/${singleAudienceId}`,setUpdateGroupData)
    // console.log('updated group',updateGroupData)
    // console.log('singleAudienceItem',singleAudienceItem)
    // console.log(singleAudienceItem.name)

    // const [name, setName] = useState(singleAudienceItem?.title)
    // const [description, setDescription] =  useState(singleAudienceItem?.description)
    // const [department,setDepartment] = useState([])
    // const [departments, setDepartments] = useState(singleAudienceItem?.participantDepartments.map(singleDep => singleDep.id))
    // const [surveyParticipants, setSurveyParticipants] = useState(singleAudienceItem?.participantIndividualEmail)
    // const [individuals, setIndividuals] = useState("")
    // const [surveyFormData, setSurveyFormData] = useState({
    //     name,
    //     description,
    //     participantDepartments:departments,
    //     participantIndividualEmail:surveyParticipants
    // })
    // ************************************
    // const [name, setName] = useState(singleAudienceItem?.name)
    // const [name, setName] = useState(updateGroupData?.existingGroupInfo?.groupName)
    const [name, setName] = useState(testData?.groupInfo?.groupName)
    // const [name, setName] = useState(testData?.existingGroupInfo?.groupName)
    // const [name, setName] = useState('')
    const [description, setDescription] =  useState(testData?.groupInfo?.description)
    // const [description, setDescription] =  useState(testData?.existingGroupInfo?.description)
    const [department,setDepartment] = useState([])
    // const [departments, setDepartments] = useState(updateGroupData?.deptMembers?.map(singleDep => singleDep.id))
    const [departments, setDepartments] = useState(testData?.deptMembers?.map(singleDep => singleDep.deptId))
    const [surveyParticipants, setSurveyParticipants] = useState(testData?.emailMembers)
    const [individuals, setIndividuals] = useState("")
    const [newUpdatedFormData, setNewUpdatedFormData] = useState({
        name,
        description,
        // participantDepartments:departments,
        deptIds:departments,
        // participantIndividualEmail:surveyParticipants
        emails:surveyParticipants
    })



    useAxiosGet('department/all/1',setDepartment)

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
            // newArr = [...surveyParticipants]
            setSurveyParticipants((prevState) => [...prevState, trimmedIndividualInput])
            console.log(surveyParticipants)
            // setSurveyParticipants(newArr)
            // setSurveyFormData({...surveyFormData,participantIndividualEmail:([...surveyParticipants, trimmedIndividualInput])})
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

    const submitUpdateGroupForm  =   (e)  =>  {
        e.preventDefault();
        // console.log(newUpdatedFormData)
        // surveyGroup/:id

        axios.patch(
           `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${testData.groupInfo.groupId}`,
            newUpdatedFormData,
            {headers: { Authorization: `JWT ${auth().getToken}` }}
            )
        .then(response => {
            if(response.status === 200) setOpenCreateAudience(false)
            console.log(response)
            // history.push('/employee-survey')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }



    return (
        <SideModal title="Audience/Groups" open={open} handleClose={() => setOpenEditAudience(false)} >
                        {/* <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Edit {updateGroupData?.existingGroupInfo?.groupName}</h3> */}
            <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Edit {testData?.groupInfo?.groupName}</h3>
            <div className="bg-white w-11/12 mt-8 mx-auto shadow mb-56 rounded-20">
                <form className="p-28">
                    <TextField
                        label="Group Name"
                        id="outlined-margin-normal"
                        className="inline-block p-1 mb-24"
                        defaultValue={testData?.groupInfo?.groupName}
                        variant="outlined"
                        fullWidth
                        name="name"
                        onChange={(e)=>handleName(e)}
                    />
                        {/* defaultValue={testData?.existingGroupInfo?.groupName} */}
                    
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        defaultValue={testData?.groupInfo?.description}
                        multiline
                        rows={4}
                        fullWidth
                        className="mb-16"
                        variant="outlined"
                        onChange={(e)=>handleDescription(e)}
                    />
                        {/* defaultValue={testData?.existingGroupInfo?.description} */}
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
                                    {departments.map((single,i) => {
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
                        <SharedButton
                            variant="contained"
                            color="primary"
                            className="py-8 px-28 my-24 text-white font-normal"
                            onClick={(e)=>submitUpdateGroupForm(e)}
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


