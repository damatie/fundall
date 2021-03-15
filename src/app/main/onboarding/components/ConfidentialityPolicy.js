import React from 'react';
import CheckForms from './CheckForms';

const ConfidentialityPolicy = () => {
  const config = {
    title: 'NON-DISCLOSURE/CONFIDENTIALITY POLICY',
    content: [
      'I have read and fully understand the SpringRock non-disclosure/confidentiality Policy attached herewith.',
      'I have asked all questions I have concerning the policy and these have been clarified by my manager.',
      'I agree that I shall not during, or at any time after the termination of my employment with the Company, disclose or divulge to others including future employers, any trade secrets, confidential information, or any other proprietary data of the Company in violation of this agreement.',
      'That upon the termination of my employment from the Company: I shall return to the Company all documents and property of the Company, including but not necessarily limited to: drawings, blueprints, reports, manuals, correspondence, customer lists, computer programs, and all other materials and all copies thereof relating in any way to the Company\'s business, or in any way obtained by me during the course of employ.',
      'I will report all violations or suspected violations of the policy to management immediately and that I will be asked to confirm in writing whether or not any such violations have occurred.',
      'I understand that any violation of this policy or failure to report violations of a policy will result in disciplinary action up to and including dismissal',
    ],
    checkValue: false,
    name: 'nonDisclosureConfidentialityPolicyForm'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
}

export default ConfidentialityPolicy