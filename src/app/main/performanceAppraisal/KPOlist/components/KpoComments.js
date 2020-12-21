import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';


const KpoComments = () => {
  return (
    <Paper className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">What are the key strengths identied that the employee has?</Typography>
          <Input
            name='kpoYear'
            className='my-16'
            multiline
          />
        </div>

        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">What are the key performance improvement areas/responsibility</Typography>
          <Input
          name='kpoYear'
          className='my-16'
          multiline
        />
        </div>

        <FormControl component="fieldset">
      <FormLabel component="legend">Personnel Overall Rating</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" color='primary'>
        <FormControlLabel value="female" control={<Radio />} label="Below Expectation" />
        <FormControlLabel value="male" control={<Radio />} label="Meets Expectation" />
        <FormControlLabel value="other" control={<Radio />} label="Above Expectation" />
        <FormControlLabel value="other" control={<Radio />} label="Outstanding" />
      </RadioGroup>
    </FormControl>

    <div className='w-full'>
          <Typography variant="subtitle1" color="initial">Line Manager's Comments</Typography>
          <Input
          name='kpoYear'
          className='my-16'
          multiline
        />
        </div>

        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">Reviewing Manager's Comments</Typography>
          <Input
          name='kpoYear'
          className='my-16'
          multiline
        />
        </div>

        <div className='w-full'>
        <Alert severity="warning">KPO will be marked as complete and uneditable in 30 days with or without employee comments</Alert>
          <Typography variant="subtitle1" color="initial">Employee Comments</Typography>
          <Input
          name='kpoYear'
          className='my-16'
          multiline
        />
        </div>

        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Send
        </SharedButton>
      </form>
    </Paper>
    
  );
};

export default KpoComments;