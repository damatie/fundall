import React,{ useState } from 'react'
import PageLayout from 'app/shared/pageLayout/PageLayout'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Cards from 'app/shared/cards/cards'
import TabsContainer from 'app/shared/tabs/tabsContainer';
import SurveyIndexPage from './survey';
import AudienceGroupIndexPage from './audienceGroup';
import useEmployeeSurveyList from './hooks/useEmployeeSurveyList';
import CreateAudience from './audienceGroup/createAudience';
import CreateSurvey from './survey/createSurvey';


const index = () => {


	const [openCreateAudience, setOpenCreateAudience] = useState(false)
	const [createSurveyModal, setCreateSurveyModal] = useState(false)



	const [content, setContent] = useState([
		{
		  title:'Surveys',
		  ComponentName:SurveyIndexPage,
		},
		{
		  title:'Audience/Groups',
		  body:'Lorem Ipsum2',
		  ComponentName:AudienceGroupIndexPage,
		  openModal:setOpenCreateAudience,
		},
		{
		  title:'Reports',
		  body:'Lorem Ipsum3',
		  ComponentName:Cards,
		},
	])




    return (
        <PageLayout
            header={{
				icon: '',
				title: 'Employee Survey',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button = {{
				showButton: true,
				btnComponent:(
					<Button
						variant="contained"
						color="secondary"
						onClick={()=>setCreateSurveyModal(true)}
					>
						Create Survey
					</Button>
				)
			}}
			className="bg-blue-900 relative"
			content={
				<>
					<TabsContainer content={content} setOpenCreateAudience={setOpenCreateAudience} />
					{openCreateAudience	&& <CreateAudience setOpenCreateAudience={setOpenCreateAudience} />}
					{createSurveyModal && <CreateSurvey setCreateSurveyModal={setCreateSurveyModal} />}
				</>
			}
        />
    )
}

export default index
