import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import { useAuth } from 'app/hooks/useAuth';
import useRecruitmentOpening from '../hooks/useRecruitmentOpening';
import useCandidate from '../hooks/useCandidates';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import OpeningDetailInfo from './components/OpeningDetailInfo';
import PublishOpening from './components/PublishOpening';
import CandidateList from '../candidate_management/CandidateList';


const OpeningDetails = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { push } = useHistory();
	const location = useLocation();
	const [prevUrl, setPrevUrl] = React.useState('/recruitment/all');
	const userData = useAuth().getUserProfile;
	const [description, setDescription] = React.useState('');

	React.useEffect(() => {
		location.pathname === `/performance_appraisal/kpo/review/details/${params.positionId}` &&
			setPrevUrl('/performance_appraisal/kpo/review/');
	}, []);

	const state = useSelector(state => state.Recruitment);
	const candidateState = useSelector(state => state.Candidate.candidate);

	const customHook = useRecruitmentOpening({
		dispatch,
        push,
		id: params?.positionId,
		state,
		userInfo: userData,
		description,
		setDescription
	});

    const candidateHook = useCandidate({
		dispatch,
		push,
        positionId: params?.positionId,
        state: candidateState,
		userInfo: userData,
    });
    
    
	return (
		<PageLayout
			noSearch={true}
			customToolBarSearchDivClass={true}
			prev={{
				url: prevUrl
			}}
			header={{
				icon: '',
				title: 'RECRUIMENT LIST',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: (customHook.isHR() && !customHook?.loading),
				btnComponent: (
					<>
					{customHook?.content?.status === 'PUBLISHED' &&( <Button
							variant="contained"
							color="secondary"
							onClick={candidateHook.handleOpenModal}
							startIcon={<AddIcon />}
						>
							Add Candidate
						</Button>
					)}

						{customHook?.content?.status === 'UNPUBLISHED' &&( <Button
							variant="contained"
							color="secondary"
							onClick={customHook.handleOpenModal}
							startIcon={<EditIcon />}
							disabled={customHook?.content?.status === 'PUBLISHED' || customHook?.oneLoading}
						>
							Publish
						</Button>
					)}
					</>
				)
			}}
			content={
				<div className=" sm:p-24 ">
                    <OpeningDetailInfo customHook={customHook} candidateHook={candidateHook}/>
					<CandidateList candidateHook={candidateHook}/>
                    <PublishOpening customHook={customHook} />
                    
				</div>
			}
		/>
	);
};
withReducer('Candidate', reducer)(OpeningDetails);
export default withReducer('Recruitment', reducer)(OpeningDetails);
