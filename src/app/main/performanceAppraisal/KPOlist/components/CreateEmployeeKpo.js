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
import SideModal from 'app/shared/modal/SideModal';

const { useEffect } = React;

const CreateEmployeeKpo = ({ customHook }) => {
  const { handleGetDepartment, getEmployeesByRole, handleCloseModal, open, register, errors, handleSubmit, onSubmit, control, jobTitles } = customHook;
  const [linemanagers, setLinemanagers] = React.useState([]);
  const {
    entities,
    entityList,
    departments,
  } = useSelector(state => state.kpo);

  const {
    entityId,
    departmentId
  } = useSelector(state => state.profile.data);

  useEffect(() => {
    handleGetDepartment(entityId)();
    setLinemanagers(getEmployeesByRole('financemanager'));
  }, [setLinemanagers]);
  return (
    <SideModal
      title='Create KPO'
      open={open}
      handleClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteInput
          className='my-16'
          name='jobTitleId'
          label='Job Title'
          data={jobTitles || []}
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
          data={linemanagers || []}
          error={errors.lineManagerId || !linemanagers.length}
          helperText={errors.lineManagerId?.message || !linemanagers.length ? 'No line Managers found' : ''}
          onChange={(ev, value) => register({ name: 'lineManagerId', value: value?.id })}
        />

        <AutoCompleteInput
          className='my-16'
          name='reviewingManagerId'
          label='Reviewing Manager'
          data={linemanagers || []}
          error={errors.reviewingManagerId || !linemanagers.length}
          helperText={errors.reviewingManagerId?.message || !linemanagers.length ? 'No reviewing managers found' : ''}
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
    </SideModal>
  );
};

export default CreateEmployeeKpo;