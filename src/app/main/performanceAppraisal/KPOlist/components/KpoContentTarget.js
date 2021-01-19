import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import Typography from '@material-ui/core/Typography'

const KpoContentTarget = ({customHook}) => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    kpoDetails,
    shouldShowInput,
    shouldDisableButton
  } = customHook;

  const inputs = [
    {
      name: 'Q1',
    },
    {
      name: 'Q2',
    },
    {
      name: 'Q3',
    },
    {
      name: 'Q4',
    },
    {
      name: 'kpoYearendScore',
      label: 'Year-End Score'
    },
    {
      name: 'kpoYearendRemarks',
      label: 'Year-End Remarks'
    },
    {
      name: 'kpoPipAchieved',
      label: 'PIP Achieved'
    }
  ]
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          inputs.map((item) => (
            <div key={item.name}>
              {
                shouldShowInput(item.name.toLowerCase()) ? (
                  <Input
                    className='my-16'
                    name={item.name}
                    label={item?.label || item.name}
                    error={errors[item.name]}
                    message={errors[item.name]?.message}
                    refs={register}
                    defaultValue={kpoDetails[item.name]}
                    type='number'
                  />
                ) : (
                  <Typography 
                  className='my-16'
                  variant="subtitle1" 
                  color="initial">
                    <strong>
                      {item?.label || item.name}:
                    </strong>
                    {kpoDetails[item.name] && ` ${kpoDetails[item.name]}%`}
                  </Typography>
                )
              }
            </div>
          ))
          
        }
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
          disabled={shouldDisableButton}
        >
          Save
        </SharedButton>
      </form>
    </Paper>
  );
};

export default KpoContentTarget;