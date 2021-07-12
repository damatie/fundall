import React from 'react';
import CheckForms from './CheckForms';

const HarassmentFreeWorkplace = () => {
  const config = {
    title: 'ACKNOWLEDEGEMENT OF HARASSMENT-FREE WORKPLACE POLICY',
    content: [
      'Dear Employee',
      'You have read through the SpringRock Energy’s policy on harassment-free workplace.',
      'Please sign and date below your acknowledgement of this policy.',
      'I have read and fully understand the company’s policy on sexual harassment attached hereto. In additions, all questions I may have had concerning the policy have been clarified by my supervisor.',
      'I understand that l am to report all violations or suspected violation of the policy to management immediately, and that I will be asked to confirm in writing whether or not any such violations have occurred. I also understand that any violation of this policy or failure to report violations of the policy will result in disciplinary action up to and including dismissal.',
    ],
    checkValue: false,
    name: 'harassmentFreeWorkplacePolicy'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
};

export default HarassmentFreeWorkplace;