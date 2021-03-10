import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';

const { useEffect } = React;

const EditEmployeeKpo = ({ customHook }) => {
  const { handleGetDepartment, getEmployeesByRole, register, errors, handleSubmit, onSubmit, control, details, loadingSingleKpo, jobTitles, disableInput } = customHook;

  const {
    entities,
    departments,
    employeeKpoList: {
      kpo: {
        departmentId,
        entityId
      }
    }
  } = useSelector(state => state.kpo);

  useEffect(() => {
    handleGetDepartment(entityId)()
  }, [entityId]);

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
              <AutoCompleteInput
                className='my-16'
                name='jobTitleId'
                value={details.jobTitle}
                label='Job Title'
                data={jobTitles}
                error={errors.jobTitleId}
                helperText={errors.jobTitleId?.message}
                onChange={(ev, value) => register({ name: 'jobTitleId', value: value?.id })}
                {...disableInput()}
              />
              <section className='my-20'>
                <Controller
                  control={control}
                  defaultValue={entityId}
                  as={
                    <SelectTextField
                      name='entityId'
                      label='Entity'
                      {...disableInput()}

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
                      {...disableInput()}
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
                value={{ name: `${details?.lineManager?.firstName} ${details?.lineManager?.lastName}`, id: details.lineManagerId }}
                label='Line Manager'
                data={getEmployeesByRole('linemanager')}
                error={errors.lineManagerId}
                helperText={errors.lineManagerId?.message}
                onChange={(ev, value) => register({ name: 'lineManagerId', value: value?.id })}
                {...disableInput()}
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
                {...disableInput()}
              />
              {
                !disableInput()?.disabled && (
                  <SharedButton
                    variant='contained'
                    color='primary'
                    type='submit'
                    className='flex mx-auto'
                  >
                    Update KPO
                  </SharedButton>
                )
              }
            </form>
          </Paper>
        )
      }
    </>
  );
};

export default EditEmployeeKpo;