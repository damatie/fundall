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


function EditModal({openEditAudience,setOpenEditAudience,testData,setTestData,item,singleAudienceId,singleAudienceItem,setSingleAudienceItem}) {

    return (
        <SideModal title="Audience/Groups" open={open} handleClose={() => setOpenEditAudience(false)} >
            <h3 className="mt-8 w-11/12 mx-auto py-10 text-xl font-semibold">Fetching Data</h3>
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
                        {editAudience ? <BtnLoader/> : <SubmitButton/>}
                    </div>
                </form>
            </div>
        </SideModal>
    )
}

export default EditModal


