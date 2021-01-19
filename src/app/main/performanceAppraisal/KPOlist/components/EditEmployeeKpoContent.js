import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import Skeleton from '@material-ui/lab/Skeleton';

const EditEmployeeKpoContent = ({ customHook }) => {
  const {
    register, errors, handleSubmit, onSubmit, control, kpoDetails, kpoCategory, loadingContent
  } = customHook;
  return (
    <section className='w-1/2 flex flex-col mx-auto p-20'>
      {
        loadingContent ? (
          <Skeleton animation='wave' width='100%' height='350px' variant='rect' />
        ) : (
            <Paper variant="outlined" className='w-full p-20'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name='kpoCategoryId'
                  defaultValue={kpoDetails.kpoCategoryId}
                  as={
                    <SelectTextField
                      name='kpoCategoryId'
                      label='KPO Category'
                      className='my-10'
                      error={errors.kpoCategoryId}
                      message={errors.kpoCategoryId?.message}
                    >
                      {kpoCategory.map(item => {
                        if (item.status.toUpperCase() === 'ACTIVE') {
                          return (
                            <MenuItem value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        }
                      })}
                    </SelectTextField>
                  }
                />

                <Input
                  name='kpoDescription'
                  label='Description'
                  className='my-16'
                  multiline
                  error={errors.kpoDescription}
                  message={errors.kpoDescription?.message}
                  refs={register}
                  defaultValue={kpoDetails.kpoDescription}
                />
                <Input
                  className='my-16'
                  name='target'
                  label='Target'
                  error={errors.target}
                  message={errors.target?.message}
                  refs={register}
                  defaultValue={kpoDetails.target}
                  type='number'
                />
                <Input
                  name='kpoYear'
                  label='%PIP Target'
                  className='my-16'
                  error={errors.kpoPipTarget}
                  message={errors.kpoPipTarget?.message}
                  refs={register}
                  defaultValue={kpoDetails.kpoPipTarget}
                  type='number'
                />
                <SharedButton
                  variant='contained'
                  color='primary'
                  type='submit'
                  className='flex mx-auto'
                >
                  Update
                </SharedButton>
              </form>
            </Paper>

          )
      }
    </section>
  );
};

export default EditEmployeeKpoContent;