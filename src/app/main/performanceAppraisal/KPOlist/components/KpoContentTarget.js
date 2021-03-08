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
      type: 'number'
    },
    {
      name: 'Q2',
      type: 'number'
    },
    {
      name: 'Q3',
      type: 'number'
    },
    {
      name: 'Q4',
      type: 'number'
    },
    {
      name: 'kpoYearendScore',
      label: 'Year-End Score',
      type: 'number'
    },
    {
      name: 'kpoYearendRemarks',
      label: 'Year-End Remarks',
      type: 'text'
    },
    {
      name: 'kpoPipAchieved',
      label: 'PIP Achieved',
      type: 'number'
    }
  ]
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit('quarterly'))}>
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
                    type={item.type}
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