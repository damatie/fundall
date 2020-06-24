import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../../../shared/inputs/textInputs';
import Date from '../../../../../shared/dates/date';
import { makeStyles } from '@material-ui/core/styles';
import TextArea from '../../../../../shared/textarea/textarea';
import Checkbox from '../../../../../shared/checkbox/checkbox';
import { boxShadows } from '../../../../../styles/boxShadow';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    margin: '4rem auto 0',
    padding: '0 2rem',
  },
  AuthIcon: {
    background: "rgba(28, 119, 195, 0.15)",
    borderRadius: "10px",
    width: "50px",
    height: "40px",
    display: 'inline-block',
    color: "#1C77C3",
    fontSize: "30px",
    textAlign: "center",
    margin: '0 1rem 0 0',
    position: 'relative',
    top: '5px',
  },
  title: {
    width: '50%',
    margin: '1rem auto',
    textAlign: 'center',
    padding: '2rem 0',
    color: '#1C77C3',
  }
}));

const TrainingRequestForm = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();

  //handle name
  const handleName = (e) => {

  };

  //name input data
  const nameInputData = {
    label: 'Name',
    placeholder: 'Name',
    onChange: handleName,

  };

  //handle department
  const handleDepartment = (e) => {

  };

  //department input data
  const departmentInputData = {
    label: 'Department',
    placeholder: 'Department',
    onChange: handleDepartment,
  };

  //handle location
  const handleLocation = (e) => {

  };

  //department input data
  const locationInputData = {
    label: 'Location',
    placeholder: 'Location',
    onChange: handleLocation,
  };

  //handle phone number
  const handlePhone = (e) => {

  };

  //phone input data
  const phoneInputData = {
    label: 'Phone number',
    placeholder: 'Phone number',
    onChange: handlePhone,
  };

  //handle email
  const handleEmail = (e) => {

  };

  //email input data
  const emailInputData = {
    label: 'Email',
    placeholder: 'Email',
    onChange: handleEmail,
  };

  //handle requested training
  const handleRequestedTraining = (e) => {

  };

  //requested training input data
  const requestTrainingInputData = {
    label: 'Email',
    placeholder: 'Description of requested training: (for example: Management Training, Communication Training etc….)',
    onChange: handleRequestedTraining,
  };

  //handle desired skill
  const handleDesiredSkill = (e) => {

  };

  //requested training input data
  const desiredSkillInputData = {
    label: 'Desired Skill',
    placeholder: 'Desired competency skills to be acquired through this training: (for example: Management Training: Time Management; Communication Training: Listening)',
    onChange: handleDesiredSkill,
  };

  //handle unable task
  const handleUnableTask = (e) => {

  };

  //unable task input data
  const unableSkillInputData = {
    label: 'What tasks can employees not do that the course will train them to do?',
    placeholder: 'What tasks can employees not do that the course will train them to do?',
    onChange: handleUnableTask,
  };

  //handle previous task
  const handlePreviousTask = (e) => {

  };

  //unable task input data
  const previousTaskInputData = {
    label: 'What previous training have the employees received on these tasks?',
    placeholder: 'What previous training have the employees received on these tasks?',
    onChange: handlePreviousTask,
  };

  //handle productivity task
  const handleProductivity = (e) => {

  };

  //productivity input data
  const productivityInputData = {
    label: 'What specific productivity improvements do you expect from the proposed course?',
    placeholder: 'What specific productivity improvements do you expect from the proposed course?',
    onChange: handleProductivity,
  };

  //handle requested training task
  const handleTrainingRequest = (e) => {

  };

  //requested training input data
  const trainingRequestInputData = {
    label: 'Is the requested training for you or your department?',
    placeholder: 'Is the requested training for you or your department?',
    onChange: handleTrainingRequest,
  };

  //handle training time
  const handleTrainingTime = (e) => {

  };

  //training time input data
  const trainingTimeInputData = {
    label: 'What is the best time and day for this group to attend training?',
    placeholder: 'What is the best time and day for this group to attend training?',
    onChange: handleTrainingTime,
  };


  //handle additional comment
  const handleAdditionalComment = (e) => {

  };

  //handle transportation
  const handleTransportation = (e) => {

  };

  //transportation input data
  const transportationInputData = {
    label: 'NGN',
    placeholder: 'NGN',
    onChange: handleTransportation,
  };

  //handle accommodation
  const handleAccommodation = (e) => {

  };

  //accommodation input data
  const accommodationInputData = {
    label: 'Accommodation',
    placeholder: 'Accommodation',
    onChange: handleAccommodation,
  };

  //handle meal
  const handleMeal = (e) => {

  };

  //meal input data
  const mealInputData = {
    label: 'Meal',
    placeholder: 'Meal',
    onChange: handleMeal,
  };

  //handle miscellaneous
  const handleMiscellaneous = (e) => {

  };

  //miscellaneous input data
  const MiscellaneousInputData = {
    label: 'Miscellaneous',
    placeholder: 'Miscellaneous',
    onChange: handleMiscellaneous,
  };

  //handle total cost
  const handleTotalCost = (e) => {

  };

  //total input data
  const totalCostInputData = {
    label: 'Total Cost',
    placeholder: 'Total Cost',
    onChange: handleTotalCost,
  };

  //handle justification
  const handleJustification = (e) => {

  };


  return (
    <div className={card.card_boxshadow}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h4>
            <span className={classes.AuthIcon}><BuildRoundedIcon /></span>
            <strong>TRAINING REQUEST FORM</strong>
          </h4>
        </div>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p><strong>Name:</strong></p>
          </Grid>
          <Grid container item sm="8" md="8" lg="8" lx="8" alignItems="center" >
            <TextInput textInputData={nameInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p><strong>Department:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <TextInput textInputData={departmentInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p><strong>Location:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <TextInput textInputData={locationInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <p><strong>Phone Number: </strong></p>
            <TextInput textInputData={phoneInputData} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <p><strong>Email: </strong></p>
            <TextInput textInputData={emailInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <p>Target date for start of training?</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <p>Target date for training completion?</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              Description of requested training: (for example: Management Training, Communication Training etc….)
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextInput textInputData={requestTrainingInputData} />
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              Desired competency skills to be acquired through this training: (for example: Management Training: Time Management; Communication Training: Listening)
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextInput textInputData={desiredSkillInputData} />
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              What tasks can employees not do that the course will train them to do?
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextInput textInputData={unableSkillInputData} />
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              What previous training have the employees received on these tasks?
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextInput textInputData={previousTaskInputData} />
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              What specific productivity improvements do you expect from the proposed course?
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextInput textInputData={productivityInputData} />
          </Grid>
        </Grid >

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <p>Is the requested training for you or your department?</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <TextInput textInputData={trainingRequestInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <p>What is the best time and day for this group to attend training?</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <TextInput textInputData={trainingTimeInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <p>
              Additional comments:
          </p>
          </Grid>
        </Grid >

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextArea
              placeholder="Additional comments"
              onChange={handleAdditionalComment}
            />
          </Grid>
        </Grid >

        <h4><strong>Approximate Cost</strong></h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <p><strong>1) Transportation:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <TextInput textInputData={transportationInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <p><strong>2) Accommodation:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <TextInput textInputData={accommodationInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <p><strong>3) Meals:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <TextInput textInputData={mealInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <p><strong>4) Miscellaneous:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" >
            <TextInput textInputData={MiscellaneousInputData} />
          </Grid>
        </Grid>

        <div className={classes.total_cost}>
          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
              <p><strong>TOTAL COST:</strong></p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" lx="6" >
              <TextInput textInputData={totalCostInputData} />
            </Grid>
          </Grid>
        </div>

        <h4><strong>To be completed by Supervisor</strong></h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center" >
            <p>Employee Eligible:</p>
          </Grid>
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <Checkbox /> <p>Yes</p>
          </Grid>
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center" >
            <Checkbox /> <p>No</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" >
            <p>If no, state justification below</p>
          </Grid>
        </Grid>

        <Grid container spacing="2">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextArea
              placeholder="Your justification here..."
              onChange={handleJustification}
            />
          </Grid>
        </Grid >

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center" >
            <Checkbox /> <p>Sign</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center" >
            <Date />
          </Grid>
        </Grid>

        <h4><strong>To be completed by Director</strong></h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center" >
            <Checkbox /> <p>Approval</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center" >
            <Checkbox /> <p>Disapproval</p>
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" lx="12" >
            <TextArea
              placeholder="Your justification here..."
              onChange={handleJustification}
            />
          </Grid>
        </Grid >


        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <Checkbox /> <p>Sign</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" >
            <Date />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TrainingRequestForm;