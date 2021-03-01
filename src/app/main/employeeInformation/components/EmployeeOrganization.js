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
import userPermission from '../logic/userPermission';

const EmployeeOrganization = ({ value, authState }) => {
  const { 
    organization: {
      entities,
      departments,
    },
    jobTitle,
    employeeGrade,
    roles, 
  } = useSelector(state => state.employeeInformation);

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
      data: jobTitle.data,
      defaultValue: value.jobTitleId,
      fieldName: 'name'
    },
    {
      name: 'roleId',
      label: 'Role',
      type: 'select',
      data: roles.roles,
      defaultValue: value.role.id,
      fieldName: 'name'
    },
    {
      name: 'employeeGrade',
      label: 'Employee Grade',
      type: 'select',
      data: employeeGrade.data,
      defaultValue: value.employeeGrade.id,
      fieldName: 'gradeName'
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
      name: 'confirmationDate',
      label: 'Confirmation Date',
      type: 'date',
      data: [],
      defaultValue: value.confirmationDate,
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
  ], [entities, departments, jobTitle, employeeGrade, roles]);

  const { canEditOrganization } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: value.employeeId,
  });

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
        canEditOrganization() && (<SharedButton
          color='secondary'
          variant='contained'
          onClick={handleShouldUpdate}
        >
          {shouldUpdate ? 'Cancel' : 'Edit'}
        </SharedButton>)
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
                  key={input.name}
                  as={
                    <SelectTextField
                      defaultValue={input.defaultValue}
                      disabled={
                        input.name === 'entityId' || input.name === 'departmentId' || input.name === 'jobTitleId' ||input.name === 'employeeGrade' || input.name === 'roleId' ? true : !shouldUpdate
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
                  key={input.name}
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
                key={input.name}
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