import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import SharedButton from 'app/shared/button/SharedButton';
import usePersonalDevelopment from '../hooks/usePersonalDevelopement';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import CustomIconButton from 'app/shared/button/CustomIconButton';

const FormComponent = ({ state, update, handleCancel, data }) => {
  const dispatch = useDispatch();
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleDelete
  } = usePersonalDevelopment({
    dispatch,
    state,
    update,
    handleCancel,
    data
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {update && (
        <CustomIconButton type='error' icon='delete' className='w-1/4 my-16' onClick={handleDelete(state?.id)}>
          Delete
        </CustomIconButton>
      )}
      <div className="w-full">
        <Typography variant="subtitle1" color="initial">Personal Development Needs</Typography>
        <Input
          name='name'
          multiline
          error={errors.name}
          message={errors.name?.message}
          refs={register}
          defaultValue={update && state?.name}
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
          defaultValue={update && state?.actionRequired}
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
const PersonalDevelopment = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <Button variant="contained" color="primary" className='w-1/4 mb-16' onClick={() => setOpen(!open)}>
        {!open ? 'Add' : 'Cancel'}
      </Button>
      {open && (<FormComponent data={data} handleCancel={() => setOpen(false)} />)}
      <Divider />
      <section className='my-16'>
        {
          data.developmentNeeds.map(item => (
            <>
              <FormComponent update data={data} state={item} />
              <Divider />
            </>
          ))
        }
      </section>
    </Paper>
  );
};

export default PersonalDevelopment;