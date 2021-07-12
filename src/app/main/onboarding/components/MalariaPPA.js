import React from 'react';
import UploadForms from './UploadForms';
import { useSelector, useDispatch } from 'react-redux';
import { getMalariaPPA } from '../store/actions';
import useUserID from '../hooks/useUserID';

const { useEffect } = React;

const MalariaPPA = () => {
  const config = {
    title: 'MALARIA PROGRAM ATTESTATION',
    type: 'malaria'
  }

  const dispatch = useDispatch();

  const {
    id
  } = useUserID();

  useEffect(() => {
    !!id && dispatch(getMalariaPPA(id))
  }, []);

  return (
    <UploadForms {...config} />
  );
};

export default MalariaPPA;