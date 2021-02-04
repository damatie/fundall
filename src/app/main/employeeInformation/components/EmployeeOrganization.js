import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import * as  Actions from 'app/store/actions';
import { Controller } from 'react-hook-form';
import SharedButton from 'app/shared/button/SharedButton';
import { useSelector, useDispatch } from 'react-redux';
import useEmployeeOrganization from '../hooks/useEmployeeOrganization';

const EmployeeOrganization = ({ value, authState }) => {
  // const { } = useSelector(state => state);
  const dispatch = useDispatch();
  const inputs = React.useMemo(() => [
    {
      name: 'entity',
      label: 'Employee SRG Entity',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: 'department',
      label: 'Department/Function',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: 'jobTitle',
      label: 'Job TItle',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: 'employeeManager1',
      label: 'Employee\'s Manager 1',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: 'employeeManager2',
      label: 'Employee\'s Functional Manager',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: 'personalAssistant',
      label: 'Personal Assistant/Secretary',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: 'industrySeniorityDate',
      label: 'Industry Seniority',
      type: 'date',
      data: [],
      defaultValue: '',
    },
    {
      name: 'srgSeniorityDate',
      label: 'SRG Seniority',
      type: 'date',
      data: [],
      defaultValue: '',
    },
    {
      name: 'employeeStartDate',
      label: 'Employee Start Date',
      type: 'date',
      data: [],
      defaultValue: '',
    },
    {
      name: 'employmentStatus',
      label: 'Employment Status',
      type: 'select',
      data: [],
      defaultValue: '',
    }
  ], []);

  const {
    handleMenuItemClick,
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control
  } = useEmployeeOrganization({
    dispatch,
    defaultValue: value,
    state: authState,
  });

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getDepartments(2));
  }, [])

  return (
    <BasicCard
      title='Organization'
      button={
        <SharedButton
          color='secondary'
          variant='contained'
          onClick={handleShouldUpdate}
        >
          {shouldUpdate ? 'Cancel' : 'Edit'}
        </SharedButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridSystem>
          {inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <Controller
                  name={input.name}
                  control={control}
                  as={
                    <SelectTextField
                      disabled={!shouldUpdate}
                      label={input.label}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                    >
                      {input.data.map(({ id, name }) => (
                        <MenuItem key={id} value={id} onClick={handleMenuItemClick({ value: id, name: input.name })}>
                          {name}
                        </MenuItem>
                      ))}
                    </SelectTextField>
                  }
                />
              )
            }
            return (
              <Input
                {...input}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
                disabled={!shouldUpdate}
              />
            )
          })}
        </GridSystem>
        {
          shouldUpdate && (
            <SharedButton
              color='primary'
              variant='contained'
              className='flex flex-col w-1/2 mx-auto my-16'
              type='submit'
            >
              Save
            </SharedButton>
          )
        }
      </form>
    </BasicCard>
  );
};

export default EmployeeOrganization;