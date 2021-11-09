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
import CreateAudience from './audienceGroup/createAudience';
import CreateSurvey from './survey/createSurvey';
import EditAudience from './audienceGroup/editAudience';
import useEmployeeSurvey from './hooks/useEmployeeSurvey';


const index = () => {


	const [openCreateAudience, setOpenCreateAudience] = useState(false)
	const [createSurveyModal, setCreateSurveyModal] = useState(false)
	
	const dispatch = useDispatch();
	const { push } = useHistory();
	const state = useSelector(state => state.open);


	const customHook = useEmployeeSurvey({
		dispatch,
		push,
		state
	});



	const [content, setContent] = useState([
		{
		  title:'Surveys',
		  ComponentName:SurveyIndexPage,
		},
		{
		  title:'Audience/Groups',
		  ComponentName:AudienceGroupIndexPage,
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
						onClick={() => setCreateSurveyModal(true)}
						// onClick={ () => customHook.handleOpenModal()}
					>
						Create Survey
					</Button>
				)
			}}
			className="bg-blue-900 relative"
			content={
				<>
					<TabsContainer content={content} setOpenCreateAudience={setOpenCreateAudience} />
					{/* <CreateAudience/> */}
					{openCreateAudience	&& <CreateAudience setOpenCreateAudience={setOpenCreateAudience} />}
					{createSurveyModal && <CreateSurvey setCreateSurveyModal={setCreateSurveyModal} />}

				</>
			}
        />
    )
}

export default index
