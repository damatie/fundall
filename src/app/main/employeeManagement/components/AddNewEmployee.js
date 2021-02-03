import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import Typography from '@material-ui/core/Typography';
import { Controller } from 'react-hook-form';

const AddNewEmployee = ({
  open,
  handleClose,
  form: {
    handleSubmit,
    onSubmit,
    register,
    control,
    errors,
  },
  data: {
    entities,
    departments,
    roles,
    grades,
    jobTitles
  },
  handleGetDept
}) => {
  return (
    <SharedModal
      open={open}
      handleClose={handleClose}
      title='Create An Account'
    >
      <form 
        className='my-16'
        onSubmit={handleSubmit(onSubmit)}
      >
        <GridSystem>
          <Input
            name='firstName'
            label='First Name'
            refs={register}
            error={errors.firstName}
            message={errors.firstName?.message}
          />
          <Input
            name='middleName'
            label='Middle Name'
            refs={register}
            error={errors.middleName}
            message={errors.middleName?.message}
          />
          <Input
            name='lastName'
            label='Last Name'
            refs={register}
            error={errors.lastName}
            message={errors.lastName?.message}
          />
          <Input
            name='email'
            label='Official Email'
            type='email'
            refs={register}
            error={errors.email}
            message={errors.email?.message}
          />
          <Controller
            name='entityId'
            label='Entity'
            control={control}
            as={
              <SelectTextField
                // name='entityId'
                label='Entity'
                error={errors.entityId}
                message={errors.entityId?.message}
              >
                {
                  entities.map(({id, entityName}) => (
                    <MenuItem key={id} value={id} onClick={() => handleGetDept(id)}>
                      {entityName}
                    </MenuItem>
                  ))
							  }
              </SelectTextField>
            }
          />

          <Controller
            name='departmentId'
            label='Department'
            control={control}
            as={
              <SelectTextField
                // name='departmentId'
                label='Department'
                error={errors.departmentId}
                message={errors.departmentId?.message}
              >
                {
                  departments.map(({id, departmentName}) => (
                    <MenuItem key={id} value={id}>
                      {departmentName}
                    </MenuItem>
                  ))
							  }
              </SelectTextField>
            }
          />

          <Controller
            name='jobTitleId'
            label='Job Title'
            control={control}
            as={
              <SelectTextField
                // name='departmentId'
                label='jobTitleId'
                error={errors.jobTitleId}
                message={errors.jobTitleId?.message}
              >
                {
                  jobTitles.map(({id, name}) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))
							  }
              </SelectTextField>
            }
          />
          <Controller
            name='roleId'
            label='Role'
            control={control}
            as={
              <SelectTextField
                // name='roleId'
                label='Role'
                error={errors.roleId}
                message={errors.roleId?.message}
              >
                {
                  roles.map(({id, name}) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))
							  }
              </SelectTextField>
            }
          />
          <Input
            name='idNumber'
            label='Employee ID Card Number'
            refs={register}
            error={errors.idNumber}
            message={errors.idNumber?.message}
          />

          <Controller
            name='employeeGradeId'
            label='Employee Grade'
            control={control}
            as={
              <SelectTextField
                name='employeeGradeId'
                // label='Employee Grade'
                error={errors.employeeGradeId}
                message={errors.employeeGradeId?.message}
              >
                {
                  grades.map(({id, gradeName}) => (
                    <MenuItem key={id} value={id}>
                      {gradeName}
                    </MenuItem>
                  ))
							  }
              </SelectTextField>
            }
          />
          <div>
            <Typography variant="subtitle1" color="initial">SRG Seniority Date</Typography>
            <Input
            name='srgSeniorityDate'
            type='date'
            refs={register}
            error={errors.srgSeniorityDate}
            message={errors.srgSeniorityDate?.message}
          />
          </div>
        </GridSystem>
        <SharedButton
          color='secondary'
          variant='contained'
          className='flex flex-col items-center justify-center mx-auto my-16'
          type='submit'
        >
          Submit
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default AddNewEmployee;