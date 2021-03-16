import React from 'react';
import UploadForms from './UploadForms';

const NHFRegistration = () => {
  const config = {
    title: 'NHF INDIVIDUAL REGISTRATION FORM',
    type: 'nhf'
  }
  return (
    <UploadForms {...config} />
  );
};

export default NHFRegistration;