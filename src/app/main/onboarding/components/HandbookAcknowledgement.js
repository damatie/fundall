import React from 'react';
import CheckForms from './CheckForms';

const HandbookAcknowledgement = () => {
  const config = {
    title: 'EMPLOYEE HANDBOOK ACKNOWLEDGEMENT',
    content: [
      'I have read the SPRINGROCK Employee Handbook and have reviewed the rules and regulations with the Chief Human Resources Officer and/or designee.',
      'I understand and agree that my employment is on an at-will basis and that no provision contained in this handbook furnished to me creates an employment contract. Further, I acknowledge and understand that my employer has the right to change or modify such provisions at any time and without prior notice'
    ],
    checkValue: false,
    name: 'employeeHandbookAcknowledgementForm'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
};

export default HandbookAcknowledgement;