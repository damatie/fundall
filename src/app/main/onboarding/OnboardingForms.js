import React from 'react';
import OnboardingBase from './components/OnboardingBase';
import { useSelector, useDispatch } from 'react-redux';
import useOnboarding from './hooks/useOnboarding';
import  { useHistory, useParams } from 'react-router-dom';
import { getOwnOnboardingForms, getEmployeeInfo } from './store/actions';
import reducers from './store/reducers';
import withReducer from 'app/store/withReducer';

const { useEffect } = React;

const OnboardingForms = () => {

  const profile = useSelector(state => state.profile.data);
  const auth = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if(id) {
      dispatch(getEmployeeInfo(id));
    } else {
      dispatch(getOwnOnboardingForms());
      dispatch(getEmployeeInfo(auth.id));
    }
  }, []);

  useOnboarding({
    params: id,
    profile,
    push,
  });

  return (
    <OnboardingBase />
  );
};

export default withReducer('onboardingForms', reducers)(OnboardingForms);