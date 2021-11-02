import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import SharedButton from 'app/shared/button/SharedButton'
import Cards from 'app/shared/cards/cards'
import { Link } from 'react-router-dom';

const AudienceGroupIndexPage = ({setOpenCreateAudience}) => {

    const [audienceCard, setAudienceCard] = useState([
        {
            title:"Employee work life balance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:0
        },
        {
            title:"Company policy survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:1,
        },
        {
            title:"Manager performance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:2,
        },
        {
            title:"Network performance survey group",
            description:"This is a description.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
            numberOfMembers:40,
            id:3
        },
    ])

    const deleteAudience = (id) => {
        const items = audienceCard;
        if (items.length > 0) {
          setAudienceCard(items.filter((item, index) => index !== id));
        }
    }

    return (
        <>
            <div className="flex my-10 mb-32 items-center">
                <h2 className="mr-8 text-2xl font-semibold capitalize">audience / groups</h2>
                <Button
                    variant="contained"
                    color="secondary"
                    className="py-8 px-60 text-12 cursor-pointer"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=>setOpenCreateAudience(true)}
                >
                    Create Audience/Group
                </Button>
            </div>
            {
                audienceCard?.map((audienceCardItem,i)=>(
                    <Cards className="mb-44 px-12 py-8">
                        <div className="flex justify-end">
                            <Button
                                variant="contained"
                                color="secondary"
                                className="px-20 py-6 text-12"
                                startIcon={<AddCircleOutlineIcon />}
                            >
                                edit Group
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="px-20 py-6 text-12 bg-red-200 ml-10 cursor-pointer text-red-900"
                                startIcon={<DeleteIcon />}
                                onClick={()=>deleteAudience(i)}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className="py-10 w-8/12">
                            <Link to={'employee-survey/single-audience/' + audienceCardItem?.id } className="text-black hover:no-underline">
                                <h3 className="text-2xl p-4 pb-0 border-b-2 border-gray-A100 font-bold">   {audienceCardItem?.title}
                                </h3>
                            </Link>
                            <h5 className="py-10 text-16 w-full">{audienceCardItem?.description}</h5>
                            <p className="text-blue-400 cursor-pointer text-18">{audienceCardItem?.numberOfMembers} members in this group</p>
                        </div>
                    </Cards>
                ))
            }
        </>
    )
}

export default AudienceGroupIndexPage
