import React from 'react';
import CheckForms from './CheckForms';

const EthicsBusinessConduct = () => {
  const config = {
    title: 'ETHICS AND BUSINESS CONDUCT POLICY STATEMENT',
    content: [
      'I have read and fully understand SpringRock’s policy on business and employee conduct attached herewith. In addition, all questions I may have had concerning the policy have clarified by my supervisor.',
      'I will report all violations or suspected violations of the policy to management immediately and that I will be asked to confirm in writing whether or not any such violations have occurred. I understand that any violation of this policy or failure to report violations of the result in disciplinary action up to and including dismissal.'
    ],
    checkValue: false,
    name: 'ethicsAndBusinessConductPolicyStatement'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
};

export default EthicsBusinessConduct;