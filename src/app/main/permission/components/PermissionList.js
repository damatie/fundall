import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const getValue = (endpoints, keyWord) => {
  return endpoints.includes(keyWord);
};

const PermissionList = ({endpointFor, handleClick, getInitialEndpoint}) => {
  React.useEffect(() => getInitialEndpoint(endpointFor), []);
  return (
    <section>
      <Typography variant="subtitle1" color="initial">{endpointFor.name}</Typography>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox defaultChecked={getValue(endpointFor.methods, 'GET')} onChange={handleClick(endpointFor)} name="get" />}
          label="Can View"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={getValue(endpointFor.methods, 'POST')} onChange={handleClick(endpointFor)} name="post" />}
          label="Can Add"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={getValue(endpointFor.methods, 'PATCH')} onChange={handleClick(endpointFor)} name="patch" />}
          label="Can Edit"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={getValue(endpointFor.methods, 'DELETE')} onChange={handleClick(endpointFor)} name="delete" />}
          label="Can Delete"
        />
      </FormGroup>
    </section>
  );
};

export default PermissionList;