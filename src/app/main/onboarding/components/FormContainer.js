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
import HandbookAcknowledgement from './HandbookAcknowledgement';
import IdCardIssuance from './IdCardIssuance';
import SimCardAck from './SimCardAck';
import BusinessCard from './BusinessCard';

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
        <HandbookAcknowledgement />
      )
    case formList[8]:
      return (
        <IdCardIssuance />
      )
    case formList[9]:
      return (
        <SimCardAck />
      )
    case formList[10]:
      return (
        <BusinessCard />
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