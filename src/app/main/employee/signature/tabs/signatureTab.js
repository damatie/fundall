import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import swal from 'sweetalert2';
import 'react-drop-zone/dist/styles.css';
import { Button } from '@material-ui/core';
import { useAuth } from 'app/hooks/useAuth';



const SignatureTab = () => {
  const [file, setFile] = useState('');

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
      fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee', {
        method: 'patch',
        headers: {
          Authorization: `JWT ${auth().getToken}`
        },
        body: formData
      }).then(res => res.json()).then(data => {
        console.log(data);
      }).catch(e => console.error(e));
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