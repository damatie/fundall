import React from 'react';
import * as Actions from '../store/actions';


const useEmployeeSurveyList = ({ dispatch, userId, state, push, id, employees, userInfo }) => {
	const { open, employeeSurveyList, loading, employeeSurvey, loadingSingleEmployeeSurvey } = state;


	useEffect(() => {
		if (!id) {
			if (userId) {
				dispatch(Actions.getAllEmployeeSurveyListItem(userId));
			}
		} else {
			dispatch(Actions.getOneEmployeeSurveyListItem(id));
		}
	}, [userId, id]);



	const handleCloseModal = () => {
		dispatch({
			type: Actions.CLOSE_EMPLOYEE_SURVEY_FORM_MODAL
		});
	};

	const handleOpenModal = () => {
		dispatch({
			type: Actions.OPEN_EMPLOYEE_SURVEY_FORM_MODAL
		});
	};


	const onSubmit = value => {
		const model = {
			...value,
			kpoYear: `${new Date().getFullYear()}`
		};
		if (id) {
			return dispatch(
				Actions.updateEmployeeSurveyListItem({
					id,
					userId,
					model
				})
			);
		}
		dispatch(Actions.createEmployeeSurveyListItem({ userId, item: model }));
	};

	const handleDeleteKpo = kpoId => {
		dispatch(
			Actions.deleteEmployeeSurveyListItem({
				id: kpoId,
				userId
			})
		);
	};

	return {
		handleCloseModal,
		handleOpenModal,
		onSubmit,
		handleDeleteKpo,
        open
	};
};

export default useEmployeeSurveyList;
