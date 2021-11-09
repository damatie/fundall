import React from 'react';
import * as Actions from '../store/actions';


const useEmployeeSurvey = ({ dispatch, state, push }) => {
	// const { open } = state;

    const handleOpenModal = () => {
        dispatch(Actions.getExample)
    }

	return {
		handleOpenModal,
	};
};

export default useEmployeeSurvey;
