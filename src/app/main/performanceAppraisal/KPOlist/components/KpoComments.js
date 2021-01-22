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
import Divider from '@material-ui/core/Divider'


const KpoComments = ({kpoSummary}) => {
  const lineManager = kpoSummary.lineManagerComment;
  const employee = kpoSummary.employeeComment;
  const reviewingManager = kpoSummary.reviewingManagerComment;
  const {shouldShowButton, state} = kpoSummary
  return (
    <Paper className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={lineManager.handleSubmit(lineManager.onSubmit)}>
        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">What are the key strengths identified that the employee has?</Typography>
          <Input
            name='strengths'
            className='my-16'
            multiline
            refs={lineManager.register}
            error={lineManager.errors?.strengths}
            message={lineManager.errors?.strengths?.message}
            defaultValue={state.strengths}
          />
        </div>

        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">What are the key performance improvement areas/responsibility</Typography>
          <Input
            name='areaOfImprovements'
            className='my-16'
            multiline
            defaultValue={state.areaOfImprovements}
            refs={lineManager.register}
            error={lineManager.errors?.areaOfImprovements}
            message={lineManager.errors?.areaOfImprovements?.message}
          />
        </div>

        <Typography variant="subtitle1" color="initial">Personnel Overall Rating</Typography>
        <FormControl component="fieldset"
          error={lineManager.errors?.personnelOverallRating}
          helperText={lineManager.errors?.personnelOverallRating?.message}
        >
          {/* <FormLabel component="legend">Personnel Overall Rating</FormLabel> */}
          <RadioGroup 
          aria-label="gender" 
          name="personnelOverallRating" 
          color='primary'
          defaultValue={state.personnelOverallRating}
          onChange={({ target: { name, value }}) => { 
            lineManager.register({
              name,
              value
            })
            console.log(value)
          }}
          error={true}
          >
            <FormControlLabel value="Below Expectation" control={<Radio />} label="Below Expectation" />
            <FormControlLabel value="Meets Expectation" control={<Radio />} label="Meets Expectation" />
            <FormControlLabel value="Above Expectation" control={<Radio />} label="Above Expectation" />
            <FormControlLabel value="Outstanding" control={<Radio />} label="Outstanding" />
          </RadioGroup>
        </FormControl>

        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">Line Manager's Comments</Typography>
          <Input
            name='lineManagerComment'
            className='my-16'
            defaultValue={state.lineManagerComment}
            multiline
            refs={lineManager.register}
            error={lineManager.errors?.lineManagerComment}
            message={lineManager.errors?.lineManagerComment?.message}
          />
        </div>
        {shouldShowButton('lineManager') && (<SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto w-1/2 mb-16'
        >
          Send
        </SharedButton>)}
        <Divider />
      </form>
      <form onSubmit={reviewingManager.handleSubmit(reviewingManager.onSubmit)}>
        <div className='w-full'>
          <Typography variant="subtitle1" color="initial">Reviewing Manager's Comments</Typography>
          <Input
            name='reviewingManagerComment'
            className='my-16'
            multiline
            refs={reviewingManager.register}
            error={reviewingManager.errors?.reviewingManagerComment}
            message={reviewingManager.errors?.reviewingManagerComment?.message}
          />
        </div>
        {shouldShowButton('reviewingManager') && (<SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto w-1/2 mb-16'
        >
          Send
        </SharedButton>)}
        <Divider />
      </form>

      <form onSubmit={employee.handleSubmit(employee.onSubmit)}>
      <div className='w-full mt-16'>
        <Alert severity="warning">KPO will be marked as complete and uneditable in 30 days with or without employee comments</Alert>
        <Typography variant="subtitle1" color="initial">Employee Comments</Typography>
        <Input
          name='employeeComment'
          className='my-16'
          multiline
          defaultValue={state.employeeComment}
          refs={employee.register}
          error={employee.errors?.employeeComment}
          message={employee.errors?.employeeComment?.message}
        />
      </div>
      {shouldShowButton('employee') && (<SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto w-1/2 mb-16'
        >
          Send
        </SharedButton>)}
      </form>
    </Paper>

  );
};

export default KpoComments;