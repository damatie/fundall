import React, { useEffect } from 'react';
import Onboarding from 'app/shared/onboarding/onboarding';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducer';
import { useDispatch } from 'react-redux';

const EmployeeOnboarding = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getEmployeeProfile());
  }, []);
  return (
    <div>
      <Onboarding />
    </div>
  );
};
export default withReducer('employeeProfile', reducer)(EmployeeOnboarding)