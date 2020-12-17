import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';

const CreateFolder = (props) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

  return (
      
    <SharedModal
      title='Create New Folder'
      open={props.open}
      handleClose={props.handleCloseModal}
    >
      <form>
        <Input
          name='name'
          label='Name'
          required
          className='my-16'
          onChange={ev => setName(ev.target.value)}
        />
        <Input
          className='my-16'
          name='description'
          label='Description'
          onChange={ev => setDescription(ev.target.value)}
          multiline
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='button'
          className='flex mx-auto'
          disabled={(name) ? false : true}
          onClick={ev => {props.handleCreate({
                name,
                description
            })}}
        >
          Create
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default CreateFolder;