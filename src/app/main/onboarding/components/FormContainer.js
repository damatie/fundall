import React from 'react';
import { useParams } from 'react-router-dom';
import formList from '../formList';
import PayrollDeductions from './PayrollDeductions';
import EthicsBusinessConduct from './EthicsBusinessConduct';
import HarassmentFreeWorkplace from './HarassmentFreeWorkplace';
import SubtanceAbuse from './SubstanceAbuse';
import InformationSecurityPolicy from './InformationSecurityPolicy';
import DrivingSeatBeltPolicy from './DrivingSeatBeltPolicy';
import ConfidentialityPolicy from './ConfidentialityPolicy';

const FormContainer = () => {

  const { formName } = useParams();

  switch (formName) {
    case formList[0]:
      return (
        <PayrollDeductions />
      )
    case formList[1]:
      return (
        <EthicsBusinessConduct />
      )
    case formList[2]:
      return (
        <HarassmentFreeWorkplace />
      )
    case formList[3]:
      return (
        <SubtanceAbuse />
      )
    case formList[4]:
      return (
        <InformationSecurityPolicy />
      )
    case formList[5]:
      return (
        <DrivingSeatBeltPolicy />
      )
    case formList[6]:
      return (
        <ConfidentialityPolicy />
      )
    case formList[7]:
      return (
        <>Employee Handbook Acknowledgement</>
      )
    case formList[8]:
      return (
        <>Id Card Issuance</>
      )
    case formList[9]:
      return (
        <>Sim Card Form</>
      )
    case formList[10]:
      return (
        <>Business Card Request Template</>
      )
    case formList[11]:
      return (
        <>Employee Bank Account Information</>
      )
    case formList[12]:
      return (
        <>Authorization Form for Direct Deposit of Reimbursable Expenses</>
      )
    case formList[13]:
      return (
        <>Reference Details Request Form</>
      )
    case formList[14]:
      return (
        <>Malarone/Malanil Acknowledgement Form</>
      )
    case formList[15]:
      return (
        <>NHF Details Form</>
      )
    case formList[16]:
      return (
        <>Malaria Program Attestation</>
      )
    default:
      return null;
  }
  return null;
};

export default FormContainer;