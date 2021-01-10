import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const getValue = (endpoints, keyWord) => {
  return endpoints.includes(keyWord);
};

const PermissionList = ({endpointFor, handleClick, getInitialEndpoint, methodsType}) => {
  React.useEffect(() => getInitialEndpoint(endpointFor), []);
  return (
    <section className='my-16'>
      <Typography variant="subtitle1" color="initial">{endpointFor.name}</Typography>
      <FormGroup row>
        {
          methodsType(endpointFor.name).map(item => (
            <FormControlLabel
              control={<Checkbox defaultChecked={getValue(endpointFor.methods, item.name.toUpperCase())} onChange={handleClick(endpointFor)} name={item.name} />}
              label={item.label}
            />
          ))
        }
      </FormGroup>
    </section>
  );
};

export default PermissionList;