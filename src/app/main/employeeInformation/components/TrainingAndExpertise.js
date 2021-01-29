import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

const data = [
  {
    training: 'Recruitment Workshop',
    dateAcquired: new Date(),
  },
  {
    training: 'Workshop',
    dateAcquired: new Date(),
  },
]
const TrainingAndExpertise = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'training',
      label: 'Training',
      type: '',
      data: [],
    },
    {
      name: 'dateAcquired',
      label: 'Date Acquired',
      type: 'date',
      data: [],
    },
  ], []);
  return (
    <BasicCard
      title='Training And Expertise'
    >
      <form>
        {data.map((item) => (
          <>
          <Grid container spacing={1}>
              {
                inputs.map((input) => {
                  return (
                    <Grid item lg={12} className='my-16'>
                      <Input
                        {...input}
                        defaultValue={item[input.name]}
                      />
                    </Grid>
                    
                  )
                })
              }
          </Grid>
          <Divider className='my-16' />
          </>
        ))}
      </form>
    </BasicCard>
  );
};

export const AddTrainingAndExpertise = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'training',
      label: 'Training',
      type: '',
      data: [],
    },
    {
      name: 'dateAcquired',
      label: 'Date Acquired',
      type: 'date',
      data: [],
    },
  ], []);

  return (
    <form>
      {inputs.map((input) => {
        return (
          <div className='my-20'>
            <Input
              {...input}
            />
          </div>
        )
      })}
      <SharedButton
        variant='contained'
        color='secondary'
        className='flex mx-auto'
      >
        Add
        </SharedButton>
    </form>
  );
};
export default TrainingAndExpertise;