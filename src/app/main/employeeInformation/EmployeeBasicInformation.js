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
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import { openSharedModal, CLOSE_SHARED_MODAL } from './store/actions';
import EmployeeNextOfKin from './components/EmployeeNextOfKin';

const EmployeeBasicInformation = () => {
  const authState = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile.data);
  const { title, open } = useSelector(state => state.employeeInformation.employeeInfo);
  const [info, setInfo] = React.useState({
    ...profile,
    info: null,
    ...profile.info,
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(Actions.getEmployeeProfile(authState.id));
  }, []);

  const handleOpen = (title) => {
    return () => {
      dispatch(openSharedModal(title));
    }
  };

  const handleClose = () => {
    dispatch({
      type: CLOSE_SHARED_MODAL
    });
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeProfile value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeEmail value={info} authState={authState}/>
        </Grid>
        {/* <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeTelephoneNumbers value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeWorkLocation value={info} authState={authState}/>
        </Grid> */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeOrganization value={info} authState={authState}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeVacation authState={authState} handleOpen={handleOpen}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TrainingAndExpertise authState={authState} handleOpen={handleOpen}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EducationalQualification authState={authState} handleOpen={handleOpen}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmergencyContacts authState={authState} handleOpen={handleOpen}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SpouseAndDependants authState={authState} handleOpen={handleOpen}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <EmployeeNextOfKin authState={authState} handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <SharedModal
        title={title}
        open={open}
        handleClose={handleClose}
      >
        {title === 'Travel And Vacation Schedule' && (<AddEmployeeVacation />)}
        {title === 'Training And Expertise' && (<AddTrainingAndExpertise />)}
        {title === 'Educational Qualification' && (<AddEducationalQualification />)}
        {title === 'Emergency Contact' && (<AddEmergencyContact />)}
        {title === 'Spouse / Dependants' && (<AddSpouseAndDependant />)}
      </SharedModal>
    </>
  );
};

export default withReducer('employeeInformation', reducer)(EmployeeBasicInformation);