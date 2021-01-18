import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import SharedButton from 'app/shared/button/SharedButton';
import usePersonalDevelopment from '../hooks/usePersonalDevelopement';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const FormComponent = ({state, update, handleCancel}) => {
  const dispatch = useDispatch();
  const {
    errors,
    register,
    handleSubmit,
    onSubmit
  } = usePersonalDevelopment({
    dispatch,
    state,
    update,
    handleCancel
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
      <Typography variant="subtitle1" color="initial">Personal Development Needs</Typography>
      <Input
        name='name'
        multiline
        error={errors.name}
        message={errors.name?.message}
        refs={register}
      />
      </div>
      <div className="w-full">
      <Typography variant="subtitle1" color="initial">Actions Required</Typography>
      <Input
        name='actionRequired'
        multiline
        error={errors.actionRequired}
        message={errors.actionRequired?.message}
        refs={register}
      />
      </div>
      <SharedButton
        variant='contained'
        color='primary'
        type='submit'
        className='flex mx-auto w-1/4 my-16'
      >
        {!update ? 'Save' : 'Update'}
      </SharedButton>
    </form>
  )
}
const PersonalDevelopment = ({data}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <Button variant="contained" color="primary" className='w-1/4' onClick={() => setOpen(!open)}>
        {!open ? 'Add' : 'Cancel'}
      </Button>
      {open && (<FormComponent handleCancel={() => setOpen(false)}/>)}
      <section className='my-16'>
        {
          [1, 2, 3, 4].map(item => (
            <>
              <FormComponent update/>
              <Divider />
            </>
          ))
        }
      </section>
    </Paper>
  );
};

export default PersonalDevelopment;