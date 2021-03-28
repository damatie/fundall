import React from 'react';
import formList from '../formList';

const { useState, useEffect } = React;

const useOnboarding = ({ params, profile, push, redirect }) => {

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const profileCompleted = Object.entries(profile || {}).length > 0 && !params && Object.entries(profile?.info || {}).length <= 0;

  useEffect(() => {
    if(profileCompleted) {
      push('/employee/complete/registration/');
    }
  }, [profile, redirect]);

  // return {
  //   shouldRedirect,
  // };
};

export default useOnboarding;