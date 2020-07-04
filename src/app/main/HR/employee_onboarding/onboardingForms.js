import React, { useEffect } from 'react';
import Onboarding from 'app/shared/onboarding/onboarding';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../employee/store/actions';
import reducer from '../../employee/store/reducer';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const OnboardingForms = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(Actions.getEmployeeProfile(params.id));
  }, []);
  return (
    <div>
      <Onboarding />
    </div>
  );
};
export default withReducer('employeeProfile', reducer)(OnboardingForms)