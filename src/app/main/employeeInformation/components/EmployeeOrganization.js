import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { getEntities, getDept, getJobTitle } from 'app/main/employeeManagement/store/actions';
import { Controller } from 'react-hook-form';
import SharedButton from 'app/shared/button/SharedButton';
import { useSelector, useDispatch } from 'react-redux';
import useEmployeeOrganization from '../hooks/useEmployeeOrganization';
import { DatePicker } from '@material-ui/pickers';

const EmployeeOrganization = ({ value, authState }) => {
  const { entities, departments, jobTitles } = useSelector(state => state.employeeInformation.organization);
  const dispatch = useDispatch();
  const inputs = React.useMemo(() => [
    {
      name: 'entityId',
      label: 'Employee SRG Entity',
      type: 'select',
      data: entities,
      defaultValue: value.entityId,
      fieldName: 'entityName',
    },
    {
      name: 'departmentId',
      label: 'Department/Function',
      type: 'select',
      data: departments,
      defaultValue: value.departmentId,
      fieldName: 'departmentName',
    },
    {
      name: 'jobTitleId',
      label: 'Job TItle',
      type: 'select',
      fieldName: '',
      data: jobTitles,
      defaultValue: value.jobTitleId,
      fieldName: 'name'
    },
    {
      name: 'employeeManager1',
      label: 'Employee\'s Manager 1',
      type: '',
      data: [],
      defaultValue: value.employeeManager1,
    },
    {
      name: 'employeeManager2',
      label: 'Employee\'s Functional Manager',
      type: '',
      data: [],
      defaultValue: value.employeeManager2,
    },
    {
      name: 'reviewingManager',
      label: 'Reviewing Manager',
      type: '',
      data: [],
      defaultValue: value.reviewingManager,
    },
    {
      name: 'personalAssistant',
      label: 'Personal Assistant/Secretary',
      type: '',
      data: [],
      defaultValue: value.personalAssistant,
    },
    {
      name: 'industrySeniority',
      label: 'Industry Seniority',
      type: 'date',
      data: [],
      defaultValue: value.industrySeniority,
    },
    {
      name: 'SRGSeniority',
      label: 'SRG Seniority',
      type: 'date',
      data: [],
      defaultValue: value.SRGSeniority,
    },
    {
      name: 'startDate',
      label: 'Employee Start Date',
      type: 'date',
      data: [],
      defaultValue: value.startDate,
    },
    {
      name: 'contractType',
      label: 'Employment Status',
      type: 'select',
      data: [
        {
          id: 'contract',
          name: 'Contract'
        },
        {
          id: 'full-time',
          name: 'full-time'
        },
        {
          id: 'Part-time',
          name: 'part-time'
        }
      ],
      defaultValue: value.contractType,
      fieldName: 'name'
    }
  ], [entities, departments, jobTitles]);

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
    dispatch(getEntities());
    dispatch(getDept(value.entityId));
    dispatch(getJobTitle());
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
                  defaultValue={input.defaultValue}
                  as={
                    <SelectTextField
                      defaultValue={input.defaultValue}
                      disabled={
                        input.name === 'entityId' || input.name === 'departmentId' || input.name === 'jobTitleId' ? true : !shouldUpdate
                      }
                      label={input.label}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                    >
                      {input.data.map((value) => (
                        <MenuItem
                          key={value.id}
                          value={value.id}
                          onClick={handleMenuItemClick({ value: value.id, name: input.name })}>
                          {value[input.fieldName]}
                        </MenuItem>
                      ))}
                    </SelectTextField>
                  }
                />
              )
            }

            if (input.type === 'date') {
              return (
                <Controller
                  control={control}
                  defaultValue={input.defaultValue}
                  name={input.name}
                  as={
                    <DatePicker
                      inputVariant="outlined"
                      inputRef={register}
                      label={input.label}
                      className="w-full"
                      value={input.defaultValue}
                      // maxDate={dob}
                      format={'MMMM Do, YYYY'}
                      error={errors[input.name]}
                      helperText={errors[input.name]?.message}
                      disabled={!shouldUpdate}
                    />
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