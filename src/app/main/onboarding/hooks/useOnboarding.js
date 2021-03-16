import React from 'react';

const { useState, useEffect } = React;

const useOnboarding = ({ params, profile, push }) => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if(Object.entries(profile).length > 0) {
      if(!params && Object.entries(profile?.info || {}).length < 0) push('/employee/complete/registration/');
    }
  }, [profile]);

  // return {
  //   shouldRedirect,
  // };
};

export default useOnboarding;