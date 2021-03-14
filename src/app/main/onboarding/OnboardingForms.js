import React from 'react';
import OnboardingBase from './components/OnboardingBase';
import { useSelector } from 'react-redux';
import useOnboarding from './hooks/useOnboarding';
import  { useHistory, useParams } from 'react-router-dom';

const OnboardingForms = () => {

  const profile = useSelector(state => state.profile.data);

  const { push } = useHistory();
  const { id } = useParams();

  useOnboarding({
    params: id,
    profile,
    push,
  });

  return (
    <OnboardingBase />
  );
};

export default OnboardingForms;