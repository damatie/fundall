import React from 'react';
import EmployeeProfile from './components/EmployeeProfile';
import Grid from '@material-ui/core/Grid';
import EmployeeEmail from './components/EmployeeEmail';
import EmployeeTelephoneNumbers from './components/EmployeeTelephoneNumbers';
import EmployeeWorkLocation from './components/EmployeeWorkLocation';
import EmployeeOrganization from './components/EmployeeOrganization';
import SharedModal from 'app/shared/modal/SharedModal';
import EmployeeVacation, { AddEmployeeVacation } from './components/EmployeeVacation';
import TrainingAndExpertise, { AddTrainingAndExpertise } from './components/TrainingAndExpertise';
import EducationalQualification, { AddEducationalQualification } from './components/EducationalQualifications';
import EmergencyContacts, { AddEmergencyContact } from './components/EmergencyContacts';
import SpouseAndDependants, { AddSpouseAndDependant } from './components/SpouseAndDependants';
import { useSelector } from 'react-redux';

const info = {
  title: 'Mr',
  firstName: 'Dave',
  lastName: 'Dave',
  middleName: 'Dave',
  surname: 'Dave',
  srgn: 'DC-003',
  gender: 'Male',
  maritalStatus: 'Single',
  nickname: 'Black',
  officialEmail: 'test@test.com',
  alternativeEmail: 'test@test.cc',
  facebookHandle: 'https://timesheet-client.web.app/blog/1',
  twitterHandle: 'https://timesheet-client.web.app/blog/1',
  linkedInHandle: 'https://timesheet-client.web.app/blog/1',
  instagramInHandle: 'https://timesheet-client.web.app/blog/1',
  officialNo: '',
  officeLine: '',
  officeExtension: '',
  privateMobileNumber: ''
}
const EmployeeBasicInformation = () => {
  const authState = useSelector(state => state.auth.user)
  return (
    <>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeProfile value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeEmail value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeTelephoneNumbers value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeWorkLocation value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeOrganization value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeVacation authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TrainingAndExpertise authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EducationalQualification authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmergencyContacts authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SpouseAndDependants authState={authState}/>
        </Grid>
      </Grid>
      <SharedModal
        title='Modal Title'
        open={false}
        handleClose={() => null}
      >
        {/* <AddEmployeeVacation /> */}
        {/* <AddTrainingAndExpertise /> */}
        {/* <AddEducationalQualification /> */}
        {/* <AddEmergencyContact /> */}
        <AddSpouseAndDependant />
      </SharedModal>
    </>
  );
};

export default EmployeeBasicInformation;