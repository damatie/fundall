import React from 'react';

const { useState, useEffect } = React;

const useOnboarding = ({ params, profile, push }) => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if(!params && !profile.info) push('/employee/complete/registration/');
  }, []);

  // return {
  //   shouldRedirect,
  // };
};

export default useOnboarding;