import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import * as Actions from './store/actions';
// import reducer from './store/reducers';
import OnboardingHeader from './onboardingHeader';
import OnboardingList from './onboardingList';

function Onboarding(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	// const routeParams = useParams();

	useEffect(() => {
		// dispatch(Actions.getFilters());
		// dispatch(Actions.getFolders());
		// dispatch(Actions.getLabels());
	}, [dispatch]);

	return (
		<FusePageCarded
			classes={{
				root: 'w-full',
				content: 'flex flex-col',
				header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<OnboardingHeader pageLayout={pageLayout} />}
			content={<OnboardingList/>}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('onboarding')(Onboarding);
