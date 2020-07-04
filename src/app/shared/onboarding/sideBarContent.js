import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AcknowledgementOfHFWPP from './onboardingForms/AcknowledgementOfHFWPP';
import AcknowledgementOfSASFE from './onboardingForms/AcknowledgementOfSASFE';
import AuthorizationForPayrollDeductions from './onboardingForms/AuthorizationForPayrollDeductions';
import AuthorizationFormForDDORE from './onboardingForms/AuthorizationFormForDDORE';
import AxaMansardEnrollmentTemplate from './onboardingForms/AxamansardEnrollmentTemplate';
import AxaMansardGeriatricsForm from './onboardingForms/axamansardGeriatrics';
import BusinessCardRequest from './onboardingForms/BusinessCardRequest';
import DrivingAndSeatBeltPolicy from './onboardingForms/DrivingAndSeatBeltPolicy';
import EmployeeHandbookAcknowledgement from './onboardingForms/EmployeeHandbookAcknowledgement';


const SideBarContent = () => {
  const [index, setIndex] = useState(1)
  const indexs = useSelector(({indexTab}) => indexTab.indexTab);
  useEffect(() => {
    setIndex(indexs.id);
  }, [indexs.id])
  switch(index) {
    case 1: {
      return <AcknowledgementOfHFWPP setIndex={setIndex}/>
    }
    case 2: {
      return <AcknowledgementOfSASFE />
    }
    case 3: {
      return <AuthorizationForPayrollDeductions />
      
    }
    case 4: {
      
      return <DrivingAndSeatBeltPolicy />
    }
    case 5: {
      
      return <EmployeeHandbookAcknowledgement />
    }
    case 6: {
      return <AuthorizationFormForDDORE />
      
    }
    case 7: {
      return <BusinessCardRequest />
    }
    case 8: {
      return <AxaMansardEnrollmentTemplate />
    }
    case 9: {
      return <AxaMansardGeriatricsForm />
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