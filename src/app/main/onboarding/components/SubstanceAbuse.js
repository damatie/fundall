import React from 'react';
import CheckForms from './CheckForms';

const SubtanceAbuse = () => {
  const config = {
    title: 'ACKNOWLEDGEMENT OF SUBSTANCE ABUSE STANDARD FOR EMPLOYEES',
    content: [
      'INSTRUCTION:',
      'This form is used for documenting the receipt of the company’s substance Abuse Standard for employees and the summary of procedures for Testing Employees and Job Applicants, by company employees. A separate receipt form should be used for job applicants. The original of this form should be retained in the employee’s personal file and a copy given to the employee on request.',
      'EMPLOYEE’S CERTIFICATION:',
      'I hereby acknowledge that I received a copy of the SpringRock Substance Abuse standard for Employees on the date stated below.',
      'I acknowledge and agree that I am responsible for reading the standard in full and complying with the requirements. I also understand that I will be subject to disciplinary action, up to and including termination of my employment, as set forth in the Standard. I have also been advised and understand that the company will answer any questions which I may have regarding the standard and that my questions should be addressed to the applicable personnel Manager. I also understand and acknowledge that in signing this receipt I am giving the company my consent to submit to the company’s drug and alcohol tests under the terms and conditions described in the standard.',
      'I also understand that the company’s substance Abuse standard for Employees, is not a contract of employment and does not alter my status as an employee at-will, which means that my employment can be terminated either by me or the company at any time with or without cause and with or without notice. [For Unionized Employees: where any provision of the standard conflicts with the provisions of a collective bargaining agreement between the Company and a union representing its employees, the provisions of the collective bargaining agreement will supersede. However, failure to comply with the standard as so interpreted shall constitute just cause for discipline, up to and including discharge.',
      'Prior to signing this Receipt, I read it carefully and an opportunity to ask questions regarding its content.',
    ],
    checkValue: false,
    name: 'substanceAbuseStandard'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
};

export default SubtanceAbuse;