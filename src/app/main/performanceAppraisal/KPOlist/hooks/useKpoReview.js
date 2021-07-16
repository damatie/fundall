import React from 'react';
import userRole from 'utils/userRole';
import { getKpoByEntity, OPEN_REQUEST_KPO_MODAL, CLOSE_REQUEST_KPO_MODAL, kpoReq } from '../store/actions';

const useKpoReview = ({ dispatch, push, userInfo, kpoList }) => {
	const { deptKpo, loading, assignedKpo, entities, kpoRequest, details, open, kposToReviewByLineManager } = kpoList;
	const { departmentId, role, id } = userInfo;

	const handleDelete = id => {
		console.log(id);
	};

	const handleFilter = ({ target: { value } }) => {
		dispatch(getKpoByEntity(value));
	};

	const handleOpen = data => {
		dispatch({
			type: OPEN_REQUEST_KPO_MODAL,
			payload: data
		});
	};

	const handleClose = () => {
		dispatch({
			type: CLOSE_REQUEST_KPO_MODAL
		});
	};

	const handleReq = type => () => {
		dispatch(
			kpoReq({
				id: details.id,
				type
			})
		);
	};

	const getKpos = type => {
		console.log(type);
		console.log(kposToReviewByLineManager);
		switch (type) {
			case 'completed':
				return kposToReviewByLineManager.filter(kpo => kpo.status === 'completed');
			case 'pending':
				return kposToReviewByLineManager.filter(kpo => kpo.status === 'pending' || kpo.status === 'created');
			case 'active':
				return kposToReviewByLineManager.filter(
					kpo => kpo.status !== 'completed' && kpo.status !== 'pending' && kpo.status !== 'created'
				);
			default:
				return kposToReviewByLineManager.filter(kpo => kpo.status === 'requested');
		}
	};

	return {
		getKpos,
		loading,
		push,
		handleDelete,
		assignedKpo,
		isAssigned: assignedKpo.length !== 0,
		entities,
		handleFilter,
		role: userRole(role?.name),
		kpoRequest,
		handleOpen,
		handleClose,
		handleReq,
		open
	};
};

export default useKpoReview;
