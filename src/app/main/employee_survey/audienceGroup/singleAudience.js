import React, { useEffect, useState } from 'react'
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



// const {params} = useParams()


function SingleAudience() {
    const [surveyCard, setSurveyCard] = useState([
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88,
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88,
        },
        {
            title:"Company policy survey",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            date:"12/10/2021",
            numberOfPeople:400,
            responseRate:88
        },
    ])

    const [audienceCard, setAudienceCard] = useState([
        {
            title:"Employee work life balance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40
        },
        {
            title:"Company policy survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40
        },
        {
            title:"Manager performance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40
        },
        {
            title:"Network performance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40
        },
    ])

    const [membersList, setMembersList] = useState([
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:0,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:1,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:2,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:3,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:4,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:5,
        },
        {
            name:'HR Department',
            date:"12/01/2021",
            // id:6,
        },
    ])

    const [fullMemberList, setFullMemberList] = useState(false)

    const showFullList = () => {
        setFullMemberList(prev => !prev)
    }

    const deleteAudienceMember = (id) => {
        const items = membersList;
        if (items.length > 0) {
            console.log(id)
          setMembersList(items.filter((item, index) => index !== id));
        }
        console.log(123)
    }


    return (
        <div  className="w-10/12 mx-auto">
            <div className="my-16 flex items-center">
                <Link to="/employee-survey">
                    <p className="inline-block capitalize text-blue-800">
                        Audience / Groups
                    </p>
                </Link>
                <DoubleArrowRoundedIcon className="text-20 mx-6 text-black" />
                <p className="font-semibold">Employee work life balance survey group</p>
            </div>
            <div className="w-full space-y-56">
                <Cards className="w-1/2 mb-24 px-10 py-10">
                    <h2 className="py-6 text-black font-bold text-2xl">Employee work life balance survey group</h2>
                    <h5 className="text-16">This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,</h5>
                    <p className="text-blue-800 py-6 text-18">40 members in this group</p>
                </Cards>
                <div className="flex items-start space-x-52 justify-between w-full">
                    <Cards className="h-400 w-1/2 flex flex-col items-center">
                        <h4 className="text-gray-500 font-bold text-15 text-center">Total Surveys</h4>
                        <div className="h-256 w-256 my-20"></div>
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <h6 className="text-gray-500 capitalize">opened</h6>
                                <h4 className="text-xl text-black font-bold">212</h4>
                            </div>
                            <div className="text-center">
                                <h6 className="text-gray-500 capitalize">completed</h6>
                                <h4 className="text-xl text-black font-bold">100</h4>
                            </div>
                        </div>
                    </Cards>
                    <div className=" w-1/2 flex flex-col justify-between items-start h-400">
                        <Cards className="w-full">
                            <p className="text-gray-500 font-bold text-15">Response Rate</p>
                            <div className="flex py-24">
                                <h3 className="text-4xl font-bold">2803</h3>
                                <p className="text-green-400 text-14"><TrendingUpIcon /> +10.19%</p>
                            </div>
                            <p className="text-gray-500 font-bold text-15 pb-10">
                            400 surveys were dispatched last month, 212 were opened (53%) and 100 completed (25%)
                            </p>
                        </Cards>
                        <Cards className="w-full text-center">
                            <p className="text-gray-500 font-semibold py-10 text-15">Total Surveys Sent</p>
                            <h4 className="text-black font-bold text-3xl">400 </h4>
                        </Cards>
                    </div>
                </div>
                <div className="flex items-start justify-between w-full pb-16 space-x-48">
                    <Cards className="px-16 w-3/5">
                        <h2 className="mb-16 font-bold text-black text-2xl capitalize">participated surveys</h2>
                        {
                            surveyCard?.map((surveyCardItem,i)=>(
                                <div className="flex justify-between w-full bg-white shadow-md mb-40 py-16 px-36 rounded-20">
                                    <div className="w-2/3">
                                        <h3 className="font-bold text-xl">{surveyCardItem?.title}</h3>
                                        <h5 className="text-16 py-8 w-full">{surveyCardItem?.description}</h5>
                                        <p className="text-blue-400 text-14">Created {surveyCardItem?.date}</p>
                                    </div>
                                    <div className="w-1/3">
                                        <p className="text-blue-400 text-14 pt-8 text-right">Survey sent to {surveyCardItem?.numberOfPeople}</p>
                                        <p className="text-blue-400 text-14 pt-8 text-right">{surveyCardItem?.responseRate}% response rate</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Cards>
                    <Cards className="w-2/5 pt-4">
                        <h4 className="pb-10 text-black font-bold text-lg">Group Member List</h4>
                        {!membersList.length > 0 ? (
                            <h4 className="text-black text-16 text-center p-10 font-semibold">There are no members in this Audience/Group</h4>
                        ) : (
                            <div className="">
                                <table class="table-fixed text-left">
                                    <thead  className='border-b-1 border-grey-400'>
                                        <tr className="">
                                            <th class="w-1/2 text-gray-400 font-semibold">Member Name</th>
                                            <th class="w-1/2 text-gray-400 font-semibold">Date Added </th>
                                        </tr>
                                    </thead>
                                    <div className="my-10"></div>
                                    <tbody>
                                        {   fullMemberList ?
                                                membersList?.slice(0,3).map((member,i) => (
                                                <>
                                                    <tr className="border-b-1 border-grey-400" key={i}>
                                                        <td className="">{member?.name}</td>
                                                        <td className="">{member?.date}</td>
                                                        <td className="text-red-500 px-12 hover:text-red-300 transition py-4 cursor-pointer rounded-8" onClick={() => deleteAudienceMember(i)}><DeleteForeverIcon/></td>
                                                    </tr>
                                                    <div className="my-10"></div>
                                                </>
                                                ))
                                            :
                                                membersList?.map((member,i) => (
                                                <>
                                                    <tr className="border-b-1 border-grey-400" key={i}>
                                                        <td className="">{member?.name}</td>
                                                        <td className="">{member?.date}</td>
                                                        <td className="text-red-500 px-12 py-4 cursor-pointer rounded-8" onClick={() => deleteAudienceMember(i)}><DeleteForeverIcon/></td>
                                                    </tr>
                                                    <div className="my-10"></div>
                                                </>
                                                ))
                                        }
                                    </tbody>
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
    )
}

export default SingleAudience
