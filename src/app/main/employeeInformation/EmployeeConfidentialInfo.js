import React from 'react';
import Grid from '@material-ui/core/Grid';
import SpouseAndDependants from './components/SpouseAndDependants';
import EmployeeBio from './components/EmployeeBio';
import EmployeeNextOfKin from './components/EmployeeNextOfKin';

const EmployeeConfidentialInfo = () => {
  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <EmployeeBio />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <EmployeeNextOfKin />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SpouseAndDependants />
      </Grid>
    </Grid>
  );
};

export default EmployeeConfidentialInfo;