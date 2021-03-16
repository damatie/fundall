import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import useKpoList from '../hooks/useKpoList';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import Input from 'app/shared/TextInput/Input';
import { useSelector } from 'react-redux';

const { useEffect } = React;

const CreateEmployeeKpo = ({ customHook }) => {
  const { handleGetDepartment, getEmployeesByRole, handleCloseModal, open, register, errors, handleSubmit, onSubmit, control, jobTitles } = customHook;

  const {
    entities,
    departments,
  } = useSelector(state => state.kpo);

  const {
    entityId,
    departmentId
  } = useSelector(state => state.profile.data);

  useEffect(() => {
    handleGetDepartment(entityId)()
  }, []);

  return (
    <SharedModal
      title='Create KPO'
      open={open}
      handleClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteInput
          className='my-16'
          name='jobTitleId'
          label='Job Title'
          data={jobTitles}
          error={errors.jobTitleId}
          helperText={errors.jobTitleId?.message}
          onChange={(ev, value) => register({ name: 'jobTitleId', value: value?.id })}
        />
        <section className='my-20'>
          <Controller
            control={control}
            defaultValue={entityId}
            as={
              <SelectTextField
                name='entityId'
                label='Entity'

              // error={errors.jobTitleId}
              // message={errors.jobTitleId?.message}
              >
                {
                  entities.data.map(({ entityName, id }) => (
                    <MenuItem onClick={handleGetDepartment(id)} value={id} key={id}>
                      {entityName}
                    </MenuItem>
                  ))
                }
              </SelectTextField>
            }
            name='entityId'
          />
        </section>
        <section className='my-20'>
          <Controller
            control={control}
            defaultValue={departmentId}
            as={
              <SelectTextField
                name='departmentId'
                label='Department'
              // error={errors.jobTitleId}
              // message={errors.jobTitleId?.message}
              >
                {
                  departments.data.map(({ departmentName, id }) => (
                    <MenuItem value={id} key={id}>
                      {departmentName}
                    </MenuItem>
                  ))
                }
              </SelectTextField>
            }
            name='departmentId'
          />
        </section>

        <AutoCompleteInput
          className='my-16'
          name='lineManagerId'
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
          Create KPO
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default CreateEmployeeKpo;