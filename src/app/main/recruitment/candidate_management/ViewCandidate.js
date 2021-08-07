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
import CandidateDetails from './components/CandidateDetails';
import { Skeleton } from '@material-ui/lab';


const ViewCandidate = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { push } = useHistory();
	const location = useLocation();
	const [prevUrl, setPrevUrl] = React.useState('/recruitment/all');
	const userData = useAuth().getUserProfile;

	React.useEffect(() => {
		location.pathname === `/recruitment/${params.positionId}/candidate/${params.id}` &&
			setPrevUrl(`/recruitment/position_details/${params.positionId}`);
	}, []);

	const state = useSelector(state => state.Candidate.candidate);
    const candidateHook = useCandidate({
		dispatch,
		push,
		id: params?.id,
        positionId: params?.positionId,
        state,
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
				title: 'UPDATE CANDIDATE',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: false,
				btnComponent: (
					<>
					{/* {customHook?.content?.status === 'PUBLISHED' &&( <Button
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
					)} */}
					</>
				)
			}}
			content={
				<div className=" sm:p-24 ">
					{/* {candidateHook.oneLoading ? (
						<Skeleton animation="wave" width="100%" height="315px" variant="rect" />
					) :
					( */}
                    	<CandidateDetails customHook={candidateHook}/>
					{/* )} */}
                    
				</div>
			}
		/>
	);
};
export default withReducer('Candidate', reducer)(ViewCandidate);
