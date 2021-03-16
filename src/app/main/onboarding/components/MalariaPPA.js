import React from 'react';
import UploadForms from './UploadForms';

const MalariaPPA = () => {
  const config = {
    title: 'MALARIA PROGRAM ATTESTATION',
    type: 'malaria'
  }
  return (
    <UploadForms {...config} />
  );
};

export default MalariaPPA;