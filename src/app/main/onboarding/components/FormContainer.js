import React from 'react';
import { useParams } from 'react-router-dom';
import formList from '../formList';

const FormContainer = () => {

  const { formName } = useParams();

  switch (formName) {
    case formList[0]:
      return (
        <>Authorization for Payroll Deductions</>
      )
    case formList[1]:
      return (
        <>Ethics and Business Conduct Policy Statement</>
      )
    case formList[2]:
      return (
        <>Acknowledgement of Harassment-free Workplace policy</>
      )
    case formList[3]:
      return (
        <>Acknowledgement of Substance Abuse Standard for Employees</>
      )
    case formList[4]:
      return (
        <>Information Security Policy</>
      )
    case formList[5]:
      return (
        <>Driving and Seat Belt Policy</>
      )
    case formList[6]:
      return (
        <>Non-disclosure/Confidentiality Policy</>
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