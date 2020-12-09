import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import DropZone from 'app/shared/sharedDropZone';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const UploadDocument = (props) => {
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState('');
    
    const isVaild = () => {
        return (name === '' || file.length === 0);
    }

    const handleUpload = () =>{
        let payload = new FormData();
        payload.append("name", name);
        payload.append("file", file[0], `${name.replaceAll(" ", "_")}_${moment(new Date()).format('DDMMYY')}.${file[0].name.split('.').pop()}`);
        return payload;
    }

  return (
    <SharedModal
      title='Upload Document'
      open={(props.open)}
      handleClose={props.handleCloseModal}
    >
      <form>
        <Input
          name='name'
          id='uploadName'
          label='Name'
          required
          className='my-16'
          onChange={ev => setName(ev.target.value)}
        />
        <Typography variant='body1' className="mt-16 mb-8">Document to upload *</Typography>
		<DropZone setValue={setFile}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
        {(props.showProgress) ? 
        <div>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
        :
        <div>
            <SharedButton
            variant='contained'
            color='primary'
            type='button'
            className='flex mx-auto'
            disabled={isVaild()}
            onClick={ev => {props.handleCreate(handleUpload())}}
            >
            Upload
            </SharedButton>
        </div>
        }
      </form>
    </SharedModal>
  );
};

export default UploadDocument;