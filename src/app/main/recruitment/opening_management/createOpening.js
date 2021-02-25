import FusePageCarded from '@fuse/core/FusePageCarded';
import _ from '@lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import NewOpeningTab from '../tabs/newOpeningTab';
import Header from '../recruitmentHeader';

function CreateOpening(props) {
	const dispatch = useDispatch();
	// const classes = useStyles(props);

	useEffect(() => {
		dispatch(Actions.getEntities());
	}, [])

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Header heading='New opening' />
			}
			content={
				<div className=" sm:p-24 ">
					<NewOpeningTab />
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('createOpening', reducer)(CreateOpening);
