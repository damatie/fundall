import React, { useEffect, useLayoutEffect, useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import { Link, useHistory, useParams } from 'react-router-dom'
import Cards from 'app/shared/cards/cards'
import SharedButton from 'app/shared/button/SharedButton';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { useAxiosGet, useAxiosGetAllMembers, useAxiosGetSingleAudience } from '../hooks/useAxiosHook';
import moment from 'moment';
import SingleAudienceLoader from '../utils/singleAudienceLoader';
import SurveyCardLoader from '../utils/surveyCardLoader';
import SurveyCard from '../shared/surveyCard';
import { Doughnut } from 'react-chartjs-2';
import AddMembers from './addMembers';
import Swal from 'sweetalert2';



// const {params} = useParams()



function SingleAudience() {
    
    const doughnutChartData = {
        labels: ['Green', 'Yellow'],
        datasets: [
            {
                data: [300, 50],
                backgroundColor: ['#00FFAA','#FFCE56'],
                hoverBackgroundColor: ['#00FFAA','#FFCE56']
            }
        ]
    };
    const [openAddMembers, setOpenAddMembers] = useState(false)
    const [surveyCard, setSurveyCard] = useState([])
    const [audienceCard, setAudienceCard] = useState([])
    const [clickedAudience,setClickedAudience] = useState()
    const [membersList, setMembersList] = useState([])
    const [fullMemberList, setFullMemberList] = useState(false)
    const [refreshInfo,setRefreshInfo] = useState(true)
    const [loadingSingleAudience,setLoadingSingleAudience] = useState(false)
    const [loadingSurveySnippet, setLoadingSurveySnippet] = useState(false)
    const [loadingMembers, setLoadingMembers] = useState(false)
    const [responseRate, setResponseRate] = useState({})
    const [loadingResponseRate, setLoadingResponseRate] = useState(false)
    const showFullList = () => {
        setFullMemberList(prev => !prev)
    }

    const [getMemberNumber, setGetMemberNumber] = useState(clickedAudience?.groupInfo?.totalMembers)
    // const deleteAudienceMember = (member,id) => {

    //     // setClickedAudience(...clickedAudience,(clickedAudience?.groupInfo?.totalMembers -= (member.noOfEmployees ? member?.noOfEmployees : 1)))
    //     // setClickedAudience(...clickedAudience,((clickedAudience?.groupInfo?.totalMembers) -= 1))
    //     // console.log(clickedAudience?.groupInfo?.totalMembers)
    //     // let number = clickedAudience?.groupInfo?.totalMembers
    //     // console.log(value)
    //     // console.log((member.noOfEmployees ? member?.noOfEmployees : 1))
    //     // console.log(clickedAudience)
    //     // console.log('clickedAudience?.groupInfo?.totalMembers',newNumber)
    //     // console.log('before',getMemberNumber)
    //     // let value = (member.noOfEmployees ? member?.noOfEmployees : 1)
    //     // let newNumber = (clickedAudience?.groupInfo?.totalMembers && (clickedAudience.groupInfo.totalMembers -= value))
    //     // setGetMemberNumber(newNumber <= 0 ? 0 : newNumber)
    //     // console.log('after',getMemberNumber)
    //     // console.log(newNumber)
    //     // setClickedAudience(...clickedAudience,({groupInfo : {totalMembers : newNumber}}))
    //     // console.log(clickedAudience)

    //     // const items = membersList;
    //     // if (items.length > 0) {
    //         // console.log(id)
    //     //   setMembersList(items.filter((item, index) => index !== id));
    //     //   console.log(member)
    //     //   try {
    //     //       axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${clickedAudience?.groupInfo?.groupId}/${member?.id}`,
    //     //       {headers: { Authorization: `JWT ${auth().getToken}` }} )
    //     //       .then(data => {
    //     //         setRefreshInfo(true)
    //     //         //   console.log(data)
    //     //         //   useAxiosGet(`surveyGroup/${paramsId}`,setClickedAudience)
    //     //         }
    //     //         )
    //     //         //   .catch(e => console.error(e));
    //     //   } catch (error) {

    //     //   }
    //     // }
    // }

    //********************** */
    const [refreshData, setRefreshData] = useState(false)
    const deleteAudienceMember = (member,id) => {
        // console.log(member)
        let name
        if(member.name){
            name = member.name
        }else if(member.email){
            name = member.email
        }
        // let clickedAudienceMemberNumber = clickedAudience?.groupInfo?.totalMembers
        let items = membersList
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
              return   axios.delete( `https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${clickedAudience?.groupInfo?.groupId}/${member?.id}`,
              {headers: { Authorization: `JWT ${auth().getToken}` }} ).then((response) => {
                  // setPostAudience(false)
                  const { success, message, token, data } = response.data;
                  if (success) {
                    if (items.length > 0) {
                        setMembersList(items.filter((item, index) => index !== id));
                        let value = (member.noOfEmployees ? member?.noOfEmployees : (member?.noOfEmployees === 0) ? 0 : 1)
                        // if(member?.noOfEmployees) {
                        //     value = member?.noOfEmployees
                        // } else if (member?.noOfEmployees === 0) {
                        //     value = 0
                        // } else {
                        //     value = 1
                        // }
                        // let value = (member.noOfEmployees ? member?.noOfEmployees : 1)
                        let newNumber = (clickedAudience?.groupInfo?.totalMembers && (clickedAudience.groupInfo.totalMembers -= value))
                        setGetMemberNumber(newNumber <= 0 ? 0 : newNumber)
                        setRefreshData((prev) => !prev)
                        // console.log('after',getMemberNumber)                
                    }
                    Swal.fire({
                        title: `<h3>Deleted ${name} successfully</h3>`,
                        text: message,
                        icon: 'success',
                        timer: 3000,
                    })
                } else {
                    Swal.fire({
                        title: `<h3>Sorry could not delete ${name}<h3>`,
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
    //********************** */


    const { id } = useParams()
    const history = useHistory()
    let paramsId = id
    const auth = useAuth

    
    useAxiosGetSingleAudience(`surveyGroup/${paramsId}`,setClickedAudience,setLoadingSingleAudience,refreshInfo)
    useAxiosGet(`surveyGroup/${paramsId}/surveys`,setSurveyCard,setLoadingSurveySnippet)
    useAxiosGetAllMembers(`surveyGroup/${paramsId}/members`,setMembersList,setLoadingMembers)
    useAxiosGet(`surveyGroup/${paramsId}/response-rate`,setResponseRate,setLoadingResponseRate)

    // const [memberNumber,setMemberNumber] = useState(clickedAudience?.groupInfo?.totalMembers)
    // console.log(memberNumber)
    // console.log(clickedAudience)
    // console.log(clickedAudience?.groupInfo?.totalMembers)
    // console.log(membersList)


    // console.log(responseRate)
    

    let responseCalc = (x,y) => {
        return ((x/y) * 100)
    }

    let numOpenedSurvey = (x,y) => {
        return x + y
    }

    const [options, setOptions] = useState({
        chart: {
            id: 'chart'
        },
        xaxis: {
            categories: [2001,2002,2003,2004]
        }
    })

    const [addInfo, setAddInfo] = useState({})

    //**************** */
    useLayoutEffect(() => {
        axios.get(`https://agile-dawn-03556.herokuapp.com/api/v1/surveyGroup/${clickedAudience?.groupInfo?.groupId}`,
        {headers: { Authorization: `JWT ${auth().getToken}` }} )
        .then((response) => {
            // console.log(response.data.data)
        //  setLoadingEditInfo(false)
        const { success, message, token, data } = response.data;
        if (success) {
            // Swal.fire({
            //     title: `Opened edit form for ${name} successfully`,
            //     text: message,
            //     icon: 'success',
            //     timer: 2000,
            // })
            setAddInfo(response.data.data)
            // setOpenEditAudience(true)
        } else {
            Swal.fire({
                title: 'Sorry could not open the edit form for ${name}',
                text: error.response?.data.error || error.response?.data.message || 'Check your internet connection',
                icon: 'error',
                timer: 3000,
            })
        }
        })
    }, [clickedAudience,refreshData])
    // console.log(clickedAudience)
    // console.log(addInfo)
    //**************** */
    console.log(responseRate)

    return (
        <>
        <div className="w-10/12 mx-auto">
            <div className="my-16 flex items-center">
                {/* <Link to="/employee-survey"> */}
                <div className="cursor-pointer" onClick={() => history.goBack()}>
                    <p className="inline-block capitalize text-blue-800">
                        Audience / Groups
                    </p>
                </div>
                {/* </Link> */}
                <DoubleArrowRoundedIcon className="text-20 mx-6 text-black" />
                <p className="font-semibold">Employee work life balance survey group</p>
            </div>
            <div className="w-full space-y-56">
                <Cards className="w-1/2 mb-24 px-10 py-10">
                    {
                        loadingSingleAudience ? 
                        <SingleAudienceLoader classes="flex justify-between mb-6 py-16 px-36 rounded bg-grey-400 w-10/12"></SingleAudienceLoader> : 
                        <h2  className="py-6 text-black font-bold text-2xl">{clickedAudience?.groupInfo?.groupName}</h2>
                    }
                    {
                        loadingSingleAudience ? 
                        <SingleAudienceLoader classes="flex justify-between mb-10 py-10 px-36 rounded bg-grey-300 w-7/12"></SingleAudienceLoader> : 
                        <h5 className="text-16">{clickedAudience?.groupInfo?.description}</h5>
                    }
                    {
                        loadingSingleAudience ? 
                        <SingleAudienceLoader classes="flex justify-between py-10 px-36 rounded bg-blue-300 w-1/3"></SingleAudienceLoader> : 
                        <p className="text-blue-800 py-6 text-18">
                            {clickedAudience?.groupInfo?.totalMembers ? clickedAudience?.groupInfo?.totalMembers : 0}
                            {clickedAudience?.groupInfo?.totalMembers > 1 ? ' members' : ' member'} in this group
                        </p>
                    }
                </Cards>
                <div className="flex items-start space-x-52 justify-between w-full">
                    <Cards className="h-400 w-1/2 flex flex-col items-center">
                        <h4 className="text-gray-500 font-bold text-15 text-center">Total Surveys</h4>
                        <div className="h-256 w-256 my-20 bg-blue-600 relative">
                            {/* <Doughnut data={doughnutChartData} className='h-256 w-256' /> */}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <h6 className="text-gray-500 capitalize">opened</h6>
                                <h6 className="text-black text-14 font-bold">
                                ({responseRate?.openedNotCompletedPercent && responseRate?.openedNotCompletedPercent}%)
                                </h6>
                                {/* <h4 className="text-xl text-black font-bold">{(responseRate?.completedSurvey && responseRate?.notCompletedSurvey) && 
                            numOpenedSurvey(responseRate?.completedSurvey,responseRate?.notCompletedSurvey)}</h4> */}
                            </div>
                            <div className="text-center">
                                <h6 className="text-gray-500 capitalize">completed</h6>
                                {/* <h4 className="text-xl text-black font-bold">{
                                responseRate?.completedSurvey && responseRate?.completedSurvey
                                }</h4> */}
                                <h6 className="text-black text-14 font-bold">
                                ({responseRate?.completedSurveyPercent && responseRate?.completedSurveyPercent}%)
                                </h6>
                            </div>
                        </div>
                    </Cards>
                    <div className=" w-1/2 flex flex-col justify-between items-start h-400">
                        <Cards className="w-full">
                            <p className="text-gray-500 font-bold text-15">Response Rate</p>
                            <div className="flex py-24">
                                <h3 className="text-4xl font-bold">{responseRate?.responseRatePercentage && responseRate?.responseRatePercentage}</h3>
                                <p className="text-green-400 text-14"><TrendingUpIcon /> +10.19%</p>
                            </div>
                            <p className="text-gray-500 font-bold text-15 pb-10">
                            {surveyCard.length} surveys were dispatched last month,  were opened ({responseRate?.openedSurveyPercent && responseRate?.openedNotCompletedPercent}%) and {responseRate?.completedSurvey && responseRate?.completedSurvey} completed 
                            ({responseRate?.completedSurveyPercent && responseRate?.completedSurveyPercent}%)
                            </p>
                        </Cards>
                        <Cards className="w-full text-center">
                            <p className="text-gray-500 font-semibold py-10 text-15">Total Surveys Sent</p>
                            <h4 className="text-black font-bold text-3xl">{responseRate?.totalRecipients && responseRate?.totalRecipients}</h4>
                        </Cards>
                    </div>
                </div>
                <div className="flex items-start justify-between w-full pb-16 space-x-48">
                    {
                        loadingSurveySnippet ? (
                            <SurveyCardLoader classes="w-1/5"/>
                        ) : (
                            <Cards className="px-16 w-3/5">
                                {!surveyCard?.length > 0 ? (
                                    <div className="w-12/12">
                                        <h3 className="w-10/12 text-center mx-auto font-bold text-20">The members of this group have not yet participated in any surveys yet</h3>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="mb-16 font-bold text-black text-2xl capitalize">participated surveys</h2>

                                        {
                                            surveyCard?.map((surveyCardItem,i)=>(
                                                <div className="text-black hover:no-underline" key={surveyCardItem?.id} >
                                                    <SurveyCard surveyCardItem={surveyCardItem} />
                                                </div>
                                            ))
                                        }
                                    </>
                                )}
                            </Cards>
                        )
                    }
                    <Cards className="w-2/5 pt-4">
                        <div className='flex justify-between items-center flex-wrap mb-10 w-full'>
                            <h4 className="text-black font-bold text-lg">Group Member List</h4>
                            {clickedAudience && <button className='bg-blue-500 text-14 py-6 px-20 text-white rounded-sm font-400' onClick={() => setOpenAddMembers(true)}>Add Member</button>}
                        </div>
                        {!membersList.length > 0 ? (
                            <h4 className="text-black text-16 text-center p-10 font-semibold">There are no members in this Audience/Group</h4>
                        ) : (
                            <div className="">
                                <table className="table-fixed text-left">
                                    <thead  className='border-b-1 border-grey-400'>
                                        <tr className="">
                                            <th className="w-1/2 text-gray-400 font-semibold">{ membersList?.length === 1 ? 'Member' : 'Members' }</th>
                                            {/* <th className="w-1/2 text-gray-400 font-semibold">Date Added </th> */}
                                            <th className="w-1/2 text-gray-400 font-semibold">Number Of Employees </th>
                                        </tr>
                                    </thead>
                                    <div className="my-10"></div>
                                    {loadingMembers ? (
                                        <>
                                            <SingleAudienceLoader classes="flex justify-between mb-10 py-10 px-36 rounded bg-blue-300 w-1/3"></SingleAudienceLoader>
                                            <SingleAudienceLoader classes="flex justify-between py-10 px-36 rounded bg-blue-300 w-1/3"></SingleAudienceLoader>
                                        </>
                                    ) : (
                                        <tbody>
                                        {   fullMemberList ?
                                                membersList?.slice(0,3).map((member,i) => (
                                                <>
                                                    <tr className="border-b-1 border-grey-400" key={i}>
                                                        <td className="">{  member?.name ? (member?.name) : (member?.email)  }</td>
                                                        {/* <td className="">{member?.date}</td> */}
                                                        {/* <td className="">{member?.noOfEmployees ? (member?.noOfEmployees) : '' }</td> */}
                                                        <td className="">{member?.noOfEmployees && member?.noOfEmployees }</td>
                                                        <td className="text-red-500 px-12 hover:text-red-300 transition py-4 cursor-pointer rounded-8" 
                                                            onClick={() => deleteAudienceMember(member,i)}>
                                                                <DeleteForeverIcon/>
                                                        </td>
                                                    </tr>
                                                    <div className="my-10"></div>
                                                </>
                                                ))
                                            :
                                                membersList?.map((member,i) => (
                                                    <>
                                                    <tr className="border-b-1 border-grey-400" key={membersList?.id}>
                                                        <td className="">{ member?.name ? (member?.name) : (member?.email) }</td>
                                                        {/* <td className="">{moment().format('MMM Do YY',member?.createdAt)}</td> */}
                                                        {/* <td className="">{member?.noOfEmployees ? member?.noOfEmployees : '' }</td> */}
                                                        <td className="">{member?.noOfEmployees && member?.noOfEmployees}</td>
                                                        <td className="text-red-500 px-12 py-4 cursor-pointer rounded-8" onClick={() => deleteAudienceMember(member,i)}><DeleteForeverIcon/></td>
                                                    </tr>
                                                    <div className="my-10"></div>
                                                </>
                                                ))
                                        }
                                    </tbody>
                                    )
                                    }
                                </table>
                            </div>
                        ) }
                        {membersList.length > 3 && (
                            <Button className="text-white bg-purple-400 py-10 px-20 text-14 rounded-20 my-12" onClick={showFullList}>See {fullMemberList ? <> more <ArrowForwardIcon/></> : <> less <ArrowUpwardIcon /> </>}</Button>
                        )}
                    </Cards>
                </div>
            </div>
        </div>
        {openAddMembers && <AddMembers openAddMembers={openAddMembers} setOpenAddMembers={setOpenAddMembers} clickedAudience={clickedAudience} addInfo={addInfo} setAddInfo={setAddInfo} />}
        </>
    )
}

export default SingleAudience
