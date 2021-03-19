import React from 'react';
import UploadForms from './UploadForms';
import { useSelector, useDispatch } from 'react-redux';
import { getNhfForm } from '../store/actions';
import useUserID from '../hooks/useUserID';

const { useEffect } = React;

const NHFRegistration = () => {
  const config = {
    title: 'NHF INDIVIDUAL REGISTRATION FORM',
    type: 'nhf'
  }

  const dispatch = useDispatch();

  const {
    id
  } = useUserID();

  useEffect(() => {
    !!id && dispatch(getNhfForm(id))
  }, [id]);

  return (
    <UploadForms {...config} />
  );
};

export default NHFRegistration;