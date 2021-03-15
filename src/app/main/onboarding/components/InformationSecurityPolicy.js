import React from 'react';
import CheckForms from './CheckForms';

const InformationSecurityPolicy = () => {
  const config = {
    title: 'INFORMATION SECURITY POLICY',
    content: [
      'I have read and fully understand the SpringRock information Security Policy attached herewith.',
      'I have asked all questions I have concerning the policy and these have been clarified by my manager.',
      'I will report all violations or suspected violations of the policy to management immediately and that I will be asked to confirm in writing whether or not any such violations have occurred.',
      'I understand that any violation of this policy or failure to report violations of a policy will result in disciplinary action up to and including dismissal.',
    ],
    checkValue: false,
    name: 'informationSecurityPolicy'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
}

export default InformationSecurityPolicy