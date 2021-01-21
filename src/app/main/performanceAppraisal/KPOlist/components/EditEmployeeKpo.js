import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import Skeleton from '@material-ui/lab/Skeleton';

const EditEmployeeKpo = ({customHook}) => {
  const { getEmployeesByRole, register, errors, handleSubmit, onSubmit, control, details, loadingSingleKpo, jobTitles } = customHook;
  return (
    <>
      {
        loadingSingleKpo ? (
          <section className='w-2/4 mx-auto'>
            <Skeleton animation='wave' width='100%' height='350px' variant='rect' />
          </section>
        ) : (
            <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  defaultValue={details.jobTitleId}
                  as={
                    <SelectTextField
                      name='jobTitleId'
                      label='Job Title'
                      className='my-10'
                      error={errors.jobTitleId}
                      message={errors.jobTitleId?.message}
                    >
                      {
                        jobTitles.map(({name, id}) => (
                          <MenuItem value={id} key={id}>
                            {name}
                          </MenuItem>
                        ))
                      }
                    </SelectTextField>
                  }
                  name='jobTitleId'
                />

                {/* <Input
                  name='pipTarget'
                  className='my-16'
                  label='PIP Target'
                  multiline
                /> */}

                <AutoCompleteInput
                  className='my-16'
                  name='lineManagerId'
                  value={{ name: `${details?.lineManager?.firstName} ${details?.lineManager?.lastName}`, id: details.lineManagerId }}
                  label='Line Manager'
                  data={getEmployeesByRole('linemanager')}
                  error={errors.lineManagerId}
                  helperText={errors.lineManagerId?.message}
                  onChange={(ev, value) => register({ name: 'lineManagerId', value: value?.id })}
                />

                <AutoCompleteInput
                  className='my-16'
                  name='reviewingManagerId'
                  label='Reviewing Manager'
                  value={{ name: `${details?.reviewingManager?.firstName} ${details?.reviewingManager?.lastName}`, id: details.reviewingManagerId }}
                  data={getEmployeesByRole('linemanager')}
                  error={errors.reviewingManagerId}
                  helperText={errors.reviewingManagerId?.message}
                  onChange={(ev, value) => register({ name: 'reviewingManagerId', value: value?.id })}
                />
                <SharedButton
                  variant='contained'
                  color='primary'
                  type='submit'
                  className='flex mx-auto'
                >
                  Update KPO
                </SharedButton>
              </form>
            </Paper>
          )
      }
    </>
  );
};

export default EditEmployeeKpo;