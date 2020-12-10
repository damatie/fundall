import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import useKpoList from '../hooks/useKpoList';
import Skeleton from '@material-ui/lab/Skeleton';

const EditEmployeeKpo = () => {
  const { register, errors, handleSubmit, onSubmit, control, details, loadingSingleKpo } = useKpoList();
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
                      // name='jobRole'
                      label='Job Role'
                      className='my-10'
                      error={errors.jobTitleId}
                      message={errors.jobTitleId?.message}
                    >
                      <MenuItem value={1}>
                        Office Admin
                      </MenuItem>
                      <MenuItem value={2}>
                        Dev Ops
                      </MenuItem>
                    </SelectTextField>
                  }
                  name='jobTitleId'
                />

                <Controller
                  control={control}
                  defaultValue={details.kpoYear}
                  as={
                    <SelectTextField
                      label='KPO Year'
                      error={errors.kpoYear}
                      message={errors.kpoYear?.message}
                    // className='my-10'
                    >
                      <MenuItem value={2019}>
                        2019
                      </MenuItem>
                      <MenuItem value="2020">
                        2020
                      </MenuItem>
                    </SelectTextField>
                  }
                  name='kpoYear'
                />

                <AutoCompleteInput
                  className='my-16'
                  name='lineManagerId'
                  value={{ name: details?.lineManager, id: details.lineManagerId }}
                  label='Line Manager'
                  data={[{ name: 'Josh Maximum', id: 1 }]}
                  error={errors.lineManagerId}
                  helperText={errors.lineManagerId?.message}
                  onChange={(ev, value) => register({ name: 'lineManagerId', value: value?.id })}
                />

                <AutoCompleteInput
                  className='my-16'
                  name='reviewingManagerId'
                  label='Reviewing Manager'
                  value={{ name: details?.reviewingManager, id: details.reviewingManagerId }}
                  data={[{ name: 'David Chinweike', id: 2 }]}
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