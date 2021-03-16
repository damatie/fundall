import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Controller } from 'react-hook-form';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const KpoContentPipScore = ({ calculatePip, kpoDetails }) => {
  const { handleSubmit, onSubmit, errors, register, control, pipEligible, role } = calculatePip;
  return (

    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      {
        pipEligible ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name='compensationComponent'
              as={
                <SelectTextField
                  name='compensationComponent'
                  label='PIP Compansation Type'
                  className='my-10'
                  error={errors.compensationComponent}
                  message={errors.compensationComponent?.message}
                  disabled={role !== 'hrmanager'}
                >
                  <MenuItem value={"Employee Basic Salary"}>
                    Employee Basic Salary
              </MenuItem>
                  <MenuItem value={"Employee Gross Salary Amount"}>
                    Employee Gross Salary Amount
              </MenuItem>
                </SelectTextField>
              }
            />
            <Input
              // name='amount'
              label='Total PIP Target'
              className='my-16'
              type='number'
              defaultValue={kpoDetails.totalPipTarget}
              disabled
            />
            <Input
              // name='amount'
              label='Total PIP Achieved'
              className='my-16'
              type='number'
              defaultValue={kpoDetails.totalPipAchieved}
              disabled
            />
            <Input
              name='amount'
              label='Compensation Amount'
              className='my-16'
              type='number'
              error={errors.amount}
              message={errors.amount?.message}
              refs={register}
              disabled={role !== 'hrmanager'}
            />
            {role === 'hrmanager' && (
              <SharedButton
                variant='contained'
                color='primary'
                type='submit'
                className='flex mx-auto'
              >
                Save
              </SharedButton>
            )}
          </form>
        ) : (
            <section className='h-40'>
              <section className='flex flex-col justify-center items-center'>
                <Icon className='text-red-600'>report</Icon>
                <Typography variant="subtitle1" color="initial">Not Eligible for PIP</Typography>
              </section>
            </section>
          )
      }

    </Paper>
  );
};

export default KpoContentPipScore;