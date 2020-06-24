import React from 'react';
import { useSelector } from 'react-redux';
import AcknowledgementOfHFWPP from './onboardingForms/AcknowledgementOfHFWPP';
import AcknowledgementOfSASFE from './onboardingForms/AcknowledgementOfSASFE';
import AuthorizationForPayrollDeductions from './onboardingForms/AuthorizationForPayrollDeductions';
import AuthorizationFormForDDORE from './onboardingForms/AuthorizationFormForDDORE';
import AxaMansardEnrollmentTemplate from './onboardingForms/AxamansardEnrollmentTemplate';
import AxaMansardGeriatricsForm from './onboardingForms/axamansardGeriatrics';
import BusinessCardRequest from './onboardingForms/BusinessCardRequest';


const SideBarContent = () => {
  const index = useSelector(({indexTab}) => indexTab.indexTab);

  switch(index.id) {
    case 1: {
      return <AcknowledgementOfHFWPP />
    }
    case 2: {
      return <AcknowledgementOfSASFE />
    }
    case 3: {
      return <AuthorizationForPayrollDeductions />
      
    }
    case 4: {
      return <AuthorizationFormForDDORE />
    }
    case 5: {
      return <AxaMansardEnrollmentTemplate />
    }
    case 6: {
      return <AxaMansardGeriatricsForm />
    }
    case 7: {
      return <BusinessCardRequest />
    }
    default: {
      return <></>
    }
  }
  return (
    <></>
  );
};

export default SideBarContent;