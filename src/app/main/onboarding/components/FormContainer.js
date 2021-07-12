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
import BankAccountInfo from './BankAccountInfo';
import ReimbursibleExpenses from './ReimbursibleExpenses';
import Malarone from './Malarone';
import ReferenceDetails from './ReferenceDetails';
import NHFRegistration from './NHFRegistration';
import MalariaPPA from './MalariaPPA';

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
        <BankAccountInfo />
      )
    case formList[12]:
      return (
        <ReimbursibleExpenses />
      )
    case formList[13]:
      return (
        <ReferenceDetails />
      )
    case formList[14]:
      return (
        <Malarone />
      )
    case formList[15]:
      return (
        <NHFRegistration />
      )
    case formList[16]:
      return (
        <MalariaPPA />
      )
    default:
      return null;
  }
};

export default FormContainer;