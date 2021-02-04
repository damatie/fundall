import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
const TrainingAndExpertise = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  return (
    <BasicCard
      title='Training And Expertise'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Training And Expertise')}
            className='mx-16'
          >
            Add
          </SharedButton>
          <SharedButton
            variant='contained'
            color='secondary'
            onClick={() => setShouldUpdate(!shouldUpdate)}
          >
            {shouldUpdate ? 'Cancel' : 'Edit'}
          </SharedButton>
        </>
      }
    >
      {data.map((item, index) => (
        <TrainingAndExpertiseDetails
          item={item}
          key={item?.id}
          index={index}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
        />
      ))}
    </BasicCard>
  );
};

const TrainingAndExpertiseDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {
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
  const handleUpdate = () => {
    setShouldUpdate(false);
  }
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Training And Expertise ({index + 1})</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => null}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>
      </div>
      <form>
        <Grid container spacing={1}>
          {
            inputs.map((input) => {
              return (
                <Grid item lg={12} className='my-16'>
                  <Input
                    {...input}
                    defaultValue={item[input.name]}
                    disabled={!shouldUpdate}
                  />
                </Grid>
              )
            })
          }
        </Grid>
        {shouldUpdate && (<SharedButton
          variant='contained'
          color='primary'
          className='w-1/2 flex flex-col mx-auto my-16'
          onClick={handleUpdate}
        >
          Update
        </SharedButton>)}
        <Divider className='my-16' />
      </form>
    </>
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