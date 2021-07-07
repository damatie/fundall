import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import swal from 'sweetalert2';
import 'react-drop-zone/dist/styles.css';
import { Button } from '@material-ui/core';
import { useAuth } from 'app/hooks/useAuth';
import axios from 'axios';
import { useHistory } from 'react-router';


const SignatureTab = () => {
  const [file, setFile] = useState('');

  const history = useHistory();

  const handleFile = (file, text) => {
    // if(file.name.match(/.(png|jpg|jpeg|PNG|JPG|JPEG)/)) {
      setFile(file)
    // }else {
    //   setFile('')
    // }
  }
  const auth = useAuth;
  const uploadSignature = () => {
    if(file !== '') {
      const formData = new FormData();
      formData.append('signature', file);
      axios({
        method: 'patch',
        url: 'https://hris-cbit.herokuapp.com/api/v1/auth/employee/',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data', Authorization: `JWT ${auth().getToken}` }
        })
        .then(function (response) {
            //handle success
            swal.fire({
              title: 'Signature upload',
              text: 'signature uploaded successfully',
              icon: 'success',
              timer: 3000
            })
            history.push('/employee/onboarding')
        })
        .catch(function (response) {
            //handle error
            // console.log(response);
        });
    }
    
  }

  return (
    <>
    <StyledDropZone onDrop={(file, text) => handleFile(file, text)} label={file.name ? file.name : 'Click or drop your file here'}/>
    <Button variant='contained' color='primary' style={{width: '100%', margin: '3rem 0'}} onClick={uploadSignature} disabled={file === ''}>
      Upload
    </Button>
    </>
  )
};

export default SignatureTab;