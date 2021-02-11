import React from 'react';
import Grid from '@material-ui/core/Grid';
import SpouseAndDependants from './components/SpouseAndDependants';
import EmployeeBio from './components/EmployeeBio';
import EmployeeNextOfKin from './components/EmployeeNextOfKin';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeConfidentialInfo = () => {
  const profile = useSelector(state => state.profile.data);
  const authState = useSelector(state => state.auth.user);

  const [info, setInfo] = React.useState({
    ...profile,
    info: null,
    ...profile.info,
  });

  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <EmployeeBio value={info} authState={authState} />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <EmployeeNextOfKin value={info} authState={authState}/>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SpouseAndDependants handleOpen={() => null}/>
      </Grid>
    </Grid>
  );
};

export default withReducer('employeeInformation', reducer)(EmployeeConfidentialInfo);