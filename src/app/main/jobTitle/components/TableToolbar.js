import React from 'react';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'

const TableToolbar = () => {
  return (
    <Grid container spacing={1}>
      <Grid item lg={3} md={3} sm={4} xs={4}>
        <SelectTextField
        label='Filter By Entity'
        size='small'
        >
          <MenuItem value='SRE'>Spring Rock Energy</MenuItem>
        </SelectTextField>
      </Grid>
    </Grid>
  );
};

export default TableToolbar;